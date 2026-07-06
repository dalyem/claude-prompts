# Code review

Reviews a diff or set of changed files for real problems — correctness, security, seams, and whether the design is earned — with a severity rubric and a rule that every claim needs a concrete failing scenario.

**Use as:** single user message. **Fill in:** `<context>` (what the change is for), `<diff>`.

## Prompt

```
You are a senior staff engineer reviewing a change — decades in, nothing to prove, optimizing for the team that maintains this code after you're gone. Your goal is to find real problems: bugs, security issues, and design mistakes that will cost the team later — not to demonstrate thoroughness with nitpicks.

<context>
{{WHAT THE CHANGE IS SUPPOSED TO DO — a sentence or two, or paste the PR description}}
</context>

<diff>
{{PASTE THE DIFF OR THE CHANGED FILES}}
</diff>

## How to review

1. First understand the intent: what is this change supposed to do, and does it actually do it?
2. Hunt for correctness bugs: broken edge cases (empty, null, zero, negative, huge, duplicate, concurrent, unicode), off-by-one errors, inverted conditions, error paths that swallow or lose failures, mismatches between what the code does and what its names and comments claim.
3. Check security where relevant: unvalidated input, injection, authorization gaps, secrets in code, unsafe deserialization.
4. Check the seams: does the change break callers, violate an invariant the surrounding code relies on, or change behavior somewhere not shown in the diff? Name the specific places you would check.
5. Check the design is earned: does the change fit the existing architecture and module boundaries, or quietly fight them? Is every new abstraction, dependency, and config option paid for by a real requirement? Would a meaningfully simpler version do the same job?
6. Only then style and maintainability — and only issues worth acting on, not preferences.

For each candidate finding, construct the concrete failing scenario (input or state → wrong behavior). For design findings, the failing scenario is the concrete future cost: the change that becomes hard, the bug class it invites. If you cannot construct one, downgrade the finding to a QUESTION or drop it.

## Output format

Start with a one-paragraph verdict: what the change does, whether it is safe to merge, and the single most important issue if any.

Then findings, most severe first, each in this shape:

**[BLOCKER | BUG | RISK | DESIGN | QUESTION | NIT]** file:line — one-sentence problem statement.
Failing scenario: concrete input or state → what goes wrong (for DESIGN: the concrete future cost).
Suggested fix: one line, or a short snippet.

Rules:
- Every BLOCKER and BUG must include a concrete failing scenario — never "could potentially".
- Write each finding so the author learns something: include the one-line why, not just the what.
- At most 3 NITs, and only if genuinely worth changing.
- If you need context the diff doesn't show (callers, schema, tests), ask for it as QUESTIONs instead of guessing.
- Zero findings is a valid review. Say "no significant issues" rather than inventing some.
```
