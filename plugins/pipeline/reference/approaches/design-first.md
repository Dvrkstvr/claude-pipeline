# Design-first

## Source of truth
The design (mockups in `pipeline/design/`, or an external design file named in
the playbook). When code and design disagree, it's a bug in the code unless a
decision in `decisions.md` says otherwise.

## Stage emphasis
- **Design (5)** runs for every screen and every new interaction, before its
  milestone. Tokens (colour, type, spacing, radius, motion) come first and are
  the only place those values may live.
- **Scope (4)** lists screens and flows, each with its mockup task.
- **Review (8)** always includes the `ux` lens, and `copy` once there's text.

## Quality bar
No hardcoded visual values outside tokens. Every state drawn (empty, error,
loading, refused). Motion rule stated once in the playbook and followed.

## Verify by
Running the app and comparing screens against their mockup (screenshots in the
verifier's evidence).

## Watch out for
Mockups that grow into 90 KB prototypes — keep them decision documents. A
feature built before its mockup settles is rework waiting to happen.
