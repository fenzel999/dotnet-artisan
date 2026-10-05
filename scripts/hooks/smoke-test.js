#!/usr/bin/env node
"use strict";

const { spawnSync } = require("child_process");
const fs = require("fs");
const os = require("os");
const path = require("path");

const root = path.resolve(__dirname, "../..");
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "dotnet-artisan-smoke-"));

function run(script, payload) {
  const result = spawnSync(process.execPath, [path.join(root, "scripts/hooks", script)], {
    input: JSON.stringify(payload),
    encoding: "utf8",
  });
  if (result.status !== 0) {
    console.error(script, "exit", result.status, result.stderr);
    process.exit(1);
  }
  let parsed;
  try {
    parsed = JSON.parse(result.stdout);
  } catch (err) {
    console.error(script, "did not emit JSON", result.stdout);
    process.exit(1);
  }
  return parsed;
}

function contextOf(parsed) {
  return (parsed.hookSpecificOutput && parsed.hookSpecificOutput.additionalContext) || "";
}

fs.writeFileSync(
  path.join(tmp, "Demo.csproj"),
  '<Project Sdk="Microsoft.NET.Sdk"><PropertyGroup><TargetFramework>net10.0</TargetFramework></PropertyGroup></Project>\n'
);

const session = run("session-start-context.js", { cwd: tmp, source: "startup" });
if (!contextOf(session).includes("net10.0") || !contextOf(session).includes("current LTS")) {
  console.error("SessionStart did not report target framework and LTS note", session);
  process.exit(1);
}

const fsprojDir = fs.mkdtempSync(path.join(os.tmpdir(), "dotnet-artisan-fs-"));
fs.writeFileSync(
  path.join(fsprojDir, "App.fsproj"),
  '<Project Sdk="Microsoft.NET.Sdk"><PropertyGroup><TargetFramework>net9.0</TargetFramework></PropertyGroup></Project>\n'
);
const fsSession = run("session-start-context.js", { cwd: fsprojDir, source: "startup" });
if (!contextOf(fsSession).includes("net9.0") || !contextOf(fsSession).includes("2026-11-10")) {
  console.error("SessionStart did not treat .fsproj as .NET or missed support date", fsSession);
  process.exit(1);
}

const vbDir = fs.mkdtempSync(path.join(os.tmpdir(), "dotnet-artisan-vb-"));
fs.writeFileSync(
  path.join(vbDir, "App.vbproj"),
  '<Project Sdk="Microsoft.NET.Sdk"><PropertyGroup><TargetFramework>net8.0</TargetFramework></PropertyGroup></Project>\n'
);
const vbSession = run("session-start-context.js", { cwd: vbDir, source: "startup" });
if (!contextOf(vbSession).includes("net8.0")) {
  console.error("SessionStart did not treat .vbproj as .NET", vbSession);
  process.exit(1);
}

const prompt = run("user-prompt-dotnet-reminder.js", {
  cwd: tmp,
  prompt: "add an order endpoint",
});
if (!contextOf(prompt).includes("using-dotnet")) {
  console.error("UserPromptSubmit did not route", prompt);
  process.exit(1);
}

const quiet = run("user-prompt-dotnet-reminder.js", {
  cwd: tmp,
  prompt: "please invoke using-dotnet first",
});
if (contextOf(quiet).includes("Mandatory first action")) {
  console.error("UserPromptSubmit repeated routing after skill was requested");
  process.exit(1);
}

const orderPath = path.join(tmp, "OrderService.cs");
fs.writeFileSync(orderPath, "namespace Shop;\npublic class OrderService { }\n");
const doc = run("check-self-doc.js", { tool_name: "Write", tool_input: { file_path: orderPath } });
if (!contextOf(doc).includes("one-line comment")) {
  console.error("PostToolUse did not remind about a purpose comment", doc);
  process.exit(1);
}

const programPath = path.join(tmp, "Program.cs");
fs.writeFileSync(programPath, "public class Program { }\n");
const skipped = run("check-self-doc.js", { tool_name: "Write", tool_input: { file_path: programPath } });
if (contextOf(skipped).includes("one-line comment")) {
  console.error("PostToolUse should skip Program.cs", skipped);
  process.exit(1);
}

console.log("OK hook smoke test");
