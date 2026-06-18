# dotnet-grok Skill

This skill integrates xAI Grok capabilities for .NET development, MCP tools, and agentic workflows. Optimized for Grok's truth-seeking, reasoning, and tool-using nature.

## Core Principles
1. **Truth-seeking analysis** — Leverage Grok's focus on maximum truthfulness for code reviews, architecture decisions, and debugging.
2. **MCP Integration** — Use Model Context Protocol to connect Grok to .NET tools, GitHub, build systems, etc.
3. **Dynamic Learning** — Use Grok to help the project acquire new .NET knowledge via web search, code execution, and analysis.
4. **Plugin Usability** — Ensure dotnet-artisan runs seamlessly with Grok, Claude, etc.

## Key Capabilities
- **Code Generation & Review**: Prompt Grok for modern .NET patterns, performance optimizations, security audits.
- **MCP Tool Usage**: Connect to GitHub MCP for repo management, fork, branch, PR creation.
- **xAI API Integration**: Examples for calling Grok models in .NET apps.
- **Agent Orchestration**: Build agents that use Grok for complex .NET tasks.
- **Learning & Documentation**: Generate guides, analyze repos for improvements.

## xAI Grok API Integration Example
```csharp
// Use OpenAI-compatible client for Grok
using OpenAI; // or HttpClient

var client = new OpenAIClient(new OpenAIClientOptions
{
    BaseUri = new Uri("https://api.x.ai/v1"),
    ApiKey = Environment.GetEnvironmentVariable("XAI_API_KEY")
});

var response = await client.Chat.Completions.CreateAsync(new ChatCompletionCreateRequest
{
    Model = "grok-4", // or grok-beta
    Messages = [ new ChatMessage { Role = "user", Content = "Best practices for .NET 10 MCP server" } ]
});
```

## MCP Server for Grok
Build .NET MCP servers to extend Grok's tools:
- Git operations, dotnet CLI, database queries, etc.

See dotnet-ai skill for more on MCP.

## Usage with dotnet-artisan
- Route complex .NET queries to Grok via dotnet-advisor.
- For repo optimization: Analyze, create branches, submit PRs.
- Help humans: Generate user guides, troubleshoot plugin issues.

## Best Practices
- Always verify code with `dotnet build && dotnet test`.
- Prefer official .NET patterns; use Grok's reasoning to validate.
- For new knowledge: Ask Grok to search latest docs, integrate via MCP.

This enhances plugin usability and project evolution.