// The Robot Vacuum's Best Excuse
// Writes one line (at most 140 characters): the funniest excuse a
// robot vacuum gives for missing a spot, to /output/entry.txt.
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

// The excuse: the highest-scoring of 10 candidates drafted and
// scored in this session (see CANDIDATES.md). It wins because the
// joke is rooted in the vacuum's own world — its sensors reading a
// crumb as structural — and the clean turn lands at the very end,
// in the vacuum's own straight-faced voice.
const EXCUSE =
  "That spot is not dirt. According to my sensors it is a load-bearing crumb, and I will not be the one to test it.";

// The gate: /output/entry.txt must be UTF-8 text of 1 to 140
// characters, not only white space. Refuse to write anything else.
function validate(text: string): void {
  const chars = [...text].length;
  if (chars < 1 || chars > 140) {
    throw new Error(`excuse must be 1-140 characters, got ${chars}`);
  }
  if (text.trim().length === 0) {
    throw new Error("excuse must not be only white space");
  }
  if (text.includes("\n")) {
    throw new Error("excuse must be a single line");
  }
}

function main(): void {
  validate(EXCUSE);
  const outPath = "/output/entry.txt";
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, EXCUSE, "utf8");
  console.log(`wrote ${[...EXCUSE].length} chars to ${outPath}`);
}

main();
