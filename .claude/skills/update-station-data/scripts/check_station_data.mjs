// Validate a new station data file and summarize its diff against the current one.
// Usage: node check_station_data.mjs <new-file> [current-file]
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), "../../../..");
const newPath = process.argv[2];
const curPath = process.argv[3] ?? path.join(root, "constant/station_names_hiragana.js");
if (!newPath) {
  console.error("usage: node check_station_data.mjs <new-file> [current-file]");
  process.exit(2);
}

const PREFIX = "export const STATION_DATA =";
const load = (p) => {
  const src = fs.readFileSync(p, "utf8");
  if (!src.startsWith(PREFIX)) throw new Error(`${p}: must start with "${PREFIX}"`);
  return new Function(`return (${src.slice(PREFIX.length).trim().replace(/;\s*$/, "")});`)();
};
const loadGroups = () => {
  const src = fs.readFileSync(path.join(root, "constant/groups.js"), "utf8");
  return new Function(`return (${src.replace("export const GROUPS =", "").trim().replace(/;\s*$/, "")});`)();
};

const next = load(newPath);
const cur = load(curPath);
const validLetters = new Set(loadGroups().flat());

const errors = [];
for (const [key, entries] of Object.entries(next)) {
  const bad = [...key].filter((c) => !validLetters.has(c));
  if (bad.length) errors.push(`key "${key}": letters not in GROUPS: ${bad.join("")}`);
  if (!Array.isArray(entries) || entries.length === 0) {
    errors.push(`key "${key}": value must be a non-empty array`);
    continue;
  }
  for (const e of entries) {
    if (typeof e?.url !== "string" || typeof e?.title !== "string")
      errors.push(`key "${key}": each entry needs string url and title`);
  }
}

const curKeys = Object.keys(cur);
const nextKeys = Object.keys(next);
const added = nextKeys.filter((k) => !(k in cur));
const removed = curKeys.filter((k) => !(k in next));
const changed = nextKeys.filter((k) => k in cur && JSON.stringify(cur[k]) !== JSON.stringify(next[k]));

console.log(`stations: ${curKeys.length} -> ${nextKeys.length}`);
console.log(`added (${added.length}): ${added.join(" ")}`);
console.log(`removed (${removed.length}): ${removed.join(" ")}`);
console.log(`changed (${changed.length}): ${changed.slice(0, 30).join(" ")}${changed.length > 30 ? " ..." : ""}`);

if (errors.length) {
  console.error(`\nINVALID (${errors.length}):\n` + errors.slice(0, 50).join("\n"));
  process.exit(1);
}
console.log("\nOK: format valid");
