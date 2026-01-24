// scripts/monitor.js
import readline from "node:readline";
import { stdin, stdout } from "node:process";

const rl = readline.createInterface({
  input: stdin,
  output: stdout,
  terminal: false,
});

// Colors (ANSI Escape Codes)
const CYAN = "\x1b[36m";
const RED = "\x1b[31m";
const RESET = "\x1b[0m";
const BOLD = "\x1b[1m";

rl.on("line", (line) => {
  // Regex to capture: "path(row,col): error TSxxx: Message"
  const match = line.match(/^(.+\(\d+,\d+\)):\s+(error\s+TS\d+[^:]*):\s+(.*)$/);

  if (match) {
    let [_, location, type, message] = match;

    // 1. Format Location: "src/model.ts(10,5)" -> "src/model.ts (10, 5)"
    // Adding a space for readability
    location = location.replace("(", " (").replace(",", ", ");

    // 2. Clean Error Type: "error TS2322" -> "Error"
    const cleanType = "Error";

    // 3. Print the Dashboard format
    console.log(`${BOLD}${CYAN}${location}${RESET}`);
    console.log(`${RED}${cleanType}: ${message}${RESET}`);
    console.log(""); // Empty line
  }
});
