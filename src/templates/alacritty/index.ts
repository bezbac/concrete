import { ThemeGenerator } from "../../types";
import { ensureDir } from "../../util/filesystem";
import fs from "fs/promises";
import path from "path";
import { Colors } from "../../colors";
import Color from "color";
import YAML from "yaml";

export const generate: ThemeGenerator = async ({
  colors,
  baseOutputDirectory,
}) => {
  const outputDirectory = path.join(baseOutputDirectory, "alacritty");

  await ensureDir(outputDirectory);

  await fs.writeFile(
    path.join(outputDirectory, `./concrete.yaml`),
    createTheme(colors)
  );
};

const createTheme = (colors: Colors) => {
  const c = (color: string) => Color(color).hex().replace("#", "0x");

  const obj = {
    colors: {
      primary: {
        background: c(colors.neutral[125]),
        foreground: c(colors.neutral[620]),
      },

      cursor: {
        text: c(colors.neutral[840]),
        cursor: c(colors.neutral[620]),
      },

      normal: {
        black: c(colors.neutral[75]),
        red: c(colors.syntax.deleted),
        green: c(colors.syntax.regexp),
        yellow: c(colors.syntax.variable),
        blue: c(colors.syntax.support),
        magenta: c(colors.syntax.entity),
        cyan: c(colors.syntax.string),
        white: c(colors.neutral[840]),
      },

      bright: {
        black: c(colors.neutral[125]),
        red: c(colors.semantic.error),
        green: c(colors.semantic.addedResource),
        yellow: c(colors.semantic.lintWarning),
        blue: c(colors.accent),
        magenta: c(colors.semantic.untrackedResource),
        cyan: c(colors.syntax.string),
        white: c(colors.neutral[1000]),
      },
    },
  };

  return YAML.stringify(obj);
};
