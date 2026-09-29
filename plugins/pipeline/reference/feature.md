# Feature pass (after the MVP, or any single feature)

The same gates at feature scale. Input: the user's feature idea.

1. **Frame** — append a feature entry to `features.json` (`passes: false`) and a
   short section to `scope.md`: user-visible behaviour, acceptance criteria,
   non-goals. Ask only what's blocking (clarify loop).
2. **Size it** — pick a feature track:
   - *small*: no new data shape, no new platform capability, no new interaction
     pattern → build directly.
   - *normal*: touches stored data, a protocol, or adds a screen → risks note +
     mockup if the approach is design-first.
   - *risky*: new platform capability, sync/protocol change, migration of real
     user data → feasibility check + spike first.
   Recommend one; the user can raise it.
3. For *normal*/*risky*: run stage 2 (scoped to this feature), stage 3 if a risk is
   H and unproven, stage 5 if UI is new. Stored-data changes need a migration
   plan in the feature section **before** code.
4. Build → verify → review → curate exactly as stages 7 and 8, for this one
   feature.
5. Update STATUS.md: feature done with evidence, or where it stopped.
