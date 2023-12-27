import path from "path";
import colors from "./colors";
import { generate as generateVscodeTheme } from "./templates/vscode";
import { generate as generateITermTheme } from "./templates/iterm";
import { generate as generatePrismTheme } from "./templates/prism";
import { generate as generatePreviewTheme } from "./templates/preview";
import { generate as generateHelixTheme } from "./templates/helix";
import { generate as generateZellijTheme } from "./templates/zellij";
import { generate as generateAlacrittyTheme } from "./templates/alacritty";
import { generate as generateWeztermTheme } from "./templates/wezterm";

const baseOutputDirectory = path.resolve("./output/");
const baseResourceDirectory = path.resolve("./resources/");

generateVscodeTheme({
  colors,
  baseResourceDirectory,
  baseOutputDirectory,
});

generateITermTheme({
  colors,
  baseResourceDirectory,
  baseOutputDirectory,
});

generatePrismTheme({
  colors,
  baseResourceDirectory,
  baseOutputDirectory,
});

generatePreviewTheme({
  colors,
  baseResourceDirectory,
  baseOutputDirectory,
});

generateHelixTheme({
  colors,
  baseResourceDirectory,
  baseOutputDirectory,
});

generateZellijTheme({
  colors,
  baseResourceDirectory,
  baseOutputDirectory,
});

generateAlacrittyTheme({
  colors,
  baseResourceDirectory,
  baseOutputDirectory,
});

generateWeztermTheme({
  colors,
  baseResourceDirectory,
  baseOutputDirectory,
});
