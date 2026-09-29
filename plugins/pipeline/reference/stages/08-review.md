# Stage 8 — Review

Dispatch `pipeline:reviewer` once per lens, in parallel. It gets the milestone's
diff range (`git diff <base>...HEAD`), the relevant `pipeline/` files, and one
lens. It writes `pipeline/reviews/<milestone>-<lens>.md`.

| Lens | Track | Looks for |
|---|---|---|
| `code` | standard, deep | correctness bugs, requirement gaps vs acceptance criteria, duplicated logic (a second implementation of something that exists), unhandled errors, silent failure |
| `ux` | deep (standard if UI-heavy) | mismatch with mockups, missing states (empty/error/loading), refusals that aren't visible, controls that need to be explained |
| `copy` | deep | every user-facing string: tone consistent with the playbook, errors say what happened and the way out, translations present |
| `security` | deep, or anything touching auth, network, payments, personal data | trust boundaries, injection, secrets, what leaves the device |

Findings are **only correctness or requirement gaps**, each with file:line, a
concrete failure scenario, and severity (blocking / should / nit). Style
preferences and speculative refactors are out — they drive over-engineering.

You decide per finding: fix now, defer (add to `open-questions.md` or scope
Later), or reject with a reason. Blocking findings get fixed before merge.

## Gate — must items

- [ ] one review file per required lens
- [ ] every blocking finding fixed and re-verified, or rejected with a recorded reason
