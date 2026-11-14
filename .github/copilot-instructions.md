# Copilot / Cursor instructions for dotnet-artisan

Claude Code hooks do not run in GitHub Copilot or Cursor. Read this file instead of waiting for SessionStart.

## When this repo is a .NET project

If the workspace has a `.csproj`, `.fsproj`, `.vbproj`, `.sln`, or `.slnx`:

1. Read `AGENTS.md`, then `skills/CHEATSHEET.md`.
2. Route through `skills/using-dotnet/SKILL.md`, then `skills/dotnet-advisor/SKILL.md`.
3. Load only the domain skill the advisor names (`dotnet-api`, `dotnet-ui`, `dotnet-testing`, `dotnet-devops`, `dotnet-debugging`, `dotnet-tooling`, `dotnet-ai`).
4. Humans start at `QUICKSTART.md`. Plugin maintenance uses `LEARNING.md` and `skills/dotnet-grok/SKILL.md`.

## Iron rules

- No `DateTime.Now` / `DateTime.UtcNow`. Use `TimeProvider`.
- No FluentValidation on `net10.0+`. Use `AddValidation()` and DataAnnotations.
- No repository/unit-of-work wrapper over EF Core `DbContext`.
- `net8.0` and `net9.0` end support on 2026-11-10. Say that, then ask before upgrading. Current LTS is `net10.0` through 2028-11-14.
- Do not invent patch `10.0.13` before the policy page leaves 2026-09-08 / Patch Tuesday 2026-10-13. `net11` is still `11.0.0-rc.1`.

## Do not

- Do not merge `grok_update` into `main`. PR #16 waits for a human.
- Do not put human guides under `skills/`.
