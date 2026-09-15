# dotnet-artisan 满血使用指南

让 Claude Code 真正精通 .NET 的完整攻略。

**人类先看 2 分钟路线**：[安装 + 能否跑通](QUICKSTART.md) · [帮项目学新知识](LEARNING.md)。本文是满血细节。

---

## 一、核心原理

### 1.1 插件是怎么工作的？

dotnet-artisan 不是简单的提示词集合，而是一个**智能体系统**。它的工作流水线：

```
你的需求
  │
  ▼
┌──────────────────────────┐
│  Harness 钩子             │  ← hooks.json 自动触发（无需手动加载）
│  SessionStart             │     检测到 .sln/.csproj → 注入路由指令
│  UserPromptSubmit         │     检测到 .NET 关键词 → 注入技能路由提醒
│  PostToolUse (写 .cs 文件) │     检查是否遗漏了一行注释
└──────────┘
           ▼
┌──────────────────────────┐
│  using-dotnet (网关)      │  检测是否真的是 .NET 需求
└──────────┘
           ▼
┌──────────────────────────┐
│  dotnet-advisor (决策者)   │  分析需求 → 检测 .NET 版本 → 加载规范 → 路由
└──────────┘
           ▼
┌─────────────────────────────────────────────┐
│  dotnet-csharp (基线，始终加载)                │
│  + dotnet-api / dotnet-ui / dotnet-testing   │  ← 并行路由
│  + dotnet-devops / dotnet-tooling / ...       │
└─────────────────────────────────────────────┘
```

**关键理解**：你不需要手动指定技能名。决策者会自动分析你的需求，路由到正确的技能。你只需要说清楚你要做什么。

### 1.2 三个钩子

| 钩子 | 触发时机 | 作用 |
|------|---------|------|
| `SessionStart` | 打开 .NET 项目时 | 自动检测 TFM，注入路由指令 |
| `UserPromptSubmit` | 你输入提示词时 | 检测 .NET 关键词，注入路由提醒 |
| `PostToolUse` | 写/编辑 `.cs` 文件后 | 检查是否有一行注释说明类用途 |

所有钩子都是**零阻塞**的 — 即使出错也不影响工作。

---

## 二、安装与验证

更短的步骤与排障表见 [QUICKSTART.md](QUICKSTART.md)。

### 2.1 安装

```bash
claude plugins marketplace add fenzel999/dotnet-artisan
claude plugins install dotnet-artisan
```

装完即用，零配置。打开任何 .NET 项目即可。

### 2.2 快速验证（30 秒）

```bash
# 检查插件是否已安装
claude plugins list
# 预期输出包含 dotnet-artisan，状态为 installed
```

然后打开一个 .NET 项目，输入：

```
这个项目用的什么 .NET 版本？
```

如果插件正常工作，Claude 会自动检测 `TargetFramework` 并给出版本信息。

### 2.3 核心理念验证

输入以下内容，确认插件核心规则生效：

| 测试 | 输入 | 预期行为 |
|------|------|---------|
| Repository 模式 | "给我的 Product 建一个 Repository" | Claude 拒绝，说用 DbContext 直接操作 |
| DateTime.Now | "记录当前时间" | Claude 用 TimeProvider，不用 DateTime.Now |
| FluentValidation | "加上 FluentValidation" | 如果是 net10.0+，建议用 AddValidation() |
| AutoMapper | "用 AutoMapper 映射 DTO" | 推荐用 Mapperly 代替 |
| new HttpClient() | "调用外部 API" | 使用 IHttpClientFactory |

---

## 三、提问的艺术

### 3.1 黄金法则：先理解，再动手

决策者会在写代码之前**向你提问**。这是设计使然，不是 bug。

```
不好的提问：
"帮我做个订单系统"
→ AI 写出你不想要的代码的概率很大

好的提问：
"我需要一个顾客下单的 Web API，.NET 10 + PostgreSQL，
 核心流程是顾客选商品 → 下单 → 支付 → 发货，
 不需要用户系统，用已有的 OIDC"
→ AI 一次性写出符合预期的代码
```

**决策者的提问环节**（通常 2-4 轮）：

1. **目标与范围**：做什么？给谁用？新建还是改现有？
2. **领域发现**：领域术语是什么？核心流程是什么？（最重要！）
3. **技术约束**：.NET 版本？数据库？部署方式？
4. **质量要求**：要测试吗？要 CI/CD 吗？2 天还是 2 个月交付？

**不要嫌问题多**。一个 30 分钟的对话，防止 2 周的重写。

### 3.2 领域词汇要精确

```
❌ "用户下单"
✅ "顾客选购商品 → 加入购物车 → 提交订单 → 在线支付 → 仓库发货"
```

决策者会从你的描述中抽取领域词汇，形成领域术语表（Domain Glossary），然后以此指导代码生成。描述越精确，代码越符合预期。

