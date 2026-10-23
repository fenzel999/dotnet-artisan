# Knowledge Promotion Playbook

How this plugin learns new .NET knowledge without breaking zero-config install.

## Core Principles

1. **Session first, repo second** — User corrections go to project `MEMORY.md` immediately. Only promote to `skills/` after the rule is reusable across projects.
2. **Deduplicate before writing** — Check `skills/CHEATSHEET.md`, `skills/DECISIONS.md`, and the target skill's existing `references/`.
3. **Keep SKILL.md thin** — New detail lives in `references/`. SKILL.md only gets a routing-table row.
4. **English in skills/agents** — Human docs at repo root may be bilingual.
5. **Verify the plugin still runs** — After a promotion, run the health checklist in `QUICKSTART.md`.

## Decision Guide

| Signal | Where to store |
|--------|----------------|
| "Remember / we always / don't do that" in one product repo | `.claude` / `MEMORY.md` via `dotnet-learning-agent` |
| Same rule confirmed in 3+ sessions or 2+ projects | Skill `references/` + INDEX.md row |
| Iron rule (TimeProvider, no Repository wrapper, no DateTime.Now) | CHEATSHEET.md + AGENTS.md |
| Grok/MCP-only maintenance workflow | `skills/dotnet-grok/` (this skill) |
| ASP.NET / EF / UI / test / CI pattern | Matching domain skill, not this skill |

## Promotion Steps

```
1. DETECT     user correction, official docs, or sandbox experiment
2. GENERALIZE class-level rule (not a one-line fix)
3. CHECK      CHEATSHEET + INDEX + target references
4. WRITE      short reference: Core Principles → Patterns → Anti-patterns → Decision Guide
5. WIRE       add a Routing Table row in the skill SKILL.md and an INDEX.md link
6. VERIFY     hooks/hooks.json still present; plugin.json version bump if public contract changed
7. PR         branch → main; wait for human review
```

## GOOD

- "Always inject `TimeProvider` instead of calling `DateTime.Now`."
- "On net10.0+ prefer `AddValidation()` over FluentValidation."
- "Dump analysis: ask for `.dmp` before guessing."

## BAD

- Copying an entire MSDN page into SKILL.md.
- Changing hook scripts without a syntax check (`node --check`).
- Auto-merging `grok_update` when the request was “等待审核”.

## Plugin health after a knowledge change

```bash
claude plugins list
# Open a folder with .csproj and ask:
# "这个项目用的什么 .NET 版本？"
```

Expected: TargetFramework detected. If not, see `plugin-verification.md`.
