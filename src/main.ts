import { ensureDir, copy } from "https://deno.land/std@0.88.0/fs/mod.ts";
import getVsCodeTheme from "./vscode/theme.ts";
import getItermTheme from "./iterm/theme.ts";

ensureDir("./output/vscode/themes").then(() =>
  Promise.all([
    copy("./resources/vscode/package.json", "./output/vscode/package.json", {
      overwrite: true,
    }),
    Deno.writeTextFile(
      "./output/vscode/themes/dark.json",
      JSON.stringify(
        getVsCodeTheme({
          name: "Personal Theme",
        }),
        null,
        2
      )
    ),
  ])
);

ensureDir("./output/iterm2/themes").then(() =>
  Promise.all([
    Deno.writeTextFile(
      "./output/iterm2/themes/dark.itermcolors",
      getItermTheme()
    ),
  ])
);