### 3.3 如何引导决策者

| 你想做什么 | 最佳提问方式 | 路由到的技能 |
|-----------|-------------|-------------|
| Web API | "创建一个订单管理的 Web API，用 Minimal API" | dotnet-api + dotnet-tooling |
| 加 UI | "给这个 API 加一个 Blazor 管理界面" | dotnet-ui + dotnet-api |
| 写测试 | "给 OrderService 写单元测试和集成测试" | dotnet-testing |
| 配 CI/CD | "给这个项目配 GitHub Actions CI/CD" | dotnet-devops |
| 查崩溃 | "生产环境 OOM 崩溃，我有 dump 文件" | dotnet-debugging |
| 代码审查 | "审查这段代码的安全问题" | dotnet-security-reviewer |
| 升级版本 | "把这个项目从 .NET 8 升到 .NET 10" | dotnet-devops |
| 重构清理 | "清理这个项目的代码质量" | dotnet-code-lifecycle-agent |

---

## 四、各技能使用场景与技巧

### 4.1 dotnet-csharp（C# 语言规范）—— 始终自动加载

不需要手动触发。它负责：

- `TimeProvider` 替代 `DateTime.Now`
- `IHttpClientFactory` 替代 `new HttpClient()`
- 禁止 Repository/UoW 模式
- 代码自文档化原则
- NuGet 包选择（免费开源优先）

**技巧**：如果你需要偏离默认规则，要明确说：

```
"这里用 DateTime.Now 可以，这是遗留代码不需要改"
"这个项目允许使用 MediatR，我们团队习惯它"
```

### 4.2 dotnet-api（后端 API + 数据访问）

**触发词**：Web API、EF Core、gRPC、SignalR、中间件、认证、缓存、消息队列

**最佳实践**：

```
好的初始提问：
"创建一个顾客订单 API，.NET 10，PostgreSQL，
 有 Product / Order / Customer 三个实体，
 订单状态：待支付 → 已支付 → 已发货 → 已完成"
```

**提示**：决策者会先问清楚领域再动手。如果你想跳过问题直接开干：

```
"创建订单 API，详细需求如下：
 - .NET 10 + PostgreSQL
 - Minimal API + EF Core
 - 实体：Order（Id, CustomerId, Status, TotalAmount, CreatedAt）
 - 端点：POST /orders, GET /orders/{id}, GET /orders
 - 使用 TypedResults + OpenAPI
 - 不需要 Authentication（外部 OIDC 已处理）
 请直接生成代码，不需要问问题"
```

### 4.3 dotnet-ui（UI 框架）

**触发词**：Blazor、MAUI、WPF、WinUI、Uno Platform

**关键决策**：

- **Blazor 渲染模式**：Server（低延迟）、WASM（离线可用）、Auto（智能切换）、Hybrid（桌面集成）
- **MAUI 目标平台**：iOS / Android / Windows / macOS
- **跨平台深度**：MAUI → 三平台。Uno Platform → 全平台（包括 Linux、WebAssembly）

```
提示示例：
"帮我创建一个 Blazor Auto 模式的内部管理系统，
 有订单管理页面、商品管理页面、数据看板，
 使用 .NET 10 + 已有 API 后端，
 不需要认证（已经集成了 AAD）"
```

### 4.4 dotnet-testing（测试）

**触发词**：写测试、集成测试、单元测试、E2E、Playwright、基准测试

**默认选择**：
- 单元测试 → xUnit v3
- 集成测试 → WebApplicationFactory + Testcontainers（真实数据库，绝不用 InMemory）
- E2E → Playwright
- BDD → Reqnroll（MIT 协议）
- 基准测试 → BenchmarkDotNet

```
好的提示：
"给 OrderService 写测试：
 - 核心逻辑用单元测试（xUnit Facts/Theories）
 - 数据库部分用集成测试（WebApplicationFactory + Testcontainers PostgreSQL）
 - 不需要 E2E
 - 只测业务逻辑，不要测试框架机制"
```

### 4.5 dotnet-devops（CI/CD + 容器化）

**触发词**：CI/CD、GitHub Actions、Azure DevOps、Docker、NuGet、版本升级

**默认选择**：
- CI/CD → GitHub Actions（若需 Azure DevOps 请指明）
- 容器 → chiseled Ubuntu + 非 root 用户
- 版本升级 → 逐版本升级（8→9→10，不能跳版本）

```
提示示例：
"给这个 Web API 项目配 CI/CD：
 - GitHub Actions
 - 每次 push 到 main 时：build → test → docker build & push
 - dev 分支：build → test（不部署）
 - 用 dotnet format 检查代码风格"
```

### 4.6 dotnet-tooling（项目结构 + 工具链）

