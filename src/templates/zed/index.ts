import fs from "fs/promises";
import path from "path";
import { Colors } from "../../colors";
import { ThemeGenerator } from "../../types";
import { ensureDir } from "../../util/filesystem";
import Color from "color";

export const generate: ThemeGenerator = async ({
  colors,
  baseOutputDirectory,
}) => {
  const outputDirectory = path.join(baseOutputDirectory, "zed");

  await Promise.all([ensureDir(path.join(outputDirectory, `./themes`))]).then(
    () =>
      Promise.all([
        fs.writeFile(
          path.join(outputDirectory, `./extension.toml`),
          createExtension()
        ),

        fs.writeFile(
          path.join(outputDirectory, `./themes/concrete.json`),
          JSON.stringify(createTheme(colors), null, 2)
        ),
      ])
  );
};

function createExtension() {
  return `
id = "concrete"
name = "Concrete"
version = "0.0.1"
schema_version = 1
authors = ["Ben Bachem <10088265+bezbac@users.noreply.github.com>"]
description = " A vibrant dark theme that blends into MacOS seamlessly."
repository = "https://github.com/bezbac/concrete"
  `.trim();
}

function createTheme(colors: Colors) {
  const selectionBgWithoutAlpha = Color(colors.neutral[150])
    .mix(Color(colors.background.selection))
    .lighten(0.1)
    .saturate(0.3);

  return {
    $schema: "https://zed.dev/schema/themes/v0.2.0.json",
    name: "Concrete",
    author: "Ben Bachem <10088265+bezbac@users.noreply.github.com>",
    themes: [
      {
        name: "Concrete",
        appearance: "dark",
        style: {
          background: Color(colors.neutral[125]).hex(),
          "background.appearance": "opaque",

          text: Color(colors.neutral[920]).hex(),
          "text.muted": Color(colors.neutral[840]).hex(),

          border: Color(colors.neutral[75]).hex(),
          "border.variant": Color(colors.neutral[75]).hex(),
          "border.focused": Color(colors.transparent).hex(),
          "border.selected": Color(colors.neutral[75]).hex(),
          "border.transparent": Color(colors.neutral[75]).hex(),
          "border.disabled": Color(colors.neutral[75]).hex(),

          "scrollbar.thumb.background": Color(
            colors.background.scrollbar.base
          ).hexa(),
          "scrollbar.thumb.hover_background": Color(
            colors.background.scrollbar.hover
          ).hexa(),
          "scrollbar.thumb.active_background": Color(
            colors.background.scrollbar.active
          ).hexa(),
          "scrollbar.thumb.border": Color(
            colors.background.scrollbar.base
          ).hexa(),
          "scrollbar.track.background": Color(colors.neutral[150]).hex(),
          "scrollbar.track.border": Color(colors.neutral[75]).hex(),

          "editor.foreground": Color(colors.neutral[840]).hex(),
          "editor.background": Color(colors.neutral[150]).hex(),
          "editor.gutter.background": Color(colors.neutral[150]).hex(),
          "editor.active_line.background": Color(colors.neutral[190]).hex(),
          "editor.line_number": Color(colors.neutral[310]).hex(),
          "editor.active_line_number": Color(colors.neutral[840]).hex(),
          "editor.wrap_guide": Color(colors.neutral[75]).hex(),
          "editor.active_wrap_guide": Color(colors.neutral[75]).hex(),
          "editor.document_highlight.bracket_background": Color(
            colors.neutral[380]
          ).hex(),

          "terminal.ansi.black": Color(colors.ansi.normal.black).hex(),
          "terminal.ansi.bright_black": Color(colors.ansi.bright.black).hex(),
          "terminal.ansi.red": Color(colors.ansi.normal.red).hex(),
          "terminal.ansi.bright_red": Color(colors.ansi.bright.red).hex(),
          "terminal.ansi.green": Color(colors.ansi.normal.green).hex(),
          "terminal.ansi.bright_green": Color(colors.ansi.bright.green).hex(),
          "terminal.ansi.yellow": Color(colors.ansi.normal.yellow).hex(),
          "terminal.ansi.bright_yellow": Color(colors.ansi.bright.yellow).hex(),
          "terminal.ansi.blue": Color(colors.ansi.normal.blue).hex(),
          "terminal.ansi.bright_blue": Color(colors.ansi.bright.blue).hex(),
          "terminal.ansi.magenta": Color(colors.ansi.normal.magenta).hex(),
          "terminal.ansi.bright_magenta": Color(
            colors.ansi.bright.magenta
          ).hex(),
          "terminal.ansi.cyan": Color(colors.ansi.normal.cyan).hex(),
          "terminal.ansi.bright_cyan": Color(colors.ansi.bright.cyan).hex(),
          "terminal.ansi.white": Color(colors.ansi.normal.white).hex(),
          "terminal.ansi.bright_white": Color(colors.ansi.bright.white).hex(),

          conflict: Color(colors.semantic.conflictingResource).hex(),
          created: Color(colors.gutter.added).hex(),
          deleted: Color(colors.gutter.deleted).hex(),
          modified: Color(colors.gutter.modified).hex(),

          error: Color(colors.semantic.lintError).hex(),
          info: Color(colors.semantic.lintInfo).hex(),
          warning: Color(colors.semantic.lintWarning).hex(),

          syntax: {
            comment: {
              color: Color(colors.syntax.comment).hex(),
            },
            "comment.doc": {
              color: Color(colors.syntax.comment).hex(),
            },
            constant: {
              color: Color(colors.syntax.support).hex(),
            },
            constructor: {
              color: Color(colors.syntax.regexp).hex(),
            },
            emphasis: {
              color: Color(colors.neutral[840]).hex(),
              font_style: "italic",
            },
            "emphasis.strong": {
              color: Color(colors.neutral[840]).hex(),
              font_weight: 700.0,
            },
            keyword: {
              color: Color(colors.syntax.keyword).hex(),
            },
            label: {
              color: Color(colors.syntax.entity).hex(),
            },
            link_text: {
              color: Color(colors.neutral[1000]).hex(),
            },
            link_uri: {
              color: Color(colors.neutral[1000]).hex(),
            },
            number: {
              color: Color(colors.syntax.support).hex(),
            },
            string: {
              color: Color(colors.syntax.string).hex(),
            },
            "string.escape": {
              color: Color(colors.syntax.string).hex(),
            },
            "string.regex": {
              color: Color(colors.syntax.string).hex(),
            },
            "string.special": {
              color: Color(colors.syntax.string).hex(),
            },
            "string.special.symbol": {
              color: Color(colors.syntax.string).hex(),
            },
            tag: {
              color: Color(colors.syntax.regexp).hex(),
            },
            "text.literal": {
              color: Color(colors.syntax.string).hex(),
            },
            title: {
              color: Color(colors.syntax.entity).hex(),
            },
            variable: {
              color: Color(colors.syntax.variable).hex(),
            },
            "variable.special": {
              color: Color(colors.syntax.support).hex(),
            },
          },

          "elevated_surface.background": Color(colors.neutral[190]).hex(),
          "status_bar.background": Color(colors.neutral[125]).hex(),
          "title_bar.background": Color(colors.neutral[150]).hex(),
          "toolbar.background": Color(colors.neutral[150]).hex(),
          "tab_bar.background": Color(colors.neutral[125]).hex(),
          "tab.inactive_background": Color(colors.neutral[125]).hex(),
          "tab.active_background": Color(colors.neutral[150]).hex(),
          "panel.background": Color(colors.neutral[125]).hex(),
          "surface.background": Color(colors.neutral[125]).hex(),

          "element.background": Color(colors.neutral[190]).hex(),
          "element.hover": Color(colors.neutral[150]).hex(),
          "element.active": null,
          "element.selected": Color(colors.neutral[150]).hex(),
          "element.disabled": null,

          "ghost_element.hover": Color(colors.neutral[125]).hex(),
          "ghost_element.selected": Color(colors.neutral[150]).hex(),

          "search.match_background": Color(colors.background.findMatch).hexa(),

          "pane_group.border": Color(colors.neutral[75]).hex(),

          accents: [],

          "link_text.hover": Color(colors.neutral[1000]).hex(),

          hidden: Color(colors.neutral[620]).hex(),
          hint: Color(colors.neutral[380]).hex(),
          ignored: Color(colors.syntax.comment).hex(),

          players: [
            {
              selection: selectionBgWithoutAlpha.hex(),
            },
          ],
        },
      },
    ],
  };
}
