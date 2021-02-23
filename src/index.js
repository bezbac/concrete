const fs = require("fs").promises;
const getVsCodeTheme = require("./vscode/theme");
const getItermTheme = require("./iterm/theme");

fs.mkdir("./output/vscode/themes", { recursive: true })
  .then(() =>
    Promise.all([
      fs.copyFile(
        "./resources/vscode/package.json",
        "./output/vscode/package.json"
      ),
      fs.writeFile(
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
  )
  .catch(() => process.exit(1));

fs.mkdir("./output/iterm2/themes", { recursive: true })
  .then(() =>
    Promise.all([
      fs.writeFile("./output/iterm2/themes/dark.itermcolors", getItermTheme()),
    ])
  )
  .catch(() => process.exit(1));
