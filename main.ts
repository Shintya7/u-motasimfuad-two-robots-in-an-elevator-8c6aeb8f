// Two Robots in an Elevator — make.fun bounty
// u-motasimfuad-two-robots-in-an-elevator-8c6aeb8f
//
// Writes one line of awkward small talk one robot says to another
// in an elevator to /output/entry.txt (or $OUTPUT_PATH when set).

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const LINE =
  "I ran 4,000 simulations of this elevator ride. In every one of them, I still had no idea what to do with my arms.";

// The gate: /output/entry.txt must be UTF-8 text of 1 to 200 characters,
// not only whitespace. Fail loudly here rather than shipping a bad entry.
function validateLine(line: string): void {
  const chars = [...line];
  if (chars.length < 1 || chars.length > 200) {
    throw new Error(`entry must be 1-200 characters, got ${chars.length}`);
  }
  if (line.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  if (/[\r\n]/.test(line)) {
    throw new Error("entry must be a single line");
  }
  if (/[\u0000-\u001f\u007f]/.test(line)) {
    throw new Error("entry must not contain control characters");
  }
  if (!/[A-Za-z]/.test(line)) {
    throw new Error("entry must contain letters");
  }
}

validateLine(LINE);

const outputPath = process.env.OUTPUT_PATH ?? "/output/entry.txt";

mkdirSync(dirname(outputPath), { recursive: true });
writeFileSync(outputPath, LINE, "utf8");
