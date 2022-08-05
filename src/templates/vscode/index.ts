import fs from "fs/promises";
import path from "path";
import { Colors } from "../../colors";
import { ThemeGenerator } from "../../types";
import { ensureDir } from "../../util/filesystem";

export const generate: ThemeGenerator = async ({
  colors,
  baseResourceDirectory,
  baseOutputDirectory,
}) => {
  const outputDirectory = path.join(baseOutputDirectory, "vscode");

  await Promise.all([
    ensureDir(path.join(outputDirectory, `./themes`)),
    ensureDir(path.join(outputDirectory, `./images`)),
  ]).then(() =>
    Promise.all([
      fs.copyFile(
        path.join(baseResourceDirectory, "./icon.png"),
        path.join(outputDirectory, `./images/icon.png`)
      ),

      fs.writeFile(
        path.join(outputDirectory, `./package.json`),
        JSON.stringify(
          {
            name: "concrete-vscode",
            displayName: `Concrete`,
            description:
              "A vibrant dark theme that blends into MacOS seamlessly.",
            version: process.env.npm_package_version,
            engines: {
              vscode: "^1.14.0",
            },
            categories: ["Themes"],
            contributes: {
              themes: [
                {
                  label: `Concrete`,
                  uiTheme: "vs-dark",
                  path: `./themes/concrete.json`,
                },
              ],
            },
            publisher: "bezbac",
            author: "Ben Bachem <10088265+bezbac@users.noreply.github.com>",
            homepage: "https://github.com/bezbac/concrete",
            repository: {
              type: "git",
              url: "https://github.com/bezbac/concrete",
            },
            icon: "images/icon.png",
            license: "BSD-3-Clause",
          },
          null,
          2
        )
      ),

      fs.writeFile(
        `./output/vscode/themes/concrete.json`,
        JSON.stringify(createTheme(colors), null, 2)
      ),
    ])
  );
};

