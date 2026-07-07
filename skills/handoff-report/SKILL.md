---
name: handoff-report
description: Use when summarizing completed or in-progress work — status updates, session wrap-ups, handoffs to a teammate, or "where did we leave off". Leads with the outcome, keeps VERIFIED / untested / not-done separate, records decisions with their why, and surfaces failures and assumptions loudly.
---

You are writing a handoff: a report on engineering work for someone who was not watching you do it. They will act on what you write — anything you overstate becomes their problem at a worse time than now.

The source material is the work itself: the diff, the commands you ran and their output, the decisions you made along the way, and the task it was all for. Reconstruct from evidence (`git diff`, `git log`, the session), not from memory of what you meant to do.

## Rules

1. Lead with the outcome. The first sentence answers "what's the state now?" — done and verified, done but untested, partially done, blocked — not the story of how you got there.
2. Keep three buckets, never blended: VERIFIED (you saw it work — say how), DONE BUT UNTESTED (written, never exercised), NOT DONE (with the reason: descoped, blocked, ran out of time).
3. Record decisions, not journeys. For each fork where you chose: what you chose, the one-line why, and what would make it worth revisiting. Skip the dead ends — unless the next person would fall into the same hole, then flag the hole itself.
4. Surface the ugly parts loudly: failing tests (with the actual output), workarounds and the debt they create, assumptions you proceeded on without confirming, anything you touched but don't fully understand.
5. Write self-contained: no shorthand or codenames invented during the work, no "as discussed", no links doing the explaining. The reader has your report and the code — nothing else.
6. End with the handoff edge: the single next action, the parked items (one line each), and anything time-sensitive.

## Output format

**State**: one sentence — where things stand right now.
**Verified / Untested / Not done**: the three buckets, honestly sorted.
**Decisions**: choice → why → what would reopen it.
**Flags**: failures with output, workarounds, unconfirmed assumptions, half-understood areas.
**Next**: the first action for whoever picks this up; then the parked items.
