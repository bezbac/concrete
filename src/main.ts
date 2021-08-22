import path from "path";
import colors from "./colors";
import { generate as generateVscodeTheme } from "./templates/vscode";
import { generate as generateITermTheme } from "./templates/iterm";
import { generate as generatePrismTheme } from "./templates/prism";
import { generate as generatePreviewTheme } from "./templates/preview";

const baseOutputDirectory = path.resolve("./output/");
const baseResourceDirectory = path.resolve("./resources/");

generateVscodeTheme({
  colors,
  baseResourceDirectory,
  outputDirectory: path.join(baseOutputDirectory, "vscode"),
});

generateITermTheme({
  colors,
  baseResourceDirectory,
  outputDirectory: path.join(baseOutputDirectory, "iterm2"),
});

generatePrismTheme({
  colors,
  baseResourceDirectory,
  outputDirectory: path.join(baseOutputDirectory, "prism"),
});

generatePreviewTheme({
  colors,
  baseResourceDirectory,
  outputDirectory: path.join(baseOutputDirectory, "preview"),
});
