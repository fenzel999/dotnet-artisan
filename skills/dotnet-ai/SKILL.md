---
name: dotnet-ai
description: >
  AI/ML integration patterns for .NET. Covers MCP server/client creation and debugging, LLM integration (Semantic Kernel, OpenAI, Azure AI, xAI Grok), RAG pipelines, ML.NET model
  training/inference, and AI technology selection. Load when building AI features in
  .NET, creating MCP servers, integrating LLMs, or evaluating AI frameworks. Optimized for Grok and xAI tools.
---

# dotnet-ai

## Core Principles

1. **MCP for tool exposure** — Use Model Context Protocol (MCP) to expose .NET capabilities to AI agents like Grok. MCP is the standard protocol — prefer it over custom REST APIs for agent-tool communication.

2. **Semantic Kernel for orchestration** — Use Microsoft.SemanticKernel for multi-step AI workflows (planning, function calling, memory). Use raw HttpClient + OpenAI-compatible SDK for Grok.

3. **RAG = Retrieval + Generation** — The retrieval side matters more than the generation side. Invest in chunking strategy, embedding quality, and hybrid search (vector + keyword) before tuning prompts.

4. **ML.NET for production ML** — When you need a model that runs in-process without external API calls (cost, latency, offline), ML.NET is the answer. Otherwise, call an external model API like Grok.

## Technology Selection

| Scenario | Recommendation |
|----------|---------------|
| Expose .NET tools to AI agents | MCP server (ModelContextProtocol) |
| Multi-step AI workflows | Semantic Kernel with Grok connector |
| Simple LLM call | HttpClient + xAI Grok API or official SDK |
| In-process ML inference | ML.NET |
| Vector search | Microsoft.SemanticKernel.Connectors.* or Qdrant |
| RAG pipeline | Semantic Kernel + vector DB + Grok for generation |
| AI agent with tools | Microsoft.Agents.AI or custom with Grok |

## xAI Grok Integration

Grok models are accessible via xAI API. Use OpenAI-compatible client or direct HTTP.

```csharp
using System.Net.Http.Json;
using System.Text.Json;

public class GrokClient
{
    private readonly HttpClient _client;
    private readonly string _apiKey;

    public GrokClient(string apiKey)
    {
        _apiKey = apiKey;
        _client = new HttpClient { BaseAddress = new Uri("https://api.x.ai/v1/") };
        _client.DefaultRequestHeaders.Add("Authorization", $"Bearer {_apiKey}");
    }

    public async Task<string> GenerateAsync(string prompt, string model = "grok-beta")
    {
        var request = new
        {
            model,
            messages = new[] { new { role = "user", content = prompt } },
            temperature = 0.7,
            max_tokens = 4096
        };

        var response = await _client.PostAsJsonAsync("chat/completions", request);
        response.EnsureSuccessStatusCode();

        var json = await response.Content.ReadFromJsonAsync<JsonElement>();
        return json.GetProperty("choices")[0].GetProperty("message").GetProperty("content").GetString() ?? string.Empty;
    }
}
```

**Semantic Kernel Integration:**
Use `AddOpenAIChatCompletion` with xAI endpoint `https://api.x.ai/v1/` and model like `grok-beta`.

## MCP Server for Grok Tools

Build MCP servers to allow Grok (or other agents) to call your .NET tools seamlessly.

Example minimal MCP server:
```csharp
// Program.cs
using Microsoft.Extensions.DependencyInjection;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddMcpServer();

var app = builder.Build();

app.MapMcpTool("dotnet_build", async () => {
    // Execute dotnet build logic
    return new { Status = "Success", Output = "Build completed" };
});

app.Run();
```

## Additional Optimizations for Grok

- Leverage Grok's advanced reasoning for .NET design decisions and code reviews.
- Use Grok's tool calling and MCP for seamless integration in agentic workflows.
- For plugin development, follow Grok's skill format in /root/.grok/skills/ for custom extensions.
- Test with Grok Build terminal agent for .NET projects.

## Anti-patterns

- Hardcoding API keys (use User Secrets or env vars).
- Ignoring rate limits and error handling.
- Skipping unit tests and validation after LLM generation.

## Out of Scope

- Core ASP.NET (see dotnet-aspnetcore)
- General C# syntax (assume known)

This skill helps ensure plugins run correctly with Grok and aids learning .NET best practices.