import fs from "node:fs";
import path from "node:path";

const SOURCE_DIR = "./src";
const OUTPUT_FILE = "./REFERENCE.md";

function getFiles(dir) {
  const dirents = fs.readdirSync(dir, { withFileTypes: true });
  const files = dirents.map((dirent) => {
    const res = path.resolve(dir, dirent.name);
    return dirent.isDirectory() ? getFiles(res) : res;
  });
  return Array.prototype.concat(...files).filter((f) => f.endsWith(".ts"));
}

/**
 * Turns raw JSDoc comments into clean Markdown.
 * Handles @param, @returns, @property, and hides @module/@description.
 */
function formatComment(rawComment) {
  const lines = rawComment
    .replace(/\/\*\*/, "")
    .replace(/\*\//, "")
    .split("\n")
    .map((line) => line.replace(/^\s*\*\s?/, "").trim())
    .filter((line) => line !== "");

  let output = [];
  let listStarted = false;

  lines.forEach((line) => {
    // 1. Skip system tags we don't want in the text
    if (line.startsWith("@module") || line.startsWith("@description")) return;

    // 2. Format TODOs
    if (line.startsWith("TODO:")) {
      output.push(`> 🚧 **Pending:** ${line.replace("TODO:", "").trim()}`);
      return;
    }

    // 3. Handle @param (Functions)
    if (line.startsWith("@param")) {
      if (!listStarted) {
        output.push("\n**Parameters:**");
        listStarted = true;
      }
      const match = line.match(/@param\s+([a-zA-Z0-9_]+)\s*-?\s*(.*)/);
      if (match) output.push(`* \`${match[1]}\`: ${match[2]}`);
      else output.push(`* ${line.replace("@param", "").trim()}`);
    }
    // 4. Handle @property (Interfaces)
    else if (line.startsWith("@property")) {
      if (!listStarted) {
        output.push("\n**Properties:**");
        listStarted = true;
      }
      const match = line.match(/@property\s+([a-zA-Z0-9_]+)\s*-?\s*(.*)/);
      if (match) output.push(`* \`${match[1]}\` - ${match[2]}`);
      else output.push(`* ${line.replace("@property", "").trim()}`);
    }
    // 5. Handle @returns
    else if (line.startsWith("@returns") || line.startsWith("@return")) {
      listStarted = false;
      output.push(`\n**Returns:** ${line.replace(/@returns?/, "").trim()}`);
    }
    // 6. Regular text
    else {
      listStarted = false;
      output.push(line);
    }
  });

  return output.join("\n");
}

function extractDocs(content) {
  const items = [];
  let fileDescription = null;
  let remainingContent = content;

  // STEP A: Consume the Module Header (and remove it from content!)
  // We explicitly look for a comment at the very start of the file.
  const fileHeaderRegex = /^\s*\/\*\*([\s\S]*?)\*\//;
  const headerMatch = content.match(fileHeaderRegex);

  if (headerMatch) {
    const raw = headerMatch[1];
    // Heuristic: It's a module doc if it has @module OR is just text at the top
    if (
      raw.includes("@module") ||
      raw.includes("@description") ||
      !content.match(/^\s*\/\*\*[\s\S]*?\*\/\s*export/)
    ) {
      fileDescription = formatComment(raw);
      // CRITICAL: Remove this header from the text so it doesn't get picked up by the first export
      remainingContent = content.replace(headerMatch[0], "");
    }
  }

  // STEP B: Find Exports in the remaining content
  // Regex Explanation:
  // 1. Capture the comment block (if it exists) immediately preceding the export
  // 2. Capture the keyword (function, interface, etc)
  // 3. Capture the name
  // 4. Capture the signature (everything until `{` or `;`)
  const exportRegex =
    /((?:\/\*\*[\s\S]*?\*\/[\s\n]*)?)export\s+(?:async\s+)?(function|const|type|interface|class|enum)\s+([a-zA-Z0-9_]+)([\s\S]*?)(?:\{|;)/g;

  let match;
  while ((match = exportRegex.exec(remainingContent)) !== null) {
    const commentBlock = match[1];
    const typeKeyword = match[2];
    const name = match[3];
    const rawSignature = match[4]; // Args, generics, return type

    // Clean up signature (remove newlines/double spaces for display)
    const cleanSignature = rawSignature.replace(/\s+/g, " ").trim();
    const fullSignature = `export ${typeKeyword} ${name}${cleanSignature}`;

    if (commentBlock && commentBlock.trim().length > 0) {
      items.push({
        name,
        signature: fullSignature,
        comment: formatComment(commentBlock),
        status: "ok",
      });
    } else {
      items.push({
        name,
        signature: fullSignature,
        comment: "_No documentation provided._",
        status: "missing",
      });
    }
  }

  return { fileDescription, items };
}

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

    if (items.length > 0 || fileDescription) {
      if (items.length > 0) {
        totalItems += items.length;
        documentedItems += items.filter((i) => i.status === "ok").length;
      }
      if (!fileDescription) missingFiles++;

      outputBody += `## 📂 \`${relativePath}\`\n\n`;

      if (fileDescription) {
        outputBody += `> ${fileDescription}\n\n`;
      } else {
        outputBody += `> 🔴 **FILE MISSING DESCRIPTION**\n\n`;
      }

      items.sort((a, b) => (a.status === "missing" ? -1 : 1));

      items.forEach((doc) => {
        const icon = doc.status === "missing" ? "🔴" : "";
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