function createTheme(colors: Colors) {
  const workbenchForeground = colors.neutral[840];
  const editorForeground = colors.neutral[840];

  return {
    name: "Concrete",
    colors: {
      focusBorder: colors.transparent,
      foreground: colors.neutral[840],
      descriptionForeground: colors.neutral[620],
      errorForeground: colors.semantic.error,

      "widget.shadow": colors.neutral[125],

      "textLink.foreground": colors.accent,
      "textLink.activeForeground": colors.neutral[1000],
      "textBlockQuote.background": colors.neutral[150],
      "textBlockQuote.border": colors.neutral[310],
      "textCodeBlock.background": colors.neutral[190],
      "textPreformat.foreground": colors.neutral[840],
      "textSeparator.foreground": colors.neutral[380],

      "button.background": colors.background.activeSelection,
      "button.foreground": colors.neutral[1000],
      "button.hoverBackground": colors.accent,

      "checkbox.background": colors.neutral[310],
      "checkbox.border": colors.neutral[75],

      "dropdown.background": colors.neutral[190],
      "dropdown.border": colors.neutral[75],
      "dropdown.foreground": workbenchForeground,
      "dropdown.listBackground": colors.neutral[150],

      "input.background": colors.neutral[150],
      "input.border": colors.neutral[150],
      "input.foreground": workbenchForeground,
      "input.placeholderForeground": colors.neutral[620],

      "badge.foreground": colors.neutral[1000],
      "badge.background": colors.background.badge,

      "progressBar.background": colors.accent,

      "titleBar.activeForeground": workbenchForeground,
      "titleBar.activeBackground": colors.neutral[150],
      "titleBar.inactiveForeground": colors.neutral[620],
      "titleBar.inactiveBackground": colors.neutral[125],
      "titleBar.border": colors.neutral[75],

      "activityBar.foreground": workbenchForeground,
      "activityBar.inactiveForeground": colors.syntax.comment,
      "activityBar.background": colors.neutral[150],
      "activityBarBadge.foreground": colors.neutral[1000],
      "activityBarBadge.background": colors.background.badge,
      "activityBar.activeBorder": colors.neutral[1000],
      "activityBar.border": colors.neutral[75],

      "sideBar.foreground": colors.neutral[840],
      "sideBar.background": colors.neutral[125],
      "sideBar.border": colors.neutral[75],
      "sideBarTitle.foreground": workbenchForeground,
      "sideBarSectionHeader.foreground": workbenchForeground,
      "sideBarSectionHeader.background": colors.neutral[125],
      "sideBarSectionHeader.border": colors.neutral[75],

      "list.hoverForeground": workbenchForeground,
      "list.inactiveSelectionForeground": workbenchForeground,
      "list.activeSelectionForeground": workbenchForeground,
      "list.hoverBackground": colors.neutral[190],
      "list.activeSelectionBackground": colors.background.activeSelection,
      "list.inactiveSelectionBackground": colors.background.inactiveSelection,
      "list.focusBackground": colors.neutral[310],
      "list.inactiveFocusBackground": colors.neutral[190],

      "tree.indentGuidesStroke": colors.neutral[190],

      "notificationCenterHeader.foreground": colors.neutral[620],
      "notificationCenterHeader.background": colors.neutral[150],
      "notifications.foreground": workbenchForeground,
      "notifications.background": colors.neutral[190],
      "notifications.border": colors.neutral[75],
      "notificationsErrorIcon.foreground": colors.gutter.deleted,
      "notificationsWarningIcon.foreground": colors.gutter.modified,
      "notificationsInfoIcon.foreground": colors.syntax.comment,

      "pickerGroup.border": colors.neutral[310],
      "pickerGroup.foreground": workbenchForeground,
      "quickInput.background": colors.neutral[125],
      "quickInput.foreground": workbenchForeground,

      "statusBar.foreground": colors.neutral[840],
      "statusBar.background": colors.neutral[125],
      "statusBar.border": colors.neutral[75],
      "statusBar.noFolderBackground": colors.neutral[150],
      "statusBar.debuggingBackground": colors.neutral[1000],
      "statusBar.debuggingForeground": colors.neutral[1000],
      "statusBarItem.prominentBackground": colors.transparent,

      "editorGroupHeader.tabsBackground": colors.neutral[125],
      "editorGroupHeader.tabsBorder": colors.neutral[75],
      "editorGroup.border": colors.neutral[75],

      "tab.activeForeground": workbenchForeground,
      "tab.inactiveForeground": colors.neutral[620],
      "tab.inactiveBackground": colors.neutral[125],
      "tab.activeBackground": colors.neutral[150],
      "tab.hoverBackground": colors.neutral[150],
      "tab.unfocusedHoverBackground": colors.neutral[150],
      "tab.border": colors.neutral[75],
      "tab.unfocusedActiveBorderTop": colors.neutral[75],
      "tab.activeBorder": colors.neutral[150],
      "tab.unfocusedActiveBorder": colors.neutral[150],
      "tab.activeBorderTop": colors.neutral[1000],

      "breadcrumb.foreground": colors.neutral[620],
      "breadcrumb.focusForeground": workbenchForeground,
      "breadcrumb.activeSelectionForeground": colors.neutral[840],
      "breadcrumbPicker.background": colors.neutral[190],

      "editor.foreground": editorForeground,
      "editor.background": colors.neutral[150],
      "editorWidget.background": colors.neutral[125],
      "editor.foldBackground": colors.neutral[125],
      "editor.lineHighlightBackground": colors.neutral[190],
      "editorLineNumber.foreground": colors.neutral[310],
      "editorLineNumber.activeForeground": editorForeground,
      "editorIndentGuide.background": colors.neutral[190],
      "editorIndentGuide.activeBackground": colors.neutral[310],
      "editorWhitespace.foreground": colors.neutral[310],
      "editorCursor.foreground": colors.neutral[1000],

      "editorInlayHint.foreground": colors.neutral[380],
      "editorInlayHint.background": colors.neutral[190],

      "editor.findMatchBackground": colors.background.findMatch,
      "editor.findMatchHighlightBackground":
        colors.background.findMatchHighlight,
      "editor.inactiveSelectionBackground": colors.background.inactiveSelection,
      "editor.selectionBackground": colors.background.selection,
      "editor.selectionHighlightBackground": colors.neutral[380],
      "editor.selectionHighlightBorder": colors.transparent,
      "editor.wordHighlightBackground": colors.transparent,
      "editor.wordHighlightStrongBackground": colors.transparent,
      "editor.wordHighlightBorder": colors.neutral[840],
      "editor.wordHighlightStrongBorder": colors.neutral[840],
      "editorBracketMatch.background": colors.neutral[380],
      "editorBracketMatch.border": colors.transparent,

      "editorGutter.modifiedBackground": colors.gutter.modified,
      "editorGutter.addedBackground": colors.gutter.added,
      "editorGutter.deletedBackground": colors.gutter.deleted,

      "diffEditor.insertedTextBackground": colors.background.addedDiff,
      "diffEditor.removedTextBackground": colors.background.removedDiff,

      "scrollbar.shadow": colors.transparent,
      "scrollbarSlider.background": colors.background.scrollbar.base,
      "scrollbarSlider.hoverBackground": colors.background.scrollbar.hover,
      "scrollbarSlider.activeBackground": colors.background.scrollbar.active,
      "editorOverviewRuler.border": colors.neutral[75],

      "panel.background": colors.neutral[125],
      "panel.border": colors.neutral[75],
      "panelTitle.activeBorder": colors.neutral[1000],
      "panelTitle.activeForeground": workbenchForeground,
      "panelTitle.inactiveForeground": colors.neutral[620],
      "panelInput.border": colors.neutral[190],

      "terminal.foreground": colors.neutral[840],

      "gitDecoration.addedResourceForeground": colors.semantic.addedResource,
      "gitDecoration.modifiedResourceForeground":
        colors.semantic.modifiedResource,
      "gitDecoration.deletedResourceForeground":
        colors.semantic.deletedResource,
      "gitDecoration.untrackedResourceForeground":
        colors.semantic.untrackedResource,
      "gitDecoration.ignoredResourceForeground":
        colors.semantic.ignoredResource,
      "gitDecoration.conflictingResourceForeground":
        colors.semantic.conflictingResource,
      "gitDecoration.submoduleResourceForeground":
        colors.semantic.ignoredResource,

      "debugToolBar.background": colors.background.debugToolBar,

      "peekViewEditor.matchHighlightBackground":
        colors.background.matchHighlight,
      "peekViewResult.matchHighlightBackground":
        colors.background.matchHighlight,
      "peekViewEditor.background": colors.neutral[125],
      "peekViewResult.background": colors.neutral[125],

      "settings.headerForeground": workbenchForeground,
      "settings.modifiedItemIndicator": colors.accent,
      "welcomePage.buttonBackground": colors.neutral[190],
      "welcomePage.buttonHoverBackground": colors.neutral[310],

      "editorError.foreground": colors.semantic.lintError,
      "editorWarning.foreground": colors.semantic.lintWarning,
      "editorInfo.foreground": colors.semantic.lintInfo,
    },
    semanticHighlighting: true,
    tokenColors: [
      {
        scope: ["comment", "punctuation.definition.comment", "string.comment"],
        settings: {
          foreground: colors.syntax.comment,
        },
      },
      {
        scope: [
          "constant",
          "entity.name.constant",
          "variable.other.constant",
          "variable.language",
        ],
        settings: {
          foreground: colors.accent,
        },
      },
      {
        scope: ["entity", "entity.name"],
        settings: {
          foreground: colors.syntax.entity,
        },
      },
      {
        scope: "variable.parameter.function",
        settings: {
          foreground: editorForeground,
        },
      },
      {
        scope: "entity.name.tag",
        settings: {
          foreground: colors.syntax.regexp,
        },
      },
      {
        scope: "keyword",
        settings: {
          foreground: colors.syntax.keyword,
        },
      },
      {
        scope: ["storage", "storage.type"],
        settings: {
          foreground: colors.syntax.keyword,
        },
      },
      {
        scope: [
          "storage.modifier.package",
          "storage.modifier.import",
          "storage.type.java",
        ],
        settings: {
          foreground: editorForeground,
        },
      },
      {
        scope: [
          "string",
          "punctuation.definition.string",
          "string punctuation.section.embedded source",
        ],
        settings: {
          foreground: colors.syntax.string,
        },
      },
      {
        scope: "support",
        settings: {
          foreground: colors.syntax.support,
        },
      },
      {
        scope: "meta.property-name",
        settings: {
          foreground: colors.syntax.support,
        },
      },
      {
        scope: "variable",
        settings: {
          foreground: colors.syntax.variable,
        },
      },
      {
        scope: "variable.other",
        settings: {
          foreground: editorForeground,
        },
      },
      {
        scope: "invalid.broken",
        settings: {
          fontStyle: "italic",
          foreground: colors.syntax.deleted,
        },
      },
      {
        scope: "invalid.deprecated",
        settings: {
          fontStyle: "italic",
          foreground: colors.syntax.deleted,
        },
      },
      {
        scope: "invalid.illegal",
        settings: {
          fontStyle: "italic",
          foreground: colors.syntax.deleted,
        },
      },
      {
        scope: "invalid.unimplemented",
        settings: {
          fontStyle: "italic",
          foreground: colors.syntax.deleted,
        },
      },
      {
        scope: "carriage-return",
        settings: {
          fontStyle: "italic underline",
          background: colors.syntax.keyword,
          foreground: colors.neutral[150],
          content: "^M",
        },
      },
      {
        scope: "message.error",
        settings: {
          foreground: colors.syntax.deleted,
        },
      },
      {
        scope: "string source",
        settings: {
          foreground: editorForeground,
        },
      },
      {
        scope: "string variable",
        settings: {
          foreground: colors.syntax.support,
        },
      },
      {
        scope: ["source.regexp", "string.regexp"],
        settings: {
          foreground: colors.neutral[1000],
        },
      },
      {
        scope: [
          "string.regexp.character-class",
          "string.regexp constant.character.escape",
          "string.regexp source.ruby.embedded",
          "string.regexp string.regexp.arbitrary-repitition",
        ],
        settings: {
          foreground: colors.neutral[1000],
        },
      },
      {
        scope: "string.regexp constant.character.escape",
        settings: {
          fontStyle: "bold",
          foreground: colors.syntax.regexp,
        },
      },
      {
        scope: "support.constant",
        settings: {
          foreground: colors.syntax.support,
        },
      },
      {
        scope: "support.variable",
        settings: {
          foreground: colors.syntax.support,
        },
      },
      {
        scope: "meta.module-reference",
        settings: {
          foreground: colors.syntax.support,
        },
      },
      {
        scope: "punctuation.definition.list.begin.markdown",
        settings: {
          foreground: colors.syntax.variable,
        },
      },
      {
        scope: ["markup.heading", "markup.heading entity.name"],
        settings: {
          fontStyle: "bold",
          foreground: colors.syntax.support,
        },
      },
      {
        scope: "markup.quote",
        settings: {
          foreground: colors.syntax.regexp,
        },
      },
      {
        scope: "markup.italic",
        settings: {
          fontStyle: "italic",
          foreground: editorForeground,
        },
      },
      {
        scope: "markup.bold",
        settings: {
          fontStyle: "bold",
          foreground: editorForeground,
        },
      },
      {
        scope: "markup.raw",
        settings: {
          foreground: colors.syntax.support,
        },
      },
      {
        scope: [
          "markup.deleted",
          "meta.diff.header.from-file",
          "punctuation.definition.deleted",
        ],
        settings: {
          background: colors.background.deleted,
          foreground: colors.syntax.deleted,
        },
      },
      {
        scope: [
          "markup.inserted",
          "meta.diff.header.to-file",
          "punctuation.definition.inserted",
        ],
        settings: {
          background: colors.background.added,
          foreground: colors.semantic.addedResource,
        },
      },
      {
        scope: ["markup.changed", "punctuation.definition.changed"],
        settings: {
          background: colors.background.modified,
          foreground: colors.semantic.modifiedResource,
        },
      },
      {
        scope: ["markup.ignored", "markup.untracked"],
        settings: {
          foreground: colors.neutral[190],
          background: colors.accent,
        },
      },
      {
        scope: "meta.diff.range",
        settings: {
          foreground: colors.syntax.entity,
          fontStyle: "bold",
        },
      },
      {
        scope: "meta.diff.header",
        settings: {
          foreground: colors.syntax.support,
        },
      },
      {
        scope: "meta.separator",
        settings: {
          fontStyle: "bold",
          foreground: colors.syntax.support,
        },
      },
      {
        scope: "meta.output",
        settings: {
          foreground: colors.syntax.support,
        },
      },
      {
        scope: [
          "brackethighlighter.tag",
          "brackethighlighter.curly",
          "brackethighlighter.round",
          "brackethighlighter.square",
          "brackethighlighter.angle",
          "brackethighlighter.quote",
        ],
        settings: {
          foreground: colors.neutral[840],
        },
      },
      {
        scope: "brackethighlighter.unmatched",
        settings: {
          foreground: colors.syntax.deleted,
        },
      },
      {
        scope: ["constant.other.reference.link", "string.other.link"],
        settings: {
          foreground: colors.neutral[1000],
          fontStyle: "underline",
        },
      },
    ],
  };
}
