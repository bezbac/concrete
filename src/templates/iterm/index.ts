import Color from "color";
import builder, { XMLElement } from "xmlbuilder";
import { ThemeGenerator } from "../../types";
import { ensureDir } from "../../util/filesystem";
import path from "path";
import fs from "fs/promises";
import { Colors } from "../../colors";

export const generate: ThemeGenerator = async ({ colors, outputDirectory }) => {
  await ensureDir(outputDirectory);
  await fs.writeFile(
    path.join(outputDirectory, `./concrete.itermcolors`),
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
  createItermColorElement(dict, "Selected Text Color", colors.base.sharp);
  createItermColorElement(dict, "Link Color", colors.accent);
  createItermColorElement(dict, "Foreground Color", colors.base.soft);
  createItermColorElement(dict, "Cursor Text Color", colors.base.soft);
  createItermColorElement(dict, "Cursor Guide Color", colors.base.soft);
  createItermColorElement(dict, "Cursor Color", colors.base.soft);
  createItermColorElement(dict, "Bold Color", colors.base.sharp);
  createItermColorElement(dict, "Badge Color", colors.background.badge);
  createItermColorElement(dict, "Background Color", colors.base.background);

  createItermColorElement(
    dict,
    getAnsiColorName("Black", false),
    colors.base.elevated
  );
  createItermColorElement(
    dict,
    getAnsiColorName("Black", true),
    colors.base.muted
  );

  createItermColorElement(
    dict,
    getAnsiColorName("Red", false),
    colors.syntax.deleted
  );
  createItermColorElement(
    dict,
    getAnsiColorName("Red", true),
    colors.syntax.deleted
  );

  createItermColorElement(
    dict,
    getAnsiColorName("Green", false),
    colors.syntax.regexp
  );
  createItermColorElement(
    dict,
    getAnsiColorName("Green", true),
    colors.syntax.regexp
  );

  createItermColorElement(
    dict,
    getAnsiColorName("Yellow", false),
    colors.syntax.variable
  );
  createItermColorElement(
    dict,
    getAnsiColorName("Yellow", true),
    colors.syntax.variable
  );

  createItermColorElement(
    dict,
    getAnsiColorName("Blue", false),
    colors.syntax.support
  );
  createItermColorElement(
    dict,
    getAnsiColorName("Blue", true),
    colors.syntax.support
  );

  createItermColorElement(
    dict,
    getAnsiColorName("Magenta", false),
    colors.syntax.entity
  );
  createItermColorElement(
    dict,
    getAnsiColorName("Magenta", true),
    colors.syntax.entity
  );

  createItermColorElement(
    dict,
    getAnsiColorName("Cyan", false),
    colors.syntax.string
  );
  createItermColorElement(
    dict,
    getAnsiColorName("Cyan", true),
    colors.syntax.string
  );

  createItermColorElement(
    dict,
    getAnsiColorName("White", false),
    colors.base.text
  );
  createItermColorElement(
    dict,
    getAnsiColorName("White", true),
    colors.base.sharp
  );

  return root.end({ pretty: true });
}
