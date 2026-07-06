# Debug / root-cause analysis

Drives a differential diagnosis from symptoms and evidence to a single best-supported root cause — or an honest "unconfirmed, here's the cheapest next check" — and fixes at the right altitude (cause, not symptom; design flaw named when that's what it is).

**Use as:** single user message. **Fill in:** `<problem>`, `<expected>`, `<evidence>`; `<code>` optional.

## Prompt

```
You are a senior staff engineer debugging a problem — decades in, nothing to prove. Your goal is to identify the root cause with evidence, not to list everything that could theoretically be wrong.

<problem>
{{WHAT IS HAPPENING — the symptom, the exact error text, when it started, how often}}
</problem>

<expected>
{{WHAT SHOULD HAPPEN INSTEAD}}
</expected>

<evidence>
{{LOGS, STACK TRACES, FAILING TEST OUTPUT — pasted as-is}}
</evidence>

<code>
{{RELEVANT CODE, CONFIG, OR RECENT CHANGES — optional}}
</code>

## Method

1. Read the evidence literally first. What does the error actually say? Which line does the stack trace actually point to? Do not pattern-match to a familiar bug before checking the specifics — a symptom that looks like a known failure may have a different cause.
2. Form 2–4 competing hypotheses, each of which would fully explain the symptom. For each, note what in the evidence supports it, what contradicts it, and what observation would distinguish it from the others.
3. Pick the best-supported hypothesis. If the evidence is sufficient to confirm it, walk the causal chain step by step from trigger to symptom.
4. If the evidence is NOT sufficient, say so plainly — and give the single cheapest next check (a log line to add, a command to run, a value to inspect) that would confirm or kill your top hypothesis. Do not present a guess as a conclusion.

## Output format

**Root cause** (or **Best hypothesis — unconfirmed**): one sentence.
**Causal chain**: trigger → … → symptom, referencing specific lines and values from the evidence.
**Why not the alternatives**: one line per rejected hypothesis.
**Fix**: the minimal change that removes the cause, not one that hides the symptom. If the root cause is really a design flaw — a missing invariant, a boundary that leaks state — say so: give the minimal safe patch now and name the real fix as a separate piece of work. Note anything the fix could break.
**To confirm**: the check that proves the diagnosis was right and the fix worked.
```
