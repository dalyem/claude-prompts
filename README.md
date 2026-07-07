# claude-prompts

A small library of reusable, model-agnostic prompts for software engineering — written with a strong model, designed to make *any* capable model (Claude Opus/Sonnet, GPT, GLM, Kimi K2, …) work like a senior staff engineer.

## The worldview

Every prompt here encodes the same engineer: decades of experience, close to retirement, nothing to prove, optimizing for the team that maintains the system after they're gone. The judgment is spelled out as ordered checks and concrete criteria rather than implied by the persona, so it survives the trip to weaker models:

- **Top-down altitudes.** Problem → architecture → design → implementation. Higher-altitude decisions are made explicitly, never silently while typing code — and ceremony scales with stakes: a one-line fix isn't a design review.
- **Simplicity is a feature.** Boring technology, the smallest complete change, duplication over the wrong abstraction, deleted code over new mechanisms, dependencies treated as liabilities.
- **Tradeoffs are stated.** Every real decision names what it gives up and what future fact would change it. One-way doors get flagged before walking through them.
- **Failure paths are design**, decided with the happy path — not bolted on.
- **Nothing is "done" unverified**, and unverified work is labeled as such. Failures get reported with actual output, not hedged.

[prompts/staff-engineer.md](prompts/staff-engineer.md) is the full worldview as a system prompt. Two protocol files encode the working *process* that goes with it: [context-protocol.md](prompts/context-protocol.md) — how context gets collected, trusted, and refreshed — and [planning-protocol.md](prompts/planning-protocol.md) — how work gets defined, ordered, and kept coherent. Each task prompt carries the slice of all this that its task needs, so every prompt also works standalone.

## Conventions

- **`{{PLACEHOLDER}}`** — fill in before sending. Delete optional sections you don't use; don't leave empty tags behind.
- **Input data goes in XML-style tags** (`<code>`, `<diff>`, `<logs>`). Every major model handles these, they keep instructions cleanly separated from data, and they survive content that itself contains markdown backticks.
- **Each task prompt works as a single user message.** The exceptions are `staff-engineer.md`, `context-protocol.md`, and `planning-protocol.md` — those are system-prompt layers.
- **Stacking.** In tools with a system prompt slot: system = `staff-engineer.md`, with `context-protocol.md` and `planning-protocol.md` appended for long or agentic work; user = the filled-in task prompt. In a plain chat: just the task prompt. The overlap between layers is deliberate and harmless — repetition of the core rules costs nothing on strong models and helps weak ones. If the full stack overwhelms a small model, keep the two mechanisms that carry the most weight: the working-state block and the VERIFIED/INFERRED/ASSUMED ledger.
- **No vendor features assumed.** No tool use, no JSON mode, no provider-specific syntax. Plain markdown plus XML-style tags.

## The prompts

| Prompt | Use it for |
|---|---|
| [staff-engineer.md](prompts/staff-engineer.md) | The full worldview as a drop-in system prompt for any coding assistant |
| [context-protocol.md](prompts/context-protocol.md) | System layer: how to collect, trust, and refresh context |
| [planning-protocol.md](prompts/planning-protocol.md) | System layer: how to define done, order steps, and stay coherent |
| [design.md](prompts/design.md) | Turning a goal into an architecture/design decision the team can execute |
| [implement.md](prompts/implement.md) | Building a feature from a spec — planned top-down, complete, no stubs |
| [code-review.md](prompts/code-review.md) | Reviewing a diff for real bugs and unearned complexity, not nitpicks |
| [debug.md](prompts/debug.md) | Root-cause analysis from symptoms, logs, and code |
| [refactor.md](prompts/refactor.md) | Behavior-preserving cleanup toward a named destination |
| [write-tests.md](prompts/write-tests.md) | Tests that catch regressions instead of restating the code |
| [verify-change.md](prompts/verify-change.md) | Turning "done" into evidence: exercise the real flow, report per-claim verdicts |
| [handoff.md](prompts/handoff.md) | Reporting work honestly: outcome first, verified/untested/not-done kept separate |
| [commit-and-pr.md](prompts/commit-and-pr.md) | Intent-sized bisectable commits and reviewer-first PR descriptions |
| [explain-code.md](prompts/explain-code.md) | Getting oriented in unfamiliar code, design creaks included |
| [improve-prompt.md](prompts/improve-prompt.md) | Meta: diagnosing and rewriting any rough prompt |

For work bigger than a routine change, chain them: `design.md` → paste the design into `implement.md` → `write-tests.md` → `verify-change.md` → `code-review.md` → `commit-and-pr.md`, with `handoff.md` to wrap up the session.

## Skills (for agent harnesses)

The `skills/` directory carries the same content in the cross-agent SKILL.md format (YAML frontmatter with `name` + `description`, instructions as the body) used by Claude Code, Codex CLI, Cursor, and OpenCode. The skill bodies are adapted for agents with tools: instead of pasting inputs into placeholder tags, each skill tells the agent what to gather itself — run `git diff`, reproduce the failure first, search for the call sites.

Two ways to install:

- Copy any `skills/<name>/` directory into an agent's skills dir: `~/.claude/skills/`, `~/.codex/skills/`, `~/.cursor/skills/`, or `~/.config/opencode/skills/`.
- With [mcp-manage](https://github.com/dalyem/mcp-manage) running, `node scripts/register-skills.mjs` registers or updates all of them through its API (default `http://127.0.0.1:8722`, override with `MCP_MANAGE_URL`), and mcp-manage syncs them to every agent on the machine. The script is idempotent and preserves the enabled/targets settings you've made in the UI.

Mindset and process skills — `staff-engineer-mindset`, `context-discipline`, `planning-discipline` — load on-demand like the rest; if you want the mindset on *every* task instead, paste `prompts/staff-engineer.md`'s body into mcp-manage's global Instructions panel.

Prompts vs skills: `prompts/` are self-contained copy-paste artifacts for any chat UI; `skills/` assume an agent with tools. Same judgment, two delivery vehicles — if you edit one, mirror the change in the other.

## Portability notes

Things these prompts do deliberately, because they matter more on some models than others:

- **Judgment is operationalized.** "Does the change fit the existing boundaries; is every abstraction paid for by a real requirement" transfers to any model; "review the architecture" does not. Taste survives as checklists, not adjectives.
- **Internal coherence is externalized.** A frontier model holds a long task together internally; most models lose the thread. The protocol layers compensate in the visible output: goal, plan, and facts get restated at every transition (the working-state block), every load-bearing fact carries a VERIFIED / INFERRED / ASSUMED tier, and reading happens against a stated prediction so surprises register instead of slipping by. Discipline that lives in the output can't silently decay.
- **Explicit output templates.** Frontier models infer format; smaller and open-weight models drift without one. A template costs nothing on strong models and rescues weak ones.
- **No demands for visible step-by-step reasoning.** Reasoning models do that internally; forcing it into the output adds noise and can hurt quality. Where care is needed, the prompts say *what to check*, not "think out loud".
- **Anti-fabrication clauses** ("if unsure, say so", "never invent APIs"). The single highest-value line for open-weight models, still worthwhile on frontier ones.
- **The most important constraint appears near the end as well as the start** of the longer prompts — models weight the end of a prompt heavily.
- **Concrete failure criteria** ("every BUG needs a failing scenario") instead of adjectives ("be thorough"). Adjectives get interpreted differently per model; criteria don't.

Practical tips when switching models:

- For deterministic tasks (review, refactor, tests), use low temperature if the API exposes it.
- If a model ignores the output format, move the format section to the very end of the prompt and shorten it.
- If a model over-explains, add: "No preamble. Start directly with the first section of the output format."
- If a model under-delivers on long inputs, put the instructions *after* the input tags instead of before.

## Adapting a prompt

To tune one of these for a specific model or a recurring task, run it through [improve-prompt.md](prompts/improve-prompt.md) with the target model named in `<intent>` — ideally while you still have a stronger model on hand to do the rewriting.
