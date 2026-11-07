---
name: dotnet-ai
license: MIT
user-invocable: false
description: >
  AI/ML integration patterns for .NET. Covers MCP server/client creation and debugging,
  LLM integration (Semantic Kernel, OpenAI, Azure AI, xAI Grok), RAG pipelines, ML.NET model
  training/inference, and AI technology selection. Load when building AI features in
  .NET, creating MCP servers, integrating LLMs (including Grok), or evaluating AI frameworks.
  Optimized for Grok and xAI tools, including full MCP tool usage for GitHub, sandbox, searches.
  Synthesized from dotnet/skills dotnet-ai plugin + dotnet-artisan Semantic Kernel references.
---

# dotnet-ai

## Core Principles

1. **MCP for tool exposure** — Use Model Context Protocol (MCP) to expose .NET capabilities to AI agents (Claude Code, Grok, etc.). MCP is the standard protocol — prefer it over custom REST APIs for agent-tool communication.

2. **Semantic Kernel for orchestration** — Use Microsoft.SemanticKernel for multi-step AI workflows (planning, function calling, memory). Use raw HttpClient + OpenAI SDK (or xAI SDK) for simple single-call scenarios.

3. **RAG = Retrieval + Generation** — The retrieval side matters more than the generation side. Invest in chunking strategy, embedding quality, and hybrid search (vector + keyword) before tuning prompts.

4. **ML.NET for production ML** — When you need a model that runs in-process without external API calls (cost, latency, offline), ML.NET is the answer. Otherwise, call an external model API (OpenAI, Azure AI, xAI Grok).

5. **Grok / xAI first-class support** — Prefer official xAI endpoints and Grok models when available. Leverage Grok's native tool-calling (MCP) for GitHub operations, sandbox execution, and web search inside .NET agents.

## Technology Selection

| Scenario | Recommendation |
|----------|---------------|
| Expose .NET tools to AI agents | MCP server (ModelContextProtocol) |
| Multi-step AI workflows | Semantic Kernel |
| Simple LLM call (OpenAI-compatible) | HttpClient + OpenAI SDK or xAI SDK |
| Grok / xAI specific | xAI API + Grok models + native MCP tools |
| In-process ML inference | ML.NET |
| Vector search | Microsoft.SemanticKernel.Connectors.* or Qdrant |
| RAG pipeline | Semantic Kernel + vector DB |
| AI agent with tools | Microsoft.Agents.AI or custom MCP client |

## MCP (Model Context Protocol)

### Creating an MCP Server

```csharp
// Minimal MCP server exposing a .NET tool
#:sdk Microsoft.NET.Sdk.Web
#:package ModelContextProtocol

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddMcpServer();

var app = builder.Build();

app.MapMcpTool("get_weather", async (string city) =>
{
    // Your .NET logic here
    return new { City = city, Temp = 22.5, Condition = "Sunny" };
});

app.Run();
```

### MCP Debugging

- Test with `mcp-inspector` CLI tool
- Use `McpServerOptions.Validate()` for startup validation
- Log all tool invocations at Debug level for troubleshooting

### Grok MCP Integration Notes

Grok (xAI) natively supports MCP tool calling. When running under Grok:

- Prefer calling connected GitHub MCP tools for repository analysis, branch creation, PR submission.
- Use sandbox bash for `dotnet build`, `dotnet test`, `dotnet run` validation.
- Combine with `dotnet-learning-agent` to capture new patterns discovered via tools into MEMORY.md or skills/references.

Example high-level flow for a Grok agent:

1. Detect .NET intent → load this skill + dotnet-advisor.
2. Use GitHub MCP to inspect current repo structure.
3. Use sandbox to run `dotnet --list-sdks` / `dotnet build`.
4. Route to specialized skills (api / testing / devops).
5. After corrections, invoke learning agent to persist knowledge.

## LLM Integration (including xAI Grok)

### Simple Grok / xAI call (OpenAI-compatible)

```csharp
// Using OpenAI SDK against xAI endpoint (Grok is OpenAI-compatible)
var client = new OpenAIClient(
    new ApiKeyCredential(Environment.GetEnvironmentVariable("XAI_API_KEY")),
    new OpenAIClientOptions { Endpoint = new Uri("https://api.x.ai/v1") });

var completion = await client.GetChatClient("grok-3").CompleteChatAsync(
    [new UserChatMessage("Explain TimeProvider vs DateTime.Now in .NET")]);
```

### Semantic Kernel with Grok

```csharp
var kernel = Kernel.CreateBuilder()
    .AddOpenAIChatCompletion(
        modelId: "grok-3",
        apiKey: Environment.GetEnvironmentVariable("XAI_API_KEY"),
        endpoint: new Uri("https://api.x.ai/v1"))
    .Build();

var result = await kernel.InvokePromptAsync("Design a Minimal API endpoint for orders");
```

## RAG Pipeline Pattern

1. **Document ingestion** — Chunk documents, generate embeddings (Azure OpenAI / OpenAI / xAI)
2. **Storage** — Store chunks + vectors in Qdrant, Azure AI Search, or pgvector
3. **Retrieval** — Hybrid search: vector similarity + keyword (BM25)
4. **Generation** — Send retrieved context + user query to LLM (Grok preferred for agentic workflows)

```csharp
// Semantic Kernel RAG example
var kernel = Kernel.CreateBuilder()
    .AddAzureOpenAIChatCompletion(deploymentName, endpoint, apiKey)
    .AddQdrantVectorStore(host)
    .Build();

// Query → search → generate
var response = await kernel.InvokePromptAsync(
    "Answer based on: {{$context}} \n Question: {{$question}}",
    new() { ["context"] = searchResults, ["question"] = userQuery });
```

## Anti-patterns

- **MCP for simple CRUD** — If you're not exposing tools to AI agents, use minimal APIs, not MCP
- **RAG without hybrid search** — Vector-only retrieval misses exact keyword matches
- **Embedding entire documents** — Chunk first; large embeddings lose semantic precision
- **Ignoring token costs** — Cache embeddings, use streaming responses, set max_tokens
- **Hardcoding API keys** — Always use environment variables or secret managers (see secrets-management in dotnet-api)

## Out of Scope

- General ASP.NET Core API development (see [dotnet-api](../dotnet-api/SKILL.md))
- Frontend UI frameworks or rendering patterns (see [dotnet-ui](../dotnet-ui/SKILL.md))
- CI/CD pipeline configuration (see [dotnet-devops](../dotnet-devops/SKILL.md))

## Learning Path (for the project itself)

When this skill is used under Grok:

1. New .NET AI patterns discovered via tools → capture with `dotnet-learning-agent`.
2. Update this SKILL.md or add references under `skills/dotnet-ai/references/` if patterns stabilize.
3. Prefer additive, self-documenting changes that keep the plugin running for all users.
