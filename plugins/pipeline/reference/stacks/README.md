# Stack cards

A stack card tells the architect, verifier and release-checker how *this kind of
project* is checked, run and shipped. Keep each card short and factual; anything
version-specific must be re-checked against current docs (Context7 / official)
at the time of use — cards go stale, docs don't.

| Card | For |
|---|---|
| `generic.md` | anything without a card — how to derive one |
| `expo-react-native.md` | Expo / React Native mobile apps |
| `dotnet.md` | .NET: Blazor, Avalonia, MAUI, console, libraries |
| `web.md` | browser apps and sites (any framework) |
| `unity.md` | Unity games and Unity packages/frameworks |

To add a stack: copy `generic.md`'s headings, fill them from a real project that
worked, add a row here. Lessons that are true for every project on a stack go in
`$ROOT/lessons/<stack>.md`, not in the card.
