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
  const outputDirectory = path.join(baseOutputDirectory, "helix");

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
"type" = "${colors.syntax.entity}"
"constant" = "${colors.syntax.support}"
"string" = "${colors.syntax.string}"
"string.regexp" = "${colors.syntax.regexp}"
"comment" = "${colors.syntax.comment}"
"variable" = "${colors.syntax.variable}"
"variable.parameter" = "${colors.neutral[840]}"
"label" = "${colors.syntax.support}"
"punctuation" = "${colors.syntax.punctuation}"
"keyword" = "${colors.syntax.keyword}"
"operator" = "${colors.syntax.variable}"
"function" = "${colors.syntax.entity}"
"tag" = "${colors.syntax.support}"
"namespace" = "${colors.syntax.string}"
"attribute" = "${colors.syntax.support}"
"constructor" = "${colors.syntax.entity}"

"diff.plus" = "${colors.semantic.addedResource}"
"diff.delta" = "${colors.semantic.modifiedResource}"
"diff.minus" = "${colors.semantic.deletedResource}"

"ui.background" = { bg = "${colors.neutral[125]}" }
"ui.background.separator" = "${colors.neutral[75]}"
"ui.cursor" = { fg = "${colors.neutral[75]}", bg = "${colors.neutral[620]}" }
"ui.cursor.insert" = { bg = "${colors.semantic.addedResource}", fg = "${colors.neutral[1000]}" }
"ui.cursorline" = { bg = "${colors.neutral[190]}" }
"ui.linenr" = "${colors.neutral[310]}"
"ui.linenr.selected" = "${colors.neutral[840]}"
"ui.selection" = { bg = "${selectionBgWithoutAlpha}" }
"ui.statusline" = { fg = "${colors.neutral[620]}", bg = "${colors.neutral[125]}" }
"ui.statusline.inactive" = { fg = "${colors.semantic.ignoredResource}", bg = "${colors.neutral[125]}" }
"ui.statusline.normal" = { fg = "${colors.neutral[150]}", bg = "${colors.semantic.ignoredResource}", modifiers = ["bold"] }
"ui.statusline.insert" = { fg = "${colors.neutral[150]}", bg = "${colors.semantic.addedResource}", modifiers = ["bold"] }
"ui.statusline.select" = { fg = "${colors.neutral[150]}", bg = "${colors.syntax.string}", modifiers = ["bold"] }

"ui.menu" = { fg = "${colors.neutral[1000]}", bg = "${colors.neutral[190]}" }
"ui.menu.selected" = { fg = "${colors.neutral[1000]}", bg = "${colors.background.selection}", modifiers = ["bold"]  }

"hint" = "${colors.neutral[620]}"
"info" = "${colors.semantic.lintInfo}"
"warning" = "${colors.semantic.lintWarning}"
"error" = "${colors.semantic.lintError}"

"diagnostic" = { underline = { style = "curl" } }
"diagnostic.hint" = { underline = { color = "${colors.neutral[620]}", style = "dotted" } }
"diagnostic.info" = { underline = { color = "${colors.semantic.lintInfo}", style = "dotted" } }
"diagnostic.warning" = { underline = { color = "${colors.semantic.lintWarning}", style = "curl" } }
"diagnostic.error" = { underline = { color = "${colors.semantic.lintError}", style = "curl" } }
  `;
};