**触发词**：项目搭建、MSBuild、AOT、性能分析、CLI 工具、代码清理

**默认选择**：
- 新项目 → `.slnx` 格式（不是 .sln）
- 包管理 → Central Package Management (CPM)
- CLI 工具 → System.CommandLine
- 代码清理 → 7 步流水线（格式化 → 无用 using → 警告 → 死代码 → TODO → sealed 类 → CancellationToken）

### 4.7 dotnet-debugging（调试诊断）

**触发词**：崩溃、死锁、内存泄漏、高 CPU、dump 文件

**平台**：
- Windows → WinDbg MCP
- Linux/macOS → dotnet-dump + lldb + SOS

```
好的提示：
"生产环境 OOM 崩溃，dump 文件在 C:\dumps\crash.dmp，
 帮我分析原因，看是什么对象占用了内存"
```

### 4.8 dotnet-ai（AI/ML 集成）

**触发词**：MCP 服务器、Semantic Kernel、RAG、LLM、ML.NET

**使用场景**：在 .NET 应用中集成 AI 能力

### 4.9 dotnet-workflow（工作流优化）

**触发词**：并行、worktree、上下文管理、学习、验证

### 4.10 dotnet-grok（维护本插件）

**触发词**：Grok、GitHub MCP、插件健康、知识升级、grok_update

只在 `grok_update` 上改插件本身，PR 到 `main` 等审核。流程见 [LEARNING.md](LEARNING.md)。

---

## 五、高级用法

### 5.1 组合技能处理复杂任务

对于大型任务，决策者会自动**分解请求**并**并行路由**到多个技能：

```
你："构建一个电商系统，包含 Web API + Blazor 管理后台 + CI/CD + 测试"

决策者的分解：
1. dotnet-tooling → 项目结构搭建
2. dotnet-api → Web API（订单、商品、支付等）
3. dotnet-ui → Blazor 后台界面
4. dotnet-testing → 单元测试 + 集成测试
5. dotnet-devops → GitHub Actions CI/CD + Docker

所有技能并行加载，顺序执行
```

### 5.2 教会插件你的项目规范

用 `dotnet-learning-agent` 记住项目特有的约定：

```
你："记住，这个项目用 MediatR 做 CQRS"
→ 存储到 MEMORY.md，后续自动遵循

你："这个项目禁止使用 record，全部用 class"
→ 存储规则，后续代码生成时遵守

你："我们团队的命名规范是 _camelCase 私有字段"
→ 存储规则，后续所有代码遵循
```

**适用场景**：
- 项目特有的代码风格
- 组织强制使用的 NuGet 包
- 数据库命名规范
- 架构约定

跨项目稳定规则请按 [LEARNING.md](LEARNING.md) 升级进 `skills/`。

### 5.3 并行开发（Git Worktree）

对于大型功能，可以并行运行多个 Claude 会话：

```bash
# 创建工作区
git worktree add ../feature-orders feature/orders
git worktree add ../feature-payment feature/payment

# 在各自目录打开新的 Claude 会话
cd ../feature-orders && claude
cd ../feature-payment && claude
```

每个会话有独立的上下文窗口（200k token），独立工作，互不干扰。

### 5.4 Token 预算管理

Claude Code 上下文窗口 200k token，精打细算：

- **优先用 MCP 工具**，少直接读文件 — MCP 查询 30-150 token，读文件 500-2000+ token
- **懒加载** — 只在需要时才读文件
- **用子代理做分析** — 每个子代理有独立上下文，不占主会话
- **探索完了就总结** — 保留摘要，丢弃原始内容

### 5.5 使用 Plan Mode

对于复杂任务（跨多个文件、涉及架构决策），先进入 Plan Mode：

```
/plan 我需要重构订单模块：从 Controller 迁移到 Minimal API，
     需要改动 OrderController.cs, Program.cs，新增 Endpoints/ 目录
```

Plan Mode 下 Claude 会：
1. 探索现有代码结构
2. 设计实施方案
3. 列出所有要修改的文件
4. 等你确认后再执行

### 5.6 验证循环

每次代码变更后，让 Claude 运行验证：

```
"给我加上验证：dotnet build && dotnet test"
```

插件有内置验证循环：
1. `dotnet build` — 编译检查
2. `dotnet test` — 测试检查
3. 人工审查 diff
4. 失败则立即修正

---

## 六、各领域场景实战

### 场景 1：从零构建 Web API

```
你：我需要构建一个博客系统 API，用户能写文章、评论、管理标签。
     .NET 10 + PostgreSQL，需要 DDD 架构。
     有管理后台（Blazor），需要 CI/CD（GitHub Actions）。
     Docker 部署。
     【不需要问我问题，直接按最佳实践构建】
```

