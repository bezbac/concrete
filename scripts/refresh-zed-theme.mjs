import fs from "node:fs/promises";
import { compile } from "json-schema-to-typescript";

const SCHEMA_URL = "https://zed.dev/schema/themes/v0.2.0.json";
const OUTPUT = "src/templates/zed/theme.d.ts";

const response = await fetch(SCHEMA_URL);
if (!response.ok) {
  throw new Error(
    `Failed to fetch Zed theme schema: ${response.status} ${response.statusText}`
  );
}

const schema = await response.json();

const types = await compile(schema, "ThemeFamilyContent", {
  additionalProperties: false,
});
await fs.writeFile(OUTPUT, types);
console.log(`Wrote ${OUTPUT}`);