import fs from "fs/promises";
import getVsCodeTheme from "./vscode/theme";
import getItermTheme from "./iterm/theme";
import getPrismTheme from "./prism/theme";
import getPaletteTheme from "./palette/theme";

async function ensureDir(path: string) {
  return fs.stat(path).catch(async (err) => {
    if (err.message.includes("no such file or directory")) {
      await fs.mkdir(path);
    }
  });
}

Promise.all([
  ensureDir("./output/vscode/themes"),
  ensureDir("./output/vscode/images"),
]).then(() =>
  Promise.all([
    fs.copyFile(
      "./resources/vscode/package.json",
      "./output/vscode/package.json"
    ),
    fs.copyFile("./resources/icon.png", "./output/vscode/images/icon.png"),
    fs.writeFile(
      "./output/vscode/themes/concrete-dark.json",
      JSON.stringify(
        getVsCodeTheme({
          name: "Concrete",
        }),
        null,
        2
      )
    ),
  ])
);

ensureDir("./output/iterm2/themes").then(() =>
  Promise.all([
    fs.writeFile(
      "./output/iterm2/themes/concrete-dark.itermcolors",
      getItermTheme()
    ),
  ])
);

ensureDir("./output/prism/themes").then(() =>
  Promise.all([
    getPrismTheme().then((output) =>
      fs.writeFile("./output/prism/themes/concrete-dark.css", output)
    ),
  ])
);

ensureDir("./output/palette/themes").then(() =>
  Promise.all([
    getPaletteTheme().then((output) =>
      fs.writeFile("./output/palette/themes/concrete-dark.html", output)
    ),
  ])
);
