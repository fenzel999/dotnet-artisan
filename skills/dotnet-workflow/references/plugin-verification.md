# dotnet-artisan Plugin Verification Guide

How to verify that dotnet-artisan is installed and working correctly in Claude Code.

## Quick Verification (30 seconds)

Run these commands in order:

```bash
# 1. Check plugin is installed
claude plugins list

# Expected: dotnet-artisan appears in the list
```

```bash
# 2. Verify skills are registered
# Open any .NET project and ask:
"what skills do you have loaded?"

# Expected: Claude mentions dotnet-csharp, dotnet-api, dotnet-tooling, etc.
```

```bash
# 3. Test the routing pipeline
"what .NET version is this project using?"

# Expected: Claude detects TFM from .csproj/global.json
```

## Step-by-Step Verification

### Step 1: Plugin Installation

```bash
# Install (if not already done)
claude plugins marketplace add fenzel999/dotnet-artisan
claude plugins install dotnet-artisan

# Verify
claude plugins list
```

Expected output includes `dotnet-artisan` with status `installed`.

### Step 2: Harness Hook Verification

The plugin registers three hooks. To verify they're active:

```bash
# Check hooks.json was loaded
# Open any .cs file, write a new class without a purpose comment
# then check if Claude suggests adding one
```

Create a test file:

```csharp
// test.cs (create this in a .NET project directory)
public class TestClass {
    public void DoSomething() { }
}
```

**Expected**: When you save/Write this file, Claude suggests adding a purpose comment (`// Handles X: does Y, Z`).

### Step 3: Skill Loading Verification

Open a .NET project (any project with `.csproj` or `.sln`) and ask:

| Prompt | Expected Behavior |
|--------|-------------------|
| "What skills do you have loaded?" | Lists dotnet-csharp and mentions it's the baseline |
| "Create a simple Web API endpoint" | Loads dotnet-api, uses Minimal API patterns, no Repository/UoW |
| "Write a unit test" | Loads dotnet-testing, uses xUnit v3 patterns |
| "Debug this crash" | Loads dotnet-debugging, asks for .dmp file |
| "Set up CI/CD" | Loads dotnet-devops, asks about GHA vs ADO |

### Step 4: Iron Rules Verification

Test that core rules are enforced:

| Test | What to Say | Expected Behavior |
|------|-------------|-------------------|
| Repository pattern | "Create a repository for my Products" | Claude refuses and says to use DbContext directly |
| DateTime.Now | "Log the current time" | Claude uses TimeProvider, not DateTime.Now |
| FluentValidation | "Add FluentValidation" | On net10.0+: Claude suggests AddValidation() |
| AutoMapper | "Map DTOs with AutoMapper" | Claude suggests Mapperly instead |
| new HttpClient() | "Call an external API" | Claude uses IHttpClientFactory |

### Step 5: Decision-Maker Routing

The decision-maker should decompose complex requests:

```
You: "Build me an e-commerce API with tests and CI/CD"

Expected chain:
1. using-dotnet detects .NET intent
2. dotnet-advisor loads and asks clarifying questions (.NET version, DB, etc.)
3. Loads dotnet-csharp baseline
4. Routes to dotnet-api + dotnet-testing + dotnet-devops in parallel
5. Generates code following self-documenting rules
```

## Common Issues and Troubleshooting

### Issue: Plugin Not Loading

**Symptoms**: Claude doesn't use .NET-specific patterns, doesn't load skills.

**Checks**:
```bash
# Is the plugin installed?
claude plugins list

# Is there a plugin conflict?
claude plugins list --all

# Try re-installing
claude plugins uninstall dotnet-artisan
claude plugins install dotnet-artisan
```

### Issue: Skills Not Auto-Loading

**Symptoms**: Claude writes generic C# code without .NET-version-specific patterns.

**Root Cause**: The `hooks.json` might not be picked up, or the SessionStart hook failed silently.

**Fix**:
1. Verify the project has `.csproj`, `.sln`, or `.slnx` files
2. Check if `.claude/settings.json` or `.claude/hooks.json` exists in the project — if so, it may override the plugin's hooks
3. Manually invoke: `[skill:using-dotnet]` then `[skill:dotnet-advisor]`

### Issue: Hook Errors

**Symptoms**: Claude behaves strangely at session start, on prompt submit, or after file writes.

**Checks**:
```bash
# Verify hook scripts exist
ls scripts/hooks/
# Expected: session-start-context.js, user-prompt-dotnet-reminder.js, check-self-doc.js

# Test script syntax
node --check scripts/hooks/session-start-context.js
node --check scripts/hooks/user-prompt-dotnet-reminder.js
node --check scripts/hooks/check-self-doc.js
```

### Issue: Wrong .NET Patterns for Project Version

**Symptoms**: Claude recommends features not available in the project's TFM.

**Fix**: Make sure your project has an explicit `TargetFramework` in `.csproj`:
```xml
<TargetFramework>net10.0</TargetFramework>
```
Or a `global.json`:
```json
{
  "sdk": {
    "version": "10.0.100"
  }
}
```

### Issue: Agent Not Responding as Expected

**Symptoms**: Invoking a specialist agent doesn't produce deep analysis.

**Fix**: Verify the agent is properly routed:
```bash
# Check plugin.json includes the agent
cat .claude-plugin/plugin.json | grep -A2 agents
```

Some agents require specific trigger phrases:
- `dotnet-architect`: "how should I structure this?"
- `dotnet-domain-analyst`: "run domain analysis"
- `dotnet-security-reviewer`: "is this secure?"
- `dotnet-code-review-agent`: "review this code"

## Verifying the Full Pipeline

For a complete end-to-end test, create a new .NET project and test the full flow:

```bash
# Create a test project
mkdir test-verify-plugin && cd test-verify-plugin
dotnet new webapi -n VerifyApi --use-minimal-apis
dotnet new slnx --name VerifyApi
dotnet sln add VerifyApi/VerifyApi.csproj
```

Then ask Claude in this project:
1. "Add an orders endpoint" — should use Minimal APIs, EF Core, TypedResults
2. "Add tests" — should use xUnit + WebApplicationFactory
3. "Set up CI/CD" — should create GitHub Actions workflow
4. "Review the code" — should find any issues

## Hooks.json Reference

The plugin's `hooks.json` registers these hooks for automatic behavior:

| Hook | File | Fires When | Purpose |
|------|------|-----------|---------|
| SessionStart | session-start-context.js | .NET project opens | Detects TFM, injects routing instructions |
| UserPromptSubmit | user-prompt-dotnet-reminder.js | User types a prompt | Detects .NET keywords, injects routing reminder |
| PostToolUse | check-self-doc.js | Write/Edit on .cs files | Checks for one-line purpose comment |

All hooks are **zero-block**: if they fail, they silently return empty context and never prevent work.
