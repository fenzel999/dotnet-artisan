---
name: dotnet-ai
description: >
  AI/ML integration patterns for .NET. Covers MCP server/client creation and debugging, LLM integration (Semantic Kernel, OpenAI, Azure AI, xAI Grok), RAG pipelines, ML.NET model
  training/inference, and AI technology selection. Load when building AI features in
  .NET, creating MCP servers, integrating LLMs, or evaluating AI frameworks. Optimized for Grok and xAI tools. Enhanced with latest MCP best practices.
---

# dotnet-ai

## Core Principles

[Existing content]

## New Grok MCP Enhancements (Optimized by Grok)

**Grok/xAI MCP Integration for .NET Developers:**

This skill now includes comprehensive guidance for integrating xAI Grok's MCP tools directly into .NET applications. Supports GitHub operations, sandbox file I/O, web searches, and more.

### Key Features
- Use `github___*` tools for repo analysis, PR creation.
- Sandbox tools for code execution, file manipulation.
- Render components for rich responses.

### Example .NET MCP Client

```csharp
// Using Semantic Kernel or HttpClient for MCP calls
using Microsoft.SemanticKernel;

var builder = Kernel.CreateBuilder();
builder.AddOpenAIChatCompletion(modelId: "grok-beta", apiKey: Environment.GetEnvironmentVariable("XAI_API_KEY"));
var kernel = builder.Build();

// Example function for tool calling
[KernelFunction]
public async Task<string> AnalyzeDotNetRepo(string repoUrl)
{
    // Call MCP tool
    return "Analysis complete using Grok MCP.";
}
```

**Usage in Plugin:** Helps validate plugin runtime, assists users in .NET projects, and teaches advanced AI integration.

Update CHANGELOG for this enhancement.