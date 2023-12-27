import { ThemeGenerator } from "../../types";
import { ensureDir } from "../../util/filesystem";
import fs from "fs/promises";
import path from "path";
import { Colors } from "../../colors";
import Color from "color";

export const generate: ThemeGenerator = async ({
  colors,
  baseOutputDirectory,
}) => {
  const outputDirectory = path.join(baseOutputDirectory, "wezterm");

  await ensureDir(outputDirectory);

  await fs.writeFile(
    path.join(outputDirectory, `./concrete.toml`),
    createTheme(colors)
  );
};

const createTheme = (colors: Colors) => {
  const selectionBgWithoutAlpha = Color(colors.neutral[150])
    .mix(Color(colors.background.selection))
    .lighten(0.1)
    .hex();

  return `
[colors]
ansi = [
  '${Color(colors.ansi.normal.white).hex()}',
  '${Color(colors.ansi.normal.red).hex()}',
  '${Color(colors.ansi.normal.green).hex()}',
  '${Color(colors.ansi.normal.yellow).hex()}',
  '${Color(colors.ansi.normal.blue).hex()}',
  '${Color(colors.ansi.normal.magenta).hex()}',
  '${Color(colors.ansi.normal.cyan).hex()}',
  '${Color(colors.ansi.normal.black).hex()}',
]
background = '${Color(colors.neutral[125]).hex()}'
brights = [
  '${Color(colors.neutral[380]).hex()}',
  '${Color(colors.ansi.bright.red).hex()}',
  '${Color(colors.ansi.bright.green).hex()}',
  '${Color(colors.ansi.bright.yellow).hex()}',
  '${Color(colors.ansi.bright.blue).hex()}',
  '${Color(colors.ansi.bright.magenta).hex()}',
  '${Color(colors.ansi.bright.cyan).hex()}',
  '${Color(colors.ansi.bright.black).hex()}',
]
compose_cursor = '${Color(colors.neutral[380]).hex()}'
cursor_bg = '${Color(colors.neutral[620]).hex()}'
cursor_border = '${Color(colors.neutral[620]).hex()}'
cursor_fg = '${Color(colors.neutral[75]).hex()}'
foreground = '${Color(colors.neutral[620]).hex()}'
scrollbar_thumb = '${Color(colors.neutral[380]).hex()}'
selection_bg = '${selectionBgWithoutAlpha}'
split = '${Color(colors.neutral[380]).hex()}'
visual_bell = '${Color(colors.neutral[150]).hex()}'
  `;
};
