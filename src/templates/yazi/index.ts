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
  const outputDirectory = path.join(baseOutputDirectory, "yazi");

  await ensureDir(outputDirectory);

  await fs.writeFile(
    path.join(outputDirectory, `./flavor.toml`),
    createTheme(colors)
  );
};

const createTheme = (colors: Colors) => {
  const selectionBgWithoutAlpha = Color(colors.neutral[150])
    .mix(Color(colors.background.selection))
    .lighten(0.1)
    .hex();

  return `
# vim:fileencoding=utf-8:foldmethod=marker

[mgr]
cwd = { fg = "${colors.syntax.string}" }

# Hovered
hovered = { reversed = true }
preview_hovered = { underline = true }

# Find
find_keyword = { fg = "${colors.syntax.punctuation}", bold = true, italic = true, underline = true }
find_position = { fg = "${colors.syntax.deleted}", bg = "reset", bold = true, italic = true }

# Marker
marker_copied = { fg = "${colors.syntax.regexp}", bg = "${colors.syntax.regexp}" }
marker_cut = { fg = "${colors.syntax.keyword}", bg = "${colors.syntax.keyword}" }
marker_marked = { fg = "${colors.syntax.string}", bg = "${colors.syntax.string}" }
marker_selected = { fg = "${colors.syntax.punctuation}", bg = "${colors.syntax.punctuation}" }

# Count
count_copied = { fg = "${colors.neutral[125]}", bg = "${colors.syntax.regexp}" }
count_cut = { fg = "${colors.neutral[125]}", bg = "${colors.syntax.keyword}" }
count_selected = { fg = "${colors.neutral[125]}", bg = "${colors.syntax.punctuation}" }

# Border
border_symbol = "│"
border_style = { fg = "${colors.neutral[380]}" }


[tabs]
active = { fg = "${colors.neutral[125]}", bg = "${selectionBgWithoutAlpha}", bold = true }
inactive = { fg = "${selectionBgWithoutAlpha}", bg = "${colors.neutral[310]}" }


[mode]

normal_main = { fg = "${colors.neutral[125]}", bg = "${colors.semantic.ignoredResource}", bold = true }
normal_alt = { fg = "${colors.semantic.ignoredResource}", bg = "${colors.neutral[310]}" }

# Select mode
select_main = { fg = "${colors.neutral[125]}", bg = "${colors.syntax.string}", bold = true }
select_alt = { fg = "${colors.syntax.string}", bg = "${colors.neutral[310]}" }

# Unset mode
unset_main = { fg = "${colors.neutral[125]}", bg = "${colors.syntax.variable}", bold = true }
unset_alt = { fg = "${colors.syntax.variable}", bg = "${colors.neutral[310]}" }


[status]
# Permissions
perm_sep = { fg = "${colors.neutral[380]}" }
perm_type = { fg = "${colors.syntax.entity}" }
perm_read = { fg = "${colors.syntax.punctuation}" }
perm_write = { fg = "${colors.syntax.keyword}" }
perm_exec = { fg = "${colors.syntax.regexp}" }

# Progress
progress_label = { fg = "${colors.neutral[1000]}", bold = true }
progress_normal = { fg = "${colors.syntax.entity}", bg = "${colors.neutral[620]}" }
progress_error = { fg = "${colors.syntax.keyword}", bg = "${colors.neutral[620]}" }

[pick]
border = { fg = "${colors.syntax.entity}" }
active = { fg = "${colors.syntax.deleted}", bold = true }
inactive = {}

[input]
border = { fg = "${colors.syntax.entity}" }
title = {}
value = {}
selected = { reversed = true }

[cmp]
border = { fg = "${colors.syntax.entity}" }

[tasks]
border = { fg = "${colors.syntax.entity}" }
title = {}
hovered = { fg = "${colors.syntax.deleted}", underline = true }

[which]
mask = { bg = "${colors.neutral[310]}" }
cand = { fg = "${colors.syntax.string}" }
rest = { fg = "${colors.neutral[620]}" }
desc = { fg = "${colors.syntax.deleted}" }
separator = "  "
separator_style = { fg = "${colors.neutral[380]}" }

[help]
on = { fg = "${colors.syntax.string}" }
run = { fg = "${colors.syntax.deleted}" }
hovered = { reversed = true, bold = true }
footer = { fg = "${colors.neutral[310]}", bg = "${colors.neutral[840]}" }

[notify]
title_info = { fg = "${colors.syntax.regexp}" }
title_warn = { fg = "${colors.syntax.punctuation}" }
title_error = { fg = "${colors.syntax.keyword}" }

[filetype]

rules = [
    # Images
    { mime = "image/*", fg = "${colors.syntax.string}" },

    # Media
    { mime = "{audio,video}/*", fg = "${colors.syntax.punctuation}" },

    # Archives
    { mime = "application/{zip,rar,7z*,tar,gzip,xz,zstd,bzip*,lzma,compress,archive,cpio,arj,xar,ms-cab*}", fg = "${colors.syntax.deleted}" },

    # Documents
    { mime = "application/{pdf,doc,rtf}", fg = "${colors.syntax.regexp}" },

    # Fallback
    { url = "*", fg = "${colors.neutral[1000]}" },
    { url = "*/", fg = "${colors.syntax.entity}" },
]`;
};
