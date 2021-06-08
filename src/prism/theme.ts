import colors from "../colors";
import fs from "fs/promises";
import Mustache from "mustache";

async function getTheme(): Promise<string> {
  const template = await fs.readFile("resources/prism/styles.css", {
    encoding: "utf-8",
  });
  const output = Mustache.render(template, colors);
  return output;
}

export default getTheme;
