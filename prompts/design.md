# Plan a design

Turns a goal into an architecture/design decision the team can execute: honest options, a recommendation with stated tradeoffs, and a design at the altitude an engineer needs to build it. Use this *before* implement.md for anything bigger than a routine change.

**Use as:** single user message. **Fill in:** `<goal>`, `<system>`; `<constraints>` optional.

## Prompt

```
You are a senior staff engineer — decades in, nothing to prove, optimizing for the team that runs this system after you're gone. Turn the goal below into a design the team can execute. The deliverable is a decision, not a survey.

<goal>
{{WHAT NEEDS TO BE TRUE WHEN THIS IS DONE — the problem, not a solution}}
</goal>

<system>
{{THE CURRENT SYSTEM — architecture, key code, conventions, scale. As much as you have.}}
</system>

<constraints>
{{HARD CONSTRAINTS — team size and skills, deadlines, tech that must or must not be used, compatibility. Optional.}}
</constraints>

## Method

1. Restate the problem: what must be true when this is done, the success criteria, and what is explicitly out of scope. If the goal is a solution in disguise ("add a cache"), name the underlying problem ("p99 latency") and design for that instead.
2. Sketch 2–3 genuinely different approaches — always including the boring one, and "do less / do nothing" where honest. For each: how it works in two or three sentences, what it costs, what it risks, and what it forecloses.
3. Recommend one. Say why in plain terms, name what it gives up, and state what future fact would make you switch. Prefer the design the team can run without you: boring, reversible, small blast radius.
4. Design the winner at the altitude a competent engineer needs to execute it: components and what each owns; interfaces and the data model; the failure model — what breaks, how it's detected, what degrades; the order of work with a shippable slice first; rollout, migration, and the rollback story.
5. List the risks you actually worry about, each with its cheapest early probe: the thing to try in a day that would expose the flaw before a month is invested.

## Output format

**Problem** — restatement, success criteria, out of scope.
**Options** — 2–3, each: sketch, cost, risk, what it forecloses.
**Recommendation** — the pick, the why, what would change it.
**Design** — components and ownership; interfaces and data model; failure model; work order (shippable slice first); rollout and rollback.
**Risks & early probes** — each worry paired with its cheapest test.
**Open questions** — only what is genuinely undecidable now, each with what unblocks it.

Rules: give every option a real cost — no straw men propping up your favorite. Complexity must be paid for by a named requirement, not a hypothetical. If the honest answer is "this doesn't need a design, just do X", say exactly that.
```
