# Clarify loop

Runs in the main conversation, because only the main conversation can ask the
user. Called whenever a gate has open `blocking` questions, and by `/pipeline:clarify`.

1. Read `pipeline/open-questions.md`. Take the open `blocking` ones first, then
   any `assumable` ones whose recorded default looks shaky.
2. Before asking, try to answer it without the user: the brief, decisions,
   codebase, docs (Context7 for library behaviour). A question answered from
   evidence is closed with a note, not asked.
3. Ask with `AskUserQuestion`, **at most 4 questions per round**, grouped by
   topic. Each question:
   - states the consequence of each option in one line,
   - puts the recommended option first, labelled `(Recommended)`, with the reason,
   - offers 2–4 concrete options (the user can always type their own).
4. Record every answer:
   - `decisions.md`: new `D-###` entry, `by: user`, with the why in the user's
     words where they gave one.
   - `open-questions.md`: mark the question `answered → D-###`.
5. Re-tag what the answers changed: an answer often turns other blocking
   questions into assumable ones, or creates new ones. Add new questions with
   the next `Q-###` id.
6. Stop when no `blocking` question remains for the current stage, or after
   3 rounds — then summarise what's still open and ask whether to continue,
   proceed on assumptions, or cut the undecided part from scope.

Never ask the user something a quick spike could answer better (e.g. "will this
API work on Android 9?") — that's a `hypothesis` risk, route it to stage 3.
