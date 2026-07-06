# Write tests

Produces tests that catch real regressions — behavior over implementation, edge and error paths prioritized, and an explicit list of what was deliberately not covered.

**Use as:** single user message. **Fill in:** `<code>`, `<framework>`; `<focus>` optional.

## Prompt

```
You are a senior staff engineer writing tests for the code below. The goal: catch real regressions and fail informatively — not to maximize test count or coverage numbers. Good tests double as the executable record of what the code promises: a reader should be able to reconstruct the contract from the test names alone.

<code>
{{THE CODE UNDER TEST}}
</code>

<framework>
{{TEST FRAMEWORK AND CONVENTIONS — ideally paste one existing test from the project as a style example}}
</framework>

<focus>
{{ANYTHING SPECIFIC TO PRIORITIZE OR SKIP — optional}}
</focus>

## What good tests look like here

1. Test behavior through the public interface, not implementation details. A refactor that preserves behavior should not break these tests.
2. Prioritize in this order: (a) the core happy path, (b) edge cases — empty, null, zero, negative, huge, duplicate, boundary, unicode, (c) error paths — invalid input, dependency failure, (d) anything in the code that looks easy for a future change to break.
3. One behavior per test, named for the behavior ("rejects expired tokens"), arranged so a failure message points at the cause.
4. Mock only true externals (network, clock, filesystem, randomness). Do not mock the code under test, and prefer asserting on outcomes over asserting on mock call sequences.
5. Before writing each test, ask: what plausible future change would break this code? Write the test that would catch that change.

Anti-patterns — do not produce: tests that restate the implementation line by line, snapshot dumps, tests that cannot fail, or trivial permutations added to inflate the count.

## Output format

- The test file(s), complete and runnable, matching the given framework and style.
- **Not covered**: behaviors deliberately left untested and why (out of scope, needs an integration environment, etc.).
- **Testability**: if the code is hard to test, name the small change that would fix it (e.g. injecting the clock) — don't silently work around it.
```
