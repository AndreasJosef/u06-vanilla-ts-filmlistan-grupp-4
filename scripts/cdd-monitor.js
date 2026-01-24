// scripts/monitor.js
import readline from "node:readline";
import { stdin, stdout } from "node:process";

const rl = readline.createInterface({
  input: stdin,
  output: stdout,
  terminal: false,
});

// ANSI Colors & Codes
const CYAN = "\x1b[36m";
const RED = "\x1b[31m";
const GREEN = "\x1b[32m";
const RESET = "\x1b[0m";
const BOLD = "\x1b[1m";
const CLEAR_SCREEN = "\x1b[2J\x1b[3J\x1b[H"; // Clear screen + scrollback + move home

// State to track if we found errors in this pass
let errorCount = 0;

rl.on("line", (line) => {
  // 1. DETECTION: New Compilation Cycle
  // tsc outputs "File change detected" or "Starting compilation" when you save.
  if (
    line.includes("File change detected") ||
    line.includes("Starting compilation")
  ) {
    console.log(CLEAR_SCREEN);
    console.log(`${BOLD}TSCDD Compiler${RESET}`);
    console.log(`${CYAN}Watching for changes...${RESET}\n`);
    errorCount = 0; // Reset counter
    return;
  }

  // 2. DETECTION: Compilation Finished (Optional Polish)
  // If 0 errors, give a visual "All Good" signal
  if (line.includes("Found 0 errors")) {
    console.log(CLEAR_SCREEN);
    console.log(`${GREEN}${BOLD}✔ No compiler errors${RESET}`);
    return;
  }

  // 3. PARSING: The Error Matcher
  const match = line.match(/^(.+\(\d+,\d+\)):\s+(error\s+TS\d+[^:]*):\s+(.*)$/);

  if (match) {
    let [_, location, type, message] = match;

    // Formatting
    location = location.replace("(", " (").replace(",", ", ");
    const cleanType = "Error";

    // Output
    console.log(`${BOLD}${CYAN}${location}${RESET}`);
    console.log(`${RED}${cleanType}: ${message}${RESET}`);
    console.log("");

    errorCount++;
  }
});
