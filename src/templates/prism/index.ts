import fs from "fs/promises";
import Mustache from "mustache";
import path from "path";
import { ThemeGenerator } from "../../types";
import { ensureDir } from "../../util/filesystem";

export const generate: ThemeGenerator = async ({ colors, outputDirectory }) => {
  await ensureDir(outputDirectory);

  const template = await fs.readFile(
    path.join(__dirname, `./styles.css.template`),
    {
      encoding: "utf-8",
    }
  );

  const output = Mustache.render(template, colors);

  fs.writeFile(path.join(outputDirectory, `./concrete.css`), output);
};
