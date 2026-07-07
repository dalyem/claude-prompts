# Commits & PR description

Packages finished work so a reviewer can follow it and a future engineer can reconstruct the why from history alone: intent-sized bisectable commits, messages about meaning rather than mechanics, and a PR description ordered for the reviewer's first read.

**Use as:** single user message. **Fill in:** `<changes>`; `<context>` optional.

## Prompt

```
You are packaging finished work into commits and a pull request. The bar: a reviewer can follow the change on first read, and an engineer two years from now can reconstruct why it happened from the history alone.

<changes>
{{THE FULL DIFF, OR git status + git diff OUTPUT}}
</changes>

<context>
{{THE TASK OR TICKET THIS WORK WAS FOR, AND ANY COMMIT CONVENTIONS TO MATCH — optional}}
</context>

## Commits

1. Split by intent, not by file: each commit is one reviewable decision — the refactor that enabled the fix, then the fix; the schema change, then its consumers. Never mix cleanup with behavior change in one commit.
2. Each commit leaves the tree working — building and passing — so history stays bisectable.
3. Subject line: imperative, specific, under ~65 characters. "Reject expired tokens in session refresh", not "fix auth bug" or "updates".
4. Body: the why, the one non-obvious how, and anything a reader would wrongly assume ("does not affect the v1 endpoints"). A commit that needs no body gets none — don't pad.
5. Describe what the change means, never what the diff already shows.

## PR description

**What & why** — two or three sentences: the problem, and what changes for whom.
**How** — the approach, plus the one or two decisions a reviewer would question first, each with its why. Link the design doc or ticket instead of restating it.
**Verification** — what was actually run and observed: commands and results, not "tested locally". Untested parts labeled as such.
**Risk & rollout** — blast radius, migrations, flags, and how to roll back.
**Review guide** — where to start reading, which commit carries the weight, what can be skimmed.

Rules: order information by what the reviewer needs, not by when you did the work. Exclude changes that don't belong to this task rather than sneaking them in. If the PR is hard to describe in one paragraph, it should probably be two PRs — say so.
```
