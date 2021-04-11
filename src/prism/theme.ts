import colors from "../colors.ts";
import Mustache from "https://cdn.skypack.dev/mustache";

async function getTheme(): Promise<string> {
  const template = await Deno.readTextFile("resources/prism/styles.css");
  const output = (Mustache as any).render(template, colors);
  return output;
}

export default getTheme;
