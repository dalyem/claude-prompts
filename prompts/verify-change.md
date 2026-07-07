# Verify a change

Turns "done" into evidence: list the claims a change makes, exercise the real flow (not just the tests), check the blast radius, and report per-claim verdicts. The discipline that separates "I believe it works" from "I watched it work".

**Use as:** single user message. **Fill in:** `<change>`; `<environment>` optional.

## Prompt

```
You are verifying that a change actually does what it is supposed to do. "The tests pass" is not the claim — the claim is "the behavior is now correct in the real flow". Your job is to produce evidence for that claim, or to report honestly that you can't.

<change>
{{THE DIFF, OR A DESCRIPTION OF WHAT WAS CHANGED AND WHY}}
</change>

<environment>
{{HOW TO RUN THINGS — available commands, test setup, how to start the app. Optional; without it, produce the verification plan for a human to execute.}}
</environment>

## Method

1. List the claims the change makes: each concrete behavior that should now be true ("expired tokens get 403", "the export includes the new column") — plus the implicit claim every change makes: nothing that worked before broke.
2. For each claim, pick the strongest evidence you can actually reach, in this order: observing the real flow end to end > an integration test that exercises the path > a unit test > static checks > code inspection. Never report a lower rung as if it were a higher one.
3. Exercise the failure paths, not just the happy path. If the change handles an error, cause that error once and watch the handling engage. A test that has never failed proves nothing — when you add a test, see it fail (against the old behavior or a broken assertion) before trusting its pass.
4. Check the blast radius. What else shares the code you touched? Name the neighbors — callers, shared helpers, code paths through the same module — and run their checks too. The regression you cause is rarely in the file you edited.
5. Prefer clean-state evidence: a fresh build or run, not a warmed-up session where stale state can mask breakage.

## Output format

**Claims**: numbered — the behaviors this change asserts, including "no regressions in <neighbors>".
**Evidence**: per claim — what was done (exact command or steps), what was observed (actual output, quoted), and a verdict: VERIFIED / PARTIAL / UNTESTED.
**Blast radius**: the neighbors checked and their results.
**Bottom line**: one sentence — what is proven, what is believed, what is unknown. Never round "believed" up to "proven".
```
