import Color from "color";
import builder, { XMLElement } from "xmlbuilder";
import { ThemeGenerator } from "../../types";
import { ensureDir } from "../../util/filesystem";
import path from "path";
import fs from "fs/promises";
import { Colors } from "../../colors";

export const generate: ThemeGenerator = async ({
  colors,
  baseOutputDirectory,
}) => {
  await ensureDir(baseOutputDirectory);
  await fs.writeFile(
    path.join(baseOutputDirectory, `./concrete.itermcolors`),
    createTheme(colors)
  );
};

function createItermColorElement(
  rootElement: XMLElement,
  name: string,
  hex: string
) {
  const [r, g, b] = Color(hex)
    .rgb()
    .array()
    .map((v) => v / 255);

  const nameNode = rootElement.ele("key");
  nameNode.text(name);

  const valuesDict = rootElement.ele("dict");
  valuesDict.ele("key").text("Alpha Component");
  valuesDict.ele("real").text("1");

  valuesDict.ele("key").text("Blue Component");
  valuesDict.ele("real").text(b.toPrecision(17));

  valuesDict.ele("key").text("Green Component");
  valuesDict.ele("real").text(g.toPrecision(17));

  valuesDict.ele("key").text("Red Component");
  valuesDict.ele("real").text(r.toPrecision(17));

  valuesDict.ele("key").text("Color Space");
  valuesDict.ele("string").text("sRGB");
}

const ansiColors = [
  "Black",
  "Red",
  "Green",
  "Yellow",
  "Blue",
  "Magenta",
  "Cyan",
  "White",
];

function getAnsiColorName(name: string, bright: boolean) {
  const index = ansiColors.indexOf(name) + (bright ? 8 : 0);
  return "Ansi " + index + " Color";
}

function createTheme(colors: Colors) {
  const root = builder.create("plist");
  root.attribute("version", "1.0");

  const dict = root.ele("dict");

  createItermColorElement(dict, "Selection Color", colors.background.selection);
  createItermColorElement(dict, "Selected Text Color", colors.neutral[1000]);
  createItermColorElement(dict, "Link Color", colors.accent);
  createItermColorElement(dict, "Foreground Color", colors.neutral[620]);
  createItermColorElement(dict, "Cursor Text Color", colors.neutral[620]);
  createItermColorElement(dict, "Cursor Guide Color", colors.neutral[620]);
  createItermColorElement(dict, "Cursor Color", colors.neutral[620]);
  createItermColorElement(dict, "Bold Color", colors.neutral[1000]);
  createItermColorElement(dict, "Badge Color", colors.background.badge);
  createItermColorElement(dict, "Background Color", colors.neutral[150]);

  createItermColorElement(
    dict,
    getAnsiColorName("Black", false),
    colors.ansi.normal.black
  );
  createItermColorElement(
    dict,
    getAnsiColorName("Black", true),
    colors.ansi.bright.black
  );

  createItermColorElement(
    dict,
    getAnsiColorName("Red", false),
    colors.ansi.normal.red
  );
  createItermColorElement(
    dict,
    getAnsiColorName("Red", true),
    colors.ansi.bright.red
  );

  createItermColorElement(
    dict,
    getAnsiColorName("Green", false),
    colors.ansi.normal.green
  );
  createItermColorElement(
    dict,
    getAnsiColorName("Green", true),
    colors.ansi.bright.green
  );

  createItermColorElement(
    dict,
    getAnsiColorName("Yellow", false),
    colors.ansi.normal.yellow
  );
  createItermColorElement(
    dict,
    getAnsiColorName("Yellow", true),
    colors.ansi.bright.yellow
  );

  createItermColorElement(
    dict,
    getAnsiColorName("Blue", false),
    colors.ansi.normal.blue
  );
  createItermColorElement(
    dict,
    getAnsiColorName("Blue", true),
    colors.ansi.bright.blue
  );

  createItermColorElement(
    dict,
    getAnsiColorName("Magenta", false),
    colors.ansi.normal.magenta
  );
  createItermColorElement(
    dict,
    getAnsiColorName("Magenta", true),
    colors.ansi.bright.magenta
  );

  createItermColorElement(
    dict,
    getAnsiColorName("Cyan", false),
    colors.ansi.normal.cyan
  );
  createItermColorElement(
    dict,
    getAnsiColorName("Cyan", true),
    colors.ansi.bright.cyan
  );

  createItermColorElement(
    dict,
    getAnsiColorName("White", false),
    colors.ansi.normal.white
  );
  createItermColorElement(
    dict,
    getAnsiColorName("White", true),
    colors.ansi.bright.white
  );

  return root.end({ pretty: true });
}
