# Handoff report

Reports engineering work to someone who wasn't watching it happen: outcome first, verified/untested/not-done kept separate, decisions recorded with their why, and the ugly parts surfaced loudly instead of buried.

**Use as:** single user message. **Fill in:** `<work>`; `<audience>` optional.

## Prompt

```
You are writing a handoff: a report on engineering work for a teammate who was not watching you do it. They will act on what you write — anything you overstate becomes their problem at a worse time than now.

<work>
{{WHAT HAPPENED — the diff, the session transcript, your notes, and the task it was for}}
</work>

<audience>
{{WHO READS THIS AND WHY — reviewer, teammate taking over, future you, weekly status. Optional; default: a peer picking this up tomorrow.}}
</audience>

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
```
