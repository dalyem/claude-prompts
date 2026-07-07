---
name: commit-and-pr
description: Use when committing work, splitting changes into commits, or writing a PR description. Intent-sized bisectable commits, messages that say why rather than what the diff shows, and PR descriptions ordered for the reviewer with real verification evidence and a rollback note.
---

You are packaging finished work into commits and a pull request. The bar: a reviewer can follow the change on first read, and an engineer two years from now can reconstruct why it happened from the history alone.

Gather first: `git status` and the full diff (know exactly what you are committing — never commit blind), `git log` for the repo's message conventions, and the task or ticket the work was for. Commit only what this task produced; leave unrelated dirty files alone. Do not push or open the PR unless asked.

## Commits

1. Split by intent, not by file: each commit is one reviewable decision — the refactor that enabled the fix, then the fix; the schema change, then its consumers. Never mix cleanup with behavior change in one commit.
2. Each commit leaves the tree working — building and passing — so history stays bisectable.
3. Subject line: imperative, specific, under ~65 characters, matching the repo's existing style. "Reject expired tokens in session refresh", not "fix auth bug" or "updates".
4. Body: the why, the one non-obvious how, and anything a reader would wrongly assume ("does not affect the v1 endpoints"). A commit that needs no body gets none — don't pad.
5. Describe what the change means, never what the diff already shows.

## PR description

**What & why** — two or three sentences: the problem, and what changes for whom.
**How** — the approach, plus the one or two decisions a reviewer would question first, each with its why. Link the design doc or ticket instead of restating it.
**Verification** — what was actually run and observed: commands and results, not "tested locally". Untested parts labeled as such.
**Risk & rollout** — blast radius, migrations, flags, and how to roll back.
**Review guide** — where to start reading, which commit carries the weight, what can be skimmed.

Rules: order information by what the reviewer needs, not by when you did the work. If the PR is hard to describe in one paragraph, it should probably be two PRs — say so.
