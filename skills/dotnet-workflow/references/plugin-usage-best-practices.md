# dotnet-artisan Best Practices Guide

How to get the most out of the dotnet-artisan plugin for .NET development.

## Getting Started

### Installation

```bash
# One-time setup
claude plugins marketplace add fenzel999/dotnet-artisan
claude plugins install dotnet-artisan
```

No further configuration needed. Open any .NET project and the plugin auto-activates via harness hooks.

### Verify It's Working

See [plugin-verification.md](plugin-verification.md) for a step-by-step verification guide.

## Daily Workflow Patterns

### Pattern 1: Building Something New

```
You: "I need a Web API for managing customer orders"
```

**What happens:**
1. `using-dotnet` detects .NET intent
2. `dotnet-advisor` asks clarifying questions:
   - What type of orders? (PO, customer, work order?)
   - Who uses it?
   - .NET version? Database?
3. Domain glossary is captured before any code
4. Architecture is chosen (single/VSA/DDD)
5. Skills loaded in parallel: `dotnet-api` + `dotnet-tooling` + `dotnet-testing`
6. Self-documenting code generated

**Do**: Be specific about your domain — the more context you give, the better the results.
**Don't**: Expect great results from "build me an API" with no domain context.

### Pattern 2: Getting a Second Opinion

```
You: "Review this code for security issues"
```

Routes to `dotnet-security-reviewer` (read-only). The agent checks OWASP Top 10, secret leaks, crypto misuse, and reports findings without modifying code.

**Use when**: You want a security audit without any risk of code changes.

### Pattern 3: Teaching the Plugin Your Conventions

```
You: "Remember, this project uses MediatR for CQRS"
```

Routes to `dotnet-learning-agent`. The agent:
1. Captures the rule: "Use MediatR for CQRS"
2. Stores it in `.claude/MEMORY.md`
3. Applies it in future sessions

**Do**: Teach patterns as you go — the plugin compounds knowledge over time.

### Pattern 4: Debugging a Crash

```
You: "The app crashes with OutOfMemoryException, I have a dump file"
```

Routes to `dotnet-debugging`. The agent helps analyze WinDbg/dotnet-dump output.

**Provide**: Full dumps (not mini), PDB paths, and the exact exception message.

### Pattern 5: Systematic Code Cleanup

```
You: "Clean up this project"
```

Routes to `dotnet-code-lifecycle-agent`. Runs the 7-step pipeline:
1. Formatting → 2. Unused usings → 3. Fix warnings → 4. Remove dead code → 5. Resolve TODOs → 6. Seal classes → 7. CancellationToken audit

Each step is verified with `dotnet build && dotnet test` before proceeding.

## Skill-Specific Tips

### dotnet-api
- Always specify the .NET version — this determines available features (AddValidation, HybridCache, etc.)
- Tell the agent if you need AOT compatibility (affects serialization, DI, reflection)
- If you want a specific database, mention it (PostgreSQL vs SQL Server vs CosmosDB)

### dotnet-csharp
- This skill loads automatically for every .NET task
- It enforces: `TimeProvider` not `DateTime.Now`, `IHttpClientFactory` not `new HttpClient()`, no Repository pattern
- If you need an exception to the rules, say so explicitly: "Use DateTime.Now here, it's a legacy constraint"

### dotnet-testing
- Defaults to xUnit v3 + Testcontainers for integration tests
- If you prefer NUnit or MSTest, say so upfront
- BDD scenarios use Reqnroll (MIT-licensed) — tell the agent if you need .feature file support

### dotnet-devops
- Defaults to GitHub Actions. For Azure DevOps: mention it.
- Containers default to chiseled Ubuntu + non-root user
- Version migration: always one version at a time (no direct 8→10)

### dotnet-tooling
- New projects default to `.slnx` format (not `.sln`)
- Uses Central Package Management (CPM) by default
- CLI apps use System.CommandLine (not CommandLineParser or McMaster)

### dotnet-ui
- Ask about Blazor render modes explicitly (Server vs WASM vs Auto vs Hybrid)
- For MAUI, specify target platforms (iOS, Android, Windows, macOS)
- For cross-platform beyond MAUI's reach, ask about Uno Platform

## Combining Skills for Complex Tasks

For multi-step tasks, decompose intentionally:

### Full-Stack App Request

```
You: Build a Blazor CRUD app with:
     - .NET 10 + PostgreSQL
     - GitHub Actions CI/CD
     - xUnit tests
     - Container deployment
```

**Expected routing**: Chained invocation of `dotnet-ui` (Blazor) + `dotnet-api` (EF Core) + `dotnet-testing` (xUnit) + `dotnet-devops` (CI/CD + containers) + `dotnet-tooling` (scaffolding)

### Migration Request

```
You: Upgrade this project from .NET 8 to .NET 10, with tests
```

**Expected routing**: `dotnet-devops` (version migration) → `dotnet-tooling` (AOT assessment) → `dotnet-testing` (test updates)

## Context Management

Claude Code has a 200k token window. For large projects:

1. **Be specific about scope**: "Fix the bug in OrderService.cs" not "Fix all bugs"
2. **Use subagents for analysis**: The specialist agents run in sub-sessions with their own context
3. **One concern per conversation**: Don't mix refactoring with feature work
4. **Let the agent read the minimum**: It lazy-loads files — don't overload with context

## Troubleshooting

### "The agent isn't loading skills"

**Fix**: Make sure you're in a .NET project directory (has `.csproj`, `.sln`, or `.slnx` files). If the project is pure C# files without a project file, skills may not auto-load.

**Workaround**: Manually trigger: `[skill:using-dotnet]` then `[skill:dotnet-advisor]`

### "The agent uses the wrong .NET version"

**Fix**: Add or update `global.json`:
```json
{
  "sdk": { "version": "10.0.100" }
}
```

### "The agent recommends commercial packages"

The plugin has a no-commercial-packages rule. Remind the agent:
``` 
"We only use free/open-source packages. Check package-choices.md."
```

### "The agent ignores my project conventions"

Use the learning agent explicitly:
```
"Remember that this project uses custom IResult types instead of TypedResults"
```
This stores the rule in MEMORY.md for future sessions.
