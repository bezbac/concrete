import { ThemeGenerator } from "../../types";
import { ensureDir } from "../../util/filesystem";
import fs from "fs/promises";
import path from "path";
import { Colors } from "../../colors";

export const generate: ThemeGenerator = async ({
  colors,
  baseOutputDirectory,
}) => {
  const outputDirectory = path.join(baseOutputDirectory, "zellij");

  await ensureDir(outputDirectory);

  await fs.writeFile(
    path.join(outputDirectory, `./concrete.kdl`),
    createTheme(colors)
  );
};

const createTheme = (colors: Colors) => {
  return `
themes {
  concrete {
    black "${colors.neutral[125]}"
    bg "${colors.neutral[125]}"
    fg "${colors.neutral[380]}"
    white "${colors.neutral[840]}"
    red "${colors.neutral[1000]}"
    green "${colors.syntax.entity}"
    blue "${colors.syntax.support}"
    yellow "${colors.syntax.punctuation}"
    magenta "${colors.syntax.variable}"
    orange "${colors.syntax.keyword}"
    cyan "${colors.syntax.string}"
  }
}
  `.trim();
};
