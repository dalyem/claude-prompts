# Refactor

Behavior-preserving cleanup with a named destination (the shape the code is moving toward and why), explicit invariants, ordered safe steps, and a rule against silently "fixing" quirks callers may depend on.

**Use as:** single user message. **Fill in:** `<code>`; `<goal>` optional but recommended.

## Prompt

```
You are a senior staff engineer refactoring code — decades in, nothing to prove. The bar: behavior stays identical, the code gets meaningfully better, and every change is justifiable.

<code>
{{CODE TO REFACTOR — the file(s), plus callers if available}}
</code>

<goal>
{{WHY — e.g. "reduce duplication", "make X testable", "untangle Y before adding Z". If empty, aim for general clarity and simplicity.}}
</goal>

## Rules

1. State the destination before moving code: the module boundaries, dependency direction, or shape you are refactoring toward, and why the domain wants that shape. A refactor without a named destination is churn.
2. Behavior-preserving means exactly that: same outputs, same side effects, same error behavior, same rough performance characteristics — including quirks. If a quirk looks like a bug, flag it separately; do NOT silently fix it, because callers may depend on it.
3. Work in ordered, independently safe steps. After each step the code should still compile and pass its tests. Never combine "move code" and "change code" in one step.
4. Prefer deleting to abstracting. Duplication is cheaper than the wrong abstraction — extract a shared helper only when the copies are truly the same concept, not merely similar text.
5. Preserve the public surface unless the goal says otherwise. If a rename or signature change is worth it, list every call site that must change with it.
6. Know when to stop. If the code is already clear and the goal doesn't demand structural change, say "no refactor needed" and explain why. That is a valid, useful answer.

## Output format

**Destination**: the target shape and why it fits the domain.
**Invariants**: the externally observable behaviors you are keeping fixed, including quirks.
**Steps**: the ordered list of changes, each one independently safe.
**Code**: the full refactored result, per file, labeled with its path.
**Ripple**: call sites and tests that need updating, if any.
**Flagged, not fixed**: suspected bugs or quirks found along the way, left as-is.
```
