# dotnet-grok Skill

This skill integrates xAI Grok capabilities for .NET development, MCP tools, and agentic workflows. Optimized for Grok's truth-seeking, reasoning, and tool-using nature.

## Core Principles

1. **Truth-seeking analysis** — Leverage Grok's focus on maximum truthfulness for code reviews, architecture decisions, and debugging.
2. **MCP Integration** — Use Model Context Protocol to connect Grok to .NET tools, GitHub, build systems, etc.
3. **Dynamic Learning** — Use Grok to help the project acquire new .NET knowledge via web search, code execution, and analysis.
4. **Plugin Usability** — Ensure dotnet-artisan runs seamlessly with Grok, Claude, etc.

## Key Capabilities

* **Code Generation & Review**: Prompt Grok for modern .NET patterns (Minimal APIs, AOT, etc.), performance optimizations, security audits.
* **MCP Tool Usage**: Connect to GitHub MCP for repo management, fork, branch, PR creation, file edits.
* **xAI API Integration**: Examples for calling Grok models in .NET apps using OpenAI compatible client.
* **Agent Orchestration**: Build agents that use Grok for complex .NET tasks.
* **Learning & Documentation**: Generate guides, analyze repos for improvements, integrate latest knowledge.

## Enhanced Grok MCP Usage Example

Grok can:
1. Analyze repository files using connected tools.
2. Check for .NET best practices compliance.
3. Optimize SKILL.md and other files.
4. Create branches and submit PRs to main.

## xAI Grok API Integration Example

```csharp
// Use OpenAI-compatible client for Grok API
using OpenAI;

var client = new OpenAIClient(new OpenAIClientOptions
{
    BaseUri = new Uri("https://api.x.ai/v1"),
    ApiKey = Environment.GetEnvironmentVariable("XAI_API_KEY")
});

var response = await client.Chat.Completions.CreateAsync(new ChatCompletionCreateRequest
{
    Model = "grok-4",
    Messages = [ new ChatMessage { Role = "user", Content = "Recommend best .NET 10 features for new project" } ]
});
```

## Best Practices

* Use Grok's tools for verification: web_search, code execution in sandbox.
* Prioritize truth and empirical data over conventions.
* For new knowledge: Search latest .NET docs, GitHub issues, integrate findings.
* Ensure plugin helps humans by providing clear usage guides and troubleshooting.

This enhances the plugin's ability to run normally and evolve the project with new knowledge.