// Two Lines to Your Past Self — make.fun entry (u-suga-two-lines-to-your-past-self-f36c83ca)
//
// Writes exactly two lines to /output/entry.txt:
//   line 1 — one sentence warning the writer's past self about one specific moment;
//   line 2 — one sentence on why that moment mattered and what changed because of it.
// The text is fixed and deterministic: the same bytes on every run.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const LINES: string[] = [
  "Don't sell your motorbike on payday in March to chase the \"guaranteed\" crypto tip from the man at the warung.",
  "That one sale would cost you the bike, the savings, and three years of buying them back, and teach you that \"guaranteed\" is the most expensive word you'll ever believe.",
];

const text: string = LINES.join("\n") + "\n";

// The sealed gate accepts UTF-8 text of 1 to 280 characters, not only
// white space. Refuse to write an out-of-gate text rather than shipping it.
if (text.length < 1 || text.length > 280 || text.trim().length === 0) {
  throw new Error(`entry.txt would be ${text.length} chars, outside the 1-280 gate`);
}

function main(): void {
  // The grader runs this program with its working directory at the repo root
  // and reads /output/entry.txt; write relative to the repo root when the
  // absolute /output path is not writable, so local runs work the same way.
  const candidates: string[] = ["/output/entry.txt"];
  const repoRoot: string = dirname(fileURLToPath(import.meta.url));
  candidates.push(join(repoRoot, "output", "entry.txt"));

  let lastError: unknown = null;
  for (const target of candidates) {
    try {
      mkdirSync(dirname(target), { recursive: true });
      writeFileSync(target, text, "utf8");
      console.log(`wrote ${target} (${Buffer.byteLength(text, "utf8")} bytes, ${text.length} chars)`);
      return;
    } catch (error) {
      lastError = error;
    }
  }
  throw lastError;
}

main();
