// scripts/docs.js
import fs from "node:fs";
import path from "node:path";

// Config
const SOURCE_DIR = "./src";
const OUTPUT_FILE = "./REFERENCE.md";

// 1. Recursive File Walker
function getFiles(dir) {
  const dirents = fs.readdirSync(dir, { withFileTypes: true });
  const files = dirents.map((dirent) => {
    const res = path.resolve(dir, dirent.name);
    return dirent.isDirectory() ? getFiles(res) : res;
  });
  return Array.prototype.concat(...files).filter((f) => f.endsWith(".ts"));
}

// 2. The Formatter (The New Logic)
function formatComment(rawComment) {
  // Clean stars and whitespace
  const lines = rawComment
    .replace(/\/\*\*/, "")
    .replace(/\*\//, "")
    .split("\n")
    .map((line) => line.replace(/^\s*\*\s?/, "").trim())
    .filter((line) => line !== "");

  let output = [];
  let paramStarted = false;

  lines.forEach((line) => {
    // Handle @param
    if (line.startsWith("@param")) {
      if (!paramStarted) {
        output.push("\n**Parameters:**");
        paramStarted = true;
      }
      // "@param name - desc" -> "* `name`: desc"
      const match = line.match(/@param\s+([a-zA-Z0-9_]+)\s*-?\s*(.*)/);
      if (match) {
        output.push(`* \`${match[1]}\` - ${match[2]}`);
      } else {
        output.push(`* ${line.replace("@param", "").trim()}`);
      }
    }
    // Handle @returns
    else if (line.startsWith("@returns") || line.startsWith("@return")) {
      output.push(`\n**Returns:** ${line.replace(/@returns?/, "").trim()}`);
    }
    // Handle @see or other tags
    else if (line.startsWith("@")) {
      output.push(`\n*${line}*`);
    }
    // Regular Description
    else {
      output.push(line);
    }
  });

  return output.join("\n"); // Markdown handles newlines better this way
}

// 3. The Parser
function extractDocs(content) {
  const items = [];
  let fileDescription = null;

  // STEP A: Macro Header
  const fileHeaderRegex = /^\s*\/\*\*([\s\S]*?)\*\//;
  const headerMatch = content.match(fileHeaderRegex);

  if (headerMatch) {
    const raw = headerMatch[1];
    if (
      raw.includes("@module") ||
      raw.includes("@description") ||
      !content.match(/^\s*\/\*\*[\s\S]*?\*\/\s*export/)
    ) {
      fileDescription = formatComment(raw);
    }
  }

  // STEP B: Exports
  const exportRegex =
    /((?:\/\*\*[\s\S]*?\*\/[\s\n]*)?)export\s+(?:async\s+)?(function|const|type|interface|class|enum)\s+([a-zA-Z0-9_]+)/g;

  let match;
  while ((match = exportRegex.exec(content)) !== null) {
    const commentBlock = match[1];
    const typeKeyword = match[2];
    const name = match[3];

    if (commentBlock && commentBlock.trim().length > 0) {
      items.push({
        name,
        signature: `export ${typeKeyword} ${name}`,
        comment: formatComment(commentBlock),
        status: "ok",
      });
    } else {
      items.push({
        name,
        signature: `export ${typeKeyword} ${name}`,
        comment: "_No documentation provided._",
        status: "missing",
      });
    }
  }

  return { fileDescription, items };
}

// 4. The Builder
function generateMarkdown() {
  const files = getFiles(SOURCE_DIR);

  let totalItems = 0;
  let documentedItems = 0;
  let missingFiles = 0;
  let outputBody = "";

  files.forEach((filePath) => {
    const content = fs.readFileSync(filePath, "utf-8");
    const { fileDescription, items } = extractDocs(content);
    const relativePath = path.relative(process.cwd(), filePath);

    if (relativePath.endsWith("index.ts")) return;

    if (items.length > 0) {
      totalItems += items.length;
      documentedItems += items.filter((i) => i.status === "ok").length;
      if (!fileDescription) missingFiles++;

      outputBody += `## 📂 \`${relativePath}\`\n\n`;

      if (fileDescription) {
        outputBody += `> ${fileDescription}\n\n`;
      } else {
        outputBody += `> 🔴 **FILE MISSING DESCRIPTION**\n\n`;
      }

      items.sort((a, b) => (a.status === "missing" ? -1 : 1));

      items.forEach((doc) => {
        const icon = doc.status === "missing" ? "🔴" : "🟢";
        outputBody += `### ${icon} **${doc.name}**\n`;
        outputBody += `${doc.comment}\n\n`;
        outputBody += "```typescript\n" + doc.signature + "\n```\n\n";
      });

      outputBody += "---\n\n";
    }
  });

  const coverage =
    totalItems === 0 ? 100 : Math.round((documentedItems / totalItems) * 100);
  const color = coverage > 80 ? "green" : coverage > 50 ? "orange" : "red";

  let header = `# Reference Docs\n\n`;
  header += `![Coverage](https://img.shields.io/badge/Coverage-${coverage}%25-${color})\n`;
  header += `\n**Total Exports:** ${totalItems} | **Documented:** ${documentedItems} | **Undocumented:** ${totalItems - documentedItems}\n`;
  if (missingFiles > 0)
    header += `\n⚠️ **${missingFiles} files are missing a Macro Description.**\n`;
  header += `\n---\n\n`;

  fs.writeFileSync(OUTPUT_FILE, header + outputBody);
  console.log(`\x1b[32m✔ Docs updated: ${coverage}% coverage.\x1b[0m`);
}

generateMarkdown();
