---
name: dotnet-ai
license: MIT
user-invocable: false
description: >
  AI/ML integration patterns for .NET. Covers MCP server/client creation and debugging,
  LLM integration (Semantic Kernel, OpenAI, Azure AI, xAI Grok), RAG pipelines, ML.NET model
  training/inference, and AI technology selection. Load when building AI features in
  .NET, creating MCP servers, integrating LLMs, or evaluating AI frameworks.
  Optimized for Grok and xAI tools.
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
Use `AddOpenAIChatCompletion` with xAI endpoint and model.

## MCP Server for Grok Tools

Build MCP servers to allow Grok (or other agents) to call your .NET tools seamlessly.

[Full example as above...]

## Additional Optimizations for Grok

- Use Grok's reasoning capabilities for complex .NET architecture decisions.
- Integrate tool calling with MCP for dynamic .NET code execution in agent loops.
- For RAG, use Grok for high-quality natural language synthesis from retrieved .NET docs.

## Anti-patterns

- Hardcoding API keys in source (use secrets manager or env vars).
- Not handling rate limits or errors in LLM calls.
- Over-relying on LLM for code generation without validation.

## Out of Scope

- General ASP.NET Core API development (see dotnet-api)
- etc.

Full content merged and optimized for Grok usage and plugin performance.