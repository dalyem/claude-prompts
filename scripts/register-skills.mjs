#!/usr/bin/env node
// Register every skills/*/SKILL.md into a running mcp-manage instance
// (https://github.com/dalyem/mcp-manage), which syncs them to all
// skills-capable agents on the machine. Idempotent: creates missing skills,
// updates existing ones by name, preserves enabled/targets on update, and
// refuses to touch a skill that has bundled files it didn't create.
//
// Usage: node scripts/register-skills.mjs
//        MCP_MANAGE_URL=http://127.0.0.1:9000 node scripts/register-skills.mjs

import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const BASE = process.env.MCP_MANAGE_URL || "http://127.0.0.1:8722";
const SKILLS_DIR = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "skills");

// Minimal frontmatter parse for the controlled format these files use:
// single-line `key: value` pairs between --- fences, body after.
function parseSkillMd(raw, dir) {
  const m = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!m) throw new Error(`${dir}/SKILL.md: missing frontmatter`);
  const fields = {};
  for (const line of m[1].split("\n")) {
    const kv = line.match(/^([A-Za-z-]+):\s*(.*)$/);
    if (kv) fields[kv[1]] = kv[2].replace(/^["']|["']$/g, "").trim();
  }
  if (!fields.name || !fields.description) {
    throw new Error(`${dir}/SKILL.md: frontmatter needs name and description`);
  }
  return { name: fields.name, description: fields.description, instructions: m[2].trim() };
}

async function api(method, route, body) {
  const res = await fetch(`${BASE}${route}`, {
    method,
    headers: { "content-type": "application/json" },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(`${method} ${route} → ${res.status}: ${json.error ?? "unknown error"}`);
  return json;
}

function syncSummary(results) {
  const skills = (results ?? []).filter((r) => r.kind === "skills");
  if (!skills.length) return "";
  return " | sync: " + skills.map((r) => `${r.agentKey}=${r.status}`).join(" ");
}

const dirs = (await readdir(SKILLS_DIR, { withFileTypes: true }))
  .filter((d) => d.isDirectory())
  .map((d) => d.name)
  .sort();
if (!dirs.length) {
  console.error(`no skill directories found in ${SKILLS_DIR}`);
  process.exit(1);
}

const { skills: existing } = await api("GET", "/api/skills");
const byName = new Map(existing.map((s) => [s.name, s]));
let failed = 0;

for (const dir of dirs) {
  try {
    const raw = await readFile(path.join(SKILLS_DIR, dir, "SKILL.md"), "utf8");
    const skill = parseSkillMd(raw, dir);
    const current = byName.get(skill.name);
    if (current) {
      if (current.files?.length) {
        console.log(`SKIP    ${skill.name} — existing skill has bundled files this script doesn't manage`);
        continue;
      }
      const res = await api("PUT", `/api/skills/${current.id}`, {
        ...skill,
        enabled: current.enabled,
        targets: current.targets,
      });
      console.log(`UPDATED ${skill.name}${syncSummary(res.results)}`);
    } else {
      const res = await api("POST", "/api/skills", skill);
      console.log(`CREATED ${skill.name} (id ${res.id})${syncSummary(res.results)}`);
    }
  } catch (e) {
    failed++;
    console.error(`FAILED  ${dir}: ${e instanceof Error ? e.message : e}`);
  }
}

process.exit(failed ? 1 : 0);
