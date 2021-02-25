import colors from "../colors.ts";
import {
  serialize,
  tag,
  declaration,
  Tag,
} from "https://raw.githubusercontent.com/olaven/serialize-xml/v0.3.2/mod.ts";
import Color from "https://esm.sh/color@3.1.3";

function createItermColorElement(name: string, hex: string): Tag[] {
  const [r, g, b] = Color(hex)
    .rgb()
    .array()
    .map((v: number) => v / 255);

  return [
    tag("key", name),
    tag("dict", [
      tag("key", "Alpha Component"),
      tag("real", "1"),

      tag("key", "Blue Component"),
      tag("real", b.toPrecision(17)),

      tag("key", "Green Component"),
      tag("real", g.toPrecision(17)),

      tag("key", "Red Component"),
      tag("real", r.toPrecision(17)),

      tag("key", "Color Space"),
      tag("string", "sRGB"),
    ]),
  ];
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

function getTheme() {
  return serialize(
    declaration([["version", "1.0"]]),
    tag(
      "plist",
      [
        tag(
          "dict",
          [
            createItermColorElement(
              "Selection Color",
              colors.background.selection
            ),
            createItermColorElement("Selected Text Color", colors.base.sharp),
            createItermColorElement("Link Color", colors.accent),
            createItermColorElement("Foreground Color", colors.base.soft),
            createItermColorElement("Cursor Text Color", colors.base.soft),
            createItermColorElement("Cursor Guide Color", colors.base.soft),
            createItermColorElement("Cursor Color", colors.base.soft),
            createItermColorElement("Bold Color", colors.base.sharp),
            createItermColorElement("Badge Color", colors.background.badge),
            createItermColorElement("Background Color", colors.base.background),

            createItermColorElement(
              getAnsiColorName("Black", false),
              colors.base.elevated
            ),
            createItermColorElement(
              getAnsiColorName("Black", true),
              colors.base.muted
            ),

            createItermColorElement(
              getAnsiColorName("Red", false),
              colors.syntax.deleted
            ),
            createItermColorElement(
              getAnsiColorName("Red", true),
              colors.syntax.deleted
            ),

            createItermColorElement(
              getAnsiColorName("Green", false),
              colors.syntax.regexp
            ),
            createItermColorElement(
              getAnsiColorName("Green", true),
              colors.syntax.regexp
            ),

            createItermColorElement(
              getAnsiColorName("Yellow", false),
              colors.syntax.variable
            ),
            createItermColorElement(
              getAnsiColorName("Yellow", true),
              colors.syntax.variable
            ),

            createItermColorElement(
              getAnsiColorName("Blue", false),
              colors.syntax.support
            ),
            createItermColorElement(
              getAnsiColorName("Blue", true),
              colors.syntax.support
            ),

            createItermColorElement(
              getAnsiColorName("Magenta", false),
              colors.syntax.entity
            ),
            createItermColorElement(
              getAnsiColorName("Magenta", true),
              colors.syntax.entity
            ),

            createItermColorElement(
              getAnsiColorName("Cyan", false),
              colors.syntax.string
            ),
            createItermColorElement(
              getAnsiColorName("Cyan", true),
              colors.syntax.string
            ),

            createItermColorElement(
              getAnsiColorName("White", false),
              colors.base.text
            ),
            createItermColorElement(
              getAnsiColorName("White", true),
              colors.base.sharp
            ),
          ].flat()
        ),
      ],
      [["version", "1.0"]]
    )
  );
}

export default getTheme;
