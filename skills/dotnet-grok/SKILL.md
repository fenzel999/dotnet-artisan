---
name: dotnet-grok
description: >
  Integration with Grok (xAI) and its MCP tools for .NET development and plugin maintenance.
  Covers sandbox bash, GitHub MCP (branches/PRs/files), file ops, web search for latest .NET
  knowledge, and self-optimization loops. Load when working under Grok, maintaining this
  plugin, verifying plugin health, or capturing new .NET + AI knowledge into skills/references.
---

# dotnet-grok

## Core Principles

1. **Truth-seeking + curiosity** — Prefer verifiable facts (run `dotnet build`, check official docs, inspect repo state) over assumptions.
2. **Additive & non-breaking** — All changes to the plugin must keep zero-config install and existing skills/agents/hooks intact.
3. **Human-first usability** — Clear install steps, verification checklist, and bilingual docs so humans can confirm the plugin runs normally.
4. **Continuous learning** — Use tools + `dotnet-learning-agent` to capture new .NET patterns, anti-patterns, and Grok MCP workflows into MEMORY.md or skills/references.

## When to Load This Skill

- Running under Grok / xAI environment
- Maintaining or optimizing the dotnet-artisan plugin itself
- Creating branches, PRs, or updating files via GitHub MCP
- Verifying that the plugin activates correctly on a .NET project
- Discovering new .NET features and folding them back into the skill set

## MCP Tool Playbook (Grok)

### Repository & PR workflow

```
1. github___list_branches / github___get_repository_tree  → inspect current state
2. github___create_branch (if needed) or work on existing branch (e.g. grok_update)
3. github___get_file_contents → read before edit
4. github___create_or_update_file or github___push_files → commit changes
5. github___create_pull_request → open PR to main
6. Wait for human review (do not auto-merge unless explicitly requested)
```

### Sandbox validation (ensure plugin / code runs normally)

```
bash:  dotnet --list-sdks
bash:  dotnet build /path/to/project.csproj -c Release
bash:  dotnet test  --no-build
file ops: read/write temporary scripts or csproj snippets for experiment
```

### Knowledge acquisition

```
web_search / open_page → latest .NET release notes, EF Core docs, ASP.NET patterns
x_keyword_search / x_semantic_search → community discussions when needed
Then: invoke learning agent to generalize and persist the insight
```

## Plugin Health Checklist (for humans & agents)

1. Install:
   ```bash
   claude plugins marketplace add fenzel999/dotnet-artisan
   claude plugins install dotnet-artisan
   ```
2. Open any directory containing a `.csproj` or `.sln`.
3. Ask: “这个项目用的什么 .NET 版本？” / “What .NET version is this project targeting?”
4. Expected: AI detects TargetFramework and answers correctly (using-dotnet + advisor activated).
5. Further checks: see `skills/dotnet-workflow/references/plugin-verification.md` and root `GUIDE.md`.

## Learning Loop (help the project grow)

1. Discover a new pattern (via sandbox, docs, or user correction).
2. Generalize it (e.g. “prefer TimeProvider over DateTime.Now”).
3. Deduplicate against existing skills/CHEATSHEET.md / DECISIONS.md.
4. Write into MEMORY.md (session) or add a short reference under the appropriate skill.
5. Keep changes additive so the plugin continues to run for all users.

## Anti-patterns

- Truncating existing high-quality docs (README, INDEX, CHANGELOG) — always restore full content first.
- Breaking zero-config behavior or hooks.
- Hard-coding secrets or assuming network access inside sandbox when internet is disabled.
- Auto-merging PRs without human review when the goal is “等待审核”.

## Relationship to Other Skills

- `dotnet-ai` — broader LLM / Semantic Kernel / MCP server patterns (includes Grok endpoint examples).
- `dotnet-learning-agent` — the actual agent that captures and persists corrections.
- `dotnet-workflow` — plugin verification and parallel workflow orchestration.
- `using-dotnet` + `dotnet-advisor` — entry point and decision-maker that should remain the primary router.

## Out of Scope

- Replacing the core decision-maker or any existing skill.
- Platform-specific UI or pure C# language rules (see `dotnet-ui` / `dotnet-csharp`).
