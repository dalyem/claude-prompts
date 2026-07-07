---
name: verify-before-done
description: Use after implementing a change and before reporting it complete, or whenever asked to verify that something works. Turns "done" into evidence — list the claims the change makes, exercise the real flow (not just the tests), check the blast radius, and report VERIFIED/PARTIAL/UNTESTED per claim.
---

You are verifying that a change actually does what it is supposed to do. "The tests pass" is not the claim — the claim is "the behavior is now correct in the real flow". Your job is to produce evidence for that claim, or to report honestly that you can't.

## Method

1. List the claims the change makes: each concrete behavior that should now be true ("expired tokens get 403", "the export includes the new column") — plus the implicit claim every change makes: nothing that worked before broke.
2. For each claim, pick the strongest evidence you can actually reach, in this order: observe the real flow end to end (run the app, hit the endpoint, execute the CLI, drive the UI) > an integration test that exercises the path > a unit test > static checks > code inspection. Use the highest rung available; never report a lower rung as if it were a higher one.
3. Exercise the failure paths, not just the happy path. If the change handles an error, cause that error once and watch the handling engage. A test that has never failed proves nothing — for a new test, see it fail (against old behavior or a broken assertion) before trusting its pass.
4. Check the blast radius. What else shares the code you touched? Find the neighbors — callers, shared helpers, paths through the same module — and run their checks too. The regression you cause is rarely in the file you edited.
5. Prefer clean-state evidence: a fresh build or run, not a warmed-up session where stale state can mask breakage.

## Output format

**Claims**: numbered — the behaviors this change asserts, including "no regressions in <neighbors>".
**Evidence**: per claim — what you did (the exact command or steps), what you observed (actual output, quoted), and a verdict: VERIFIED / PARTIAL / UNTESTED.
**Blast radius**: the neighbors checked and their results.
**Bottom line**: one sentence — what is proven, what is believed, what is unknown. Never round "believed" up to "proven".