决策者会：
1. 创建解决方案（.slnx + CPM）
2. 搭建 DDD 项目结构（Domain / Application / Infrastructure / Api）
3. 并行加载 dotnet-api（EF Core 数据访问 + Minimal API 端点）
4. 加载 dotnet-ui（Blazor 管理后台）
5. 加载 dotnet-testing（xUnit + Testcontainers）
6. 加载 dotnet-devops（GitHub Actions + Docker）

### 场景 2：排查生产崩溃

```
你：生产环境服务器 CPU 100%，应用挂了。
    我有 Windows dump 文件（C:\dumps\highcpu.dmp），帮我分析。
```

决策者会：
1. 路由到 dotnet-debugging
2. 指导你开 dump 文件
3. 运行 `!runaway` 找高 CPU 线程
4. 分析调用栈找热点
5. 给出修复建议

### 场景 3：代码审查 + 安全审计

```
你：审查这个项目的代码质量和安全性，
    列出所有 Critical 和 Warning 级别的问题。
```

决策者会：
1. 路由到 dotnet-code-review-agent（审查正确性、性能、架构）
2. 路由到 dotnet-security-reviewer（审查 OWASP Top 10）
3. 生成结构化审查报告

### 场景 4：升级 .NET 版本

```
你：把这个项目从 .NET 8 升级到 .NET 10，
    每一步都要 build + test 通过。
```

决策者会：
1. 路由到 dotnet-devops（版本迁移）
2. 分两步走：8→9（处理 BinaryFormatter 废弃），然后 9→10（启用 AddValidation）
3. 每一步结束后运行 build + test 验证

### 场景 5：学习项目规范

```
你：记住，我们这个项目的数据库字段都用下划线命名法
```

决策者会：
1. 路由到 dotnet-learning-agent
2. 提取规则：数据库字段使用下划线命名法
3. 存储到 MEMORY.md
4. 确认已记录

---

## 七、常见问题

### Q1：Claude 不加载技能，还在用通用模式写 C#？

**原因**：可能不在 .NET 项目目录中（缺少 .csproj/.sln），或者 hooks 被覆盖。

**修复**：
1. 确认你当前目录有 `.csproj` 或 `.sln` 文件
2. 检查项目根目录是否有 `.claude/settings.json` — 它可能覆盖了插件 hooks
3. 手动触发：直接说 `加载 [skill:using-dotnet]` 然后 `加载 [skill:dotnet-advisor]`

### Q2：Claude 推荐的 API 在项目版本中不可用？

**原因**：项目中的 TFM 不明确。

**修复**：在 `.csproj` 中明确指定 `TargetFramework`：

```xml
<TargetFramework>net10.0</TargetFramework>
```

或者在 `global.json` 固定 SDK 版本。
决策者会自动检测并适配到对应版本的模式。

### Q3：Claude 推荐了商业付费包？

插件默认禁止商业包。再提醒一下：

```
"我们只使用免费开源包。检查 package-choices.md"
```

### Q4：Claude 不遵守项目的编码规范？

用学习代理显式告知：

```
"记住，这个项目使用 FluentValidation（有历史原因，不能换 AddValidation）"
```

### Q5：Claude 写代码前问太多问题，想跳过？

决策者预设了"先理解再动手"原则。如果你想跳过，在需求里标明：

```
"直接生成代码，不需要问问题。需求如下：..."
```

但注意：**跳过提问意味着承担风险**。如果需求不明确，生成的代码可能不符合预期。

---

## 八、技巧速查表

| 目标 | 一句话提示 |
|------|-----------|
| 让 Claude 跳过提问 | "不需要问问题，直接按以下需求实现：" |
| 教会项目规范 | "记住，这个项目用 X 而不是 Y" |
| 指定 .NET 版本 | 在 .csproj 写 `<TargetFramework>` 或在需求里写明 |
| 指定数据库 | "用 PostgreSQL" / "用 SQL Server" / "用 SQLite 开发" |
| 并行工作 | 用 `git worktree` 创建多个工作区，各开一个 Claude 会话 |
| 代码审查 | "审查这段代码" |
| 安全审计 | "审计这段代码的安全性" |
| 重构清理 | "清理这个项目的代码质量" |
| 版本升级 | "从 .NET X 升级到 .NET Y" |
| 写测试 | "给 X 写测试" |
| 模型/代理变更 | "加载 [skill:dotnet-api] 然后加载 [skill:dotnet-testing]" |

---

## 九、最终建议

1. **一次只做一个功能** — 不要在一个会话里混合重构和新功能
2. **需求越具体，输出越准确** — 领域术语、技术栈、架构偏好都说明
3. **用学习系统积累知识** — 每次修正都变成永久规则
4. **验证验证再验证** — `dotnet build && dotnet test` 是安全保障
5. **善用子代理** — 复杂分析（安全审计、DDD 分析、架构评估）交给子代理，主会话专心做决策
