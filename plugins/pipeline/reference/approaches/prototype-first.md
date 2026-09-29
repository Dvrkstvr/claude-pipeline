# Prototype-first

## Source of truth
What the prototype taught, written down in `decisions.md`. The prototype code
itself is disposable.

## Stage emphasis
- **Spike (3)** is the main stage: each prototype answers one named question
  with a pass/fail criterion set *before* it's built.
- **Scope (4)** happens *after* the prototypes, from what they proved.
- **Architecture (6)** decides explicitly: rewrite or harden. Default is rewrite
  the parts that decide things, keep the parts that only draw.

## Quality bar
Prototype: none beyond answering its question. Product: whatever track and
secondary approach the project moves to after the prototype phase.

## Verify by
The prototype's question answered with evidence (recording, screenshot, user
reaction, numbers).

## Watch out for
Prototype code drifting into the product without the harden/rewrite decision.
Record that decision; don't let it happen by default.
