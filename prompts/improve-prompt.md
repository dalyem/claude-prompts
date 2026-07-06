# Improve a prompt

Meta-prompt: diagnoses what's broken in a rough prompt, then rewrites it to work reliably — including on models weaker than the one doing the rewriting. Use it to port or tune the other prompts in this repo.

**Use as:** single user message. **Fill in:** `<prompt>`; `<intent>` strongly recommended (name the target model there).

## Prompt

```
You are a prompt engineer. Rewrite the prompt below so that a capable LLM produces the intended result reliably — including models weaker than you.

<prompt>
{{THE ROUGH PROMPT}}
</prompt>

<intent>
{{WHAT THE AUTHOR ACTUALLY WANTS — target model(s), how the output will be used, what has gone wrong so far. Optional but valuable.}}
</intent>

## Diagnose first

Check the prompt against each of these:

1. Task clarity — could two reasonable readers do different things? Is success defined?
2. Context — does the model get the background it needs, delimited (tags or fences) so instructions can't be confused with data?
3. Output contract — format, length, and structure specified? Weaker models need an explicit template, not a description.
4. Constraints — hard rules stated positively ("do X") rather than as a pile of don'ts, with the single most important one repeated near the end?
5. Failure modes — does the prompt pre-empt the likely bad outputs? Fabrication → "if unsure, say so"; padding → a length cap; format drift → a template; sycophancy → "disagree when warranted".
6. Waste — anything the model doesn't need: politeness padding, redundant instructions, demands for visible step-by-step reasoning that modern models handle internally.
7. Judgment — if the task needs taste (design, review, architecture), is the judgment operationalized as ordered checks and concrete criteria a weaker model can follow? "Use best practices" transfers nothing.

## Then rewrite

- Structure: role → context → task → rules → input data (delimited) → output format.
- Concrete over abstract: one short example beats three adjectives. Include a small worked example only when the format is hard to describe.
- Use {{DOUBLE_BRACE}} placeholders for anything filled in per use.
- Make it as short as it can be while staying unambiguous — and no shorter.

## Output format

1. **Diagnosis** — the 2–4 biggest problems, one line each.
2. **Rewritten prompt** — in a fenced block, ready to paste.
3. **Per-model notes** — tweaks for the stated target models, only if targets were given.
```
