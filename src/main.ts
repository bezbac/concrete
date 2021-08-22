import path from "path";
import theme from "./theme";
import { generate as generateVscodeTheme } from "./templates/vscode";
import { generate as generateITermTheme } from "./templates/iterm";
import { generate as generatePrismTheme } from "./templates/prism";
import { generate as generatePreviewTheme } from "./templates/preview";

const baseOutputDirectory = path.resolve("./output/");
const baseResourceDirectory = path.resolve("./resources/");

generateVscodeTheme({
  theme,
  baseResourceDirectory,
  outputDirectory: path.join(baseOutputDirectory, "vscode"),
});

generateITermTheme({
  theme,
  baseResourceDirectory,
  outputDirectory: path.join(baseOutputDirectory, "iterm2"),
});

generatePrismTheme({
  theme,
  baseResourceDirectory,
  outputDirectory: path.join(baseOutputDirectory, "prism"),
});

generatePreviewTheme({
  theme,
  baseResourceDirectory,
  outputDirectory: path.join(baseOutputDirectory, "preview"),
});
