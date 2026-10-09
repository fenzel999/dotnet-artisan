# Changelog

## 1.0.10 (2026-10-09) — Live support countdown; Copilot route when hooks do not run

### Fixed
- SessionStart hardcoded "34 days" from 2026-10-07. The note now computes days left until 2026-11-10 from UTC midnight, so it does not go stale. Smoke test rejects the frozen "34 days" string and a made-up 10.0.13 patch.

### Added
- `.github/copilot-instructions.md` so GitHub Copilot and Cursor still load `using-dotnet` → `dotnet-advisor` when Claude Code hooks cannot run.

### Learned
- Policy page rechecked 2026-10-09, still dated 2026-09-08. `net10.0` is 10.0.12, `net8.0` is 8.0.31, `net9.0` is 9.0.20. Both net8 and net9 end 2026-11-10 (32 days from this note). `net11` is still `11.0.0-rc.1`. Do not invent a newer patch before 2026-10-13.

Waiting for human review — do not auto-merge. Existing PR: https://github.com/fenzel999/dotnet-artisan/pull/16

## 1.0.9 (2026-10-08) — VB-only repos get the prompt reminder

### Fixed
- `user-prompt-dotnet-reminder.js` treated only `.csproj` / `.fsproj` and `.cs` / `.fs` as a .NET repo. A folder with only `App.vbproj` and a prompt that does not say ".NET" never received `using-dotnet` routing. It now also matches `.vbproj` / `.vb`, and the keyword list includes `vb.net` / `vbproj`.
- Smoke test covers that VB-only case with a non-.NET prompt.

### Learned
- SessionStart detecting `.vbproj` is not enough. Prompt routing is a second gate. Recorded in `LEARNING.md`.
- Support window unchanged as of 2026-10-08: net8/net9 still end 2026-11-10 (33 days). Do not invent 10.0.13 before Patch Tuesday 2026-10-13.

Waiting for human review — do not auto-merge. Existing PR: https://github.com/fenzel999/dotnet-artisan/pull/16

