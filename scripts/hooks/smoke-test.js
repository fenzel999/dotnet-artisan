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

fs.writeFileSync(
  path.join(tmp, "Demo.csproj"),
  '<Project Sdk="Microsoft.NET.Sdk"><PropertyGroup><TargetFramework>net10.0</TargetFramework></PropertyGroup></Project>\n'
);

const session = run("session-start-context.js", { cwd: tmp, source: "startup" });
const sessionText = session.hookSpecificOutput && session.hookSpecificOutput.additionalContext;
if (!sessionText || !sessionText.includes("net10.0")) {
  console.error("SessionStart did not report target framework", session);
  process.exit(1);
}

const prompt = run("user-prompt-dotnet-reminder.js", {
  cwd: tmp,
  prompt: "add an order endpoint",
});
const promptText = prompt.hookSpecificOutput && prompt.hookSpecificOutput.additionalContext;
if (!promptText || !promptText.includes("using-dotnet")) {
  console.error("UserPromptSubmit did not route", prompt);
  process.exit(1);
}

const quiet = run("user-prompt-dotnet-reminder.js", {
  cwd: tmp,
  prompt: "please invoke using-dotnet first",
});
const quietText = (quiet.hookSpecificOutput && quiet.hookSpecificOutput.additionalContext) || "";
if (quietText.includes("Mandatory first action")) {
  console.error("UserPromptSubmit repeated routing after skill was requested");
  process.exit(1);
}

console.log("OK hook smoke test");
