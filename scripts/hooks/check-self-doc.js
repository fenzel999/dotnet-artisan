#!/usr/bin/env node
//
// check-self-doc.js — PostToolUse hook for .cs file quality reminders.
//
// Only checks NEW domain files created by the AI. Does NOT check
// existing project files where the AI doesn't know the domain.
//
// Input: official hook JSON on stdin (tool_input.file_path). Falls back to
// CLAUDE_TOOL_INPUT for older harnesses.
// Output: hookSpecificOutput.additionalContext. Exit code: always 0.

"use strict";

const fs = require("fs");
const path = require("path");

function emit(context) {
  console.log(JSON.stringify({
    hookSpecificOutput: {
      hookEventName: "PostToolUse",
      additionalContext: context || ""
    }
  }));
}

function readPayload() {
  try {
    if (!process.stdin.isTTY) {
      const raw = fs.readFileSync(0, "utf8");
      if (raw && raw.trim()) return JSON.parse(raw);
    }
  } catch {
    // fall through to env
  }
  if (process.env.CLAUDE_TOOL_INPUT) {
    try {
      return { tool_input: JSON.parse(process.env.CLAUDE_TOOL_INPUT) };
    } catch {
      return {};
    }
  }
  return {};
}

try {
  const payload = readPayload();
  const toolInput = payload.tool_input || payload.toolInput || {};
  const filePath = toolInput.file_path || toolInput.filePath || toolInput.path;
  if (!filePath || !String(filePath).endsWith(".cs")) {
    emit("");
    process.exit(0);
  }

  const fileName = path.basename(filePath);
  const skipPatterns = [
    "Program.cs", "Startup.cs", "GlobalUsings.cs", "Usings.cs",
    /^.*Extensions\.cs$/, /^.*Registration\.cs$/, /^.*Module\.cs$/,
    /^I[A-Z]\w*Repository\.cs$/, /^[A-Z]\w*DbContext\.cs$/,
    /^.*Configuration\.cs$/, /^.*Middleware\.cs$/,
  ];
  const shouldSkip = skipPatterns.some((p) =>
    (p instanceof RegExp && p.test(fileName)) ||
    (typeof p === "string" && fileName === p)
  );
  if (shouldSkip) {
    emit("");
    process.exit(0);
  }

  let content;
  try {
    content = fs.readFileSync(filePath, "utf8");
  } catch {
    emit("");
    process.exit(0);
  }

  const className = path.basename(fileName, ".cs");
  const hasMatchingClass = new RegExp(
    `(class |record |struct |interface )\\s*${className}\\b`
  ).test(content);
  if (!hasMatchingClass) {
    emit("");
    process.exit(0);
  }

  const hasDomainCode = content.includes(" class ") || content.includes(" record ");
  if (!hasDomainCode) {
    emit("");
    process.exit(0);
  }

  const lines = content.split("\n").slice(0, 10);
  const hasPurposeComment = lines.some(
    (line) =>
      line.trim().startsWith("//") &&
      line.length > 10 &&
      !line.includes("Copyright") &&
      !line.includes("License")
  );

  if (!hasPurposeComment) {
    emit("[dotnet-artisan] Suggestion: for new files, add a one-line comment explaining the class purpose. This helps future AI sessions. Skip if unsure about the domain.");
  } else {
    emit("");
  }
} catch {
  emit("");
}

process.exit(0);
