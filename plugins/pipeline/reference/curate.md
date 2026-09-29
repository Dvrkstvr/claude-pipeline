# Curate

Keeps the project's always-loaded context small and true. Runs after every
milestone, at the end of a spark, and on `/pipeline:curate`.

1. Run `node "$ROOT/scripts/context-budget.mjs"` from the project root.
2. Collect this milestone's lessons: things that went wrong, rules discovered,
   decisions made while building (git log of the milestone, review files,
   `decisions.md` entries since the last curate).
3. File each lesson by the table in `$ROOT/reference/context-rules.md` ("Where a
   new lesson goes"). Prefer a code comment or a path-scoped rule. Create the
   rule file if the area has none.
4. Apply the line test to `CLAUDE.md` and every rule file without `paths:`.
   Move or delete what fails it. Remove anything stale: counts, statuses,
   "currently", references to files that no longer exist (grep to check).
5. Trim `STATUS.md` to ≤ 60 lines — finished history belongs in git.
6. Cross-project lessons (true for every project on this stack or approach):
   show the user the proposed line and the target file under `$ROOT/lessons/`,
   and write it only if they agree — it changes every future project.
7. Re-run the budget script. It must pass before the milestone is called done.

Report to the user in ≤ 6 lines: bytes always-loaded before → after, what moved
where, anything proposed for `lessons/`.
