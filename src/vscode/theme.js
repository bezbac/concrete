const colors = require("../colors");

function getTheme({ name }) {
  const workbenchForeground = colors.base.text;
  const editorForeground = colors.base.text;

  return {
    name: name,
    colors: {
      focusBorder: colors.transparent,
      foreground: colors.base.text,
      descriptionForeground: colors.base.soft,
      errorForeground: colors.semantic.error,

      "widget.shadow": colors.base.lowered,

      "textLink.foreground": colors.accent,
      "textLink.activeForeground": colors.base.sharp,
      "textBlockQuote.background": colors.base.background,
      "textBlockQuote.border": colors.base.muted,
      "textCodeBlock.background": colors.base.elevated,
      "textPreformat.foreground": colors.base.text,
      "textSeparator.foreground": colors.base.lush,

      "button.background": colors.background.activeSelection,
      "button.foreground": colors.base.sharp,
      "button.hoverBackground": colors.accent,

      "checkbox.background": colors.base.muted,
      "checkbox.border": colors.base.black,

      "dropdown.background": colors.base.elevated,
      "dropdown.border": colors.base.black,
      "dropdown.foreground": workbenchForeground,
      "dropdown.listBackground": colors.base.background,

      "input.background": colors.base.background,
      "input.border": colors.base.background,
      "input.foreground": workbenchForeground,
      "input.placeholderForeground": colors.base.soft,

      "badge.foreground": colors.base.sharp,
      "badge.background": colors.background.badge,

      "progressBar.background": colors.accent,

      "titleBar.activeForeground": workbenchForeground,
      "titleBar.activeBackground": colors.base.background,
      "titleBar.inactiveForeground": colors.base.soft,
      "titleBar.inactiveBackground": colors.base.lowered,
      "titleBar.border": colors.base.black,

      "activityBar.foreground": workbenchForeground,
      "activityBar.inactiveForeground": colors.syntax.comment,
      "activityBar.background": colors.base.background,
      "activityBarBadge.foreground": colors.base.sharp,
      "activityBarBadge.background": colors.background.badge,
      "activityBar.activeBorder": colors.base.sharp,
      "activityBar.border": colors.base.black,

      "sideBar.foreground": colors.base.text,
      "sideBar.background": colors.base.lowered,
      "sideBar.border": colors.base.black,
      "sideBarTitle.foreground": workbenchForeground,
      "sideBarSectionHeader.foreground": workbenchForeground,
      "sideBarSectionHeader.background": colors.base.lowered,
      "sideBarSectionHeader.border": colors.base.black,

      "list.hoverForeground": workbenchForeground,
      "list.inactiveSelectionForeground": workbenchForeground,
      "list.activeSelectionForeground": workbenchForeground,
      "list.hoverBackground": colors.base.elevated,
      "list.inactiveSelectionBackground": colors.base.elevated,
      "list.activeSelectionBackground": colors.background.activeSelection,
      "list.inactiveFocusBackground": colors.background.selection,
      "list.focusBackground": colors.background.activeSelection,

      "tree.indentGuidesStroke": colors.base.elevated,

      "notificationCenterHeader.foreground": colors.base.soft,
      "notificationCenterHeader.background": colors.base.background,
      "notifications.foreground": workbenchForeground,
      "notifications.background": colors.base.elevated,
      "notifications.border": colors.base.black,
      "notificationsErrorIcon.foreground": colors.gutter.deleted,
      "notificationsWarningIcon.foreground": colors.changedForeground,
      "notificationsInfoIcon.foreground": colors.syntax.comment,

      "pickerGroup.border": colors.base.muted,
      "pickerGroup.foreground": workbenchForeground,
      "quickInput.background": colors.base.lowered,
      "quickInput.foreground": workbenchForeground,

      "statusBar.foreground": colors.base.text,
      "statusBar.background": colors.base.lowered,
      "statusBar.border": colors.base.black,
      "statusBar.noFolderBackground": colors.base.background,
      "statusBar.debuggingBackground": colors.base.sharp,
      "statusBar.debuggingForeground": colors.base.sharp,
      "statusBarItem.prominentBackground": colors.transparent,

      "editorGroupHeader.tabsBackground": colors.base.lowered,
      "editorGroupHeader.tabsBorder": colors.base.black,
      "editorGroup.border": colors.base.black,

      "tab.activeForeground": workbenchForeground,
      "tab.inactiveForeground": colors.base.soft,
      "tab.inactiveBackground": colors.base.lowered,
      "tab.activeBackground": colors.base.background,
      "tab.hoverBackground": colors.base.background,
      "tab.unfocusedHoverBackground": colors.base.background,
      "tab.border": colors.base.black,
      "tab.unfocusedActiveBorderTop": colors.base.black,
      "tab.activeBorder": colors.base.background,
      "tab.unfocusedActiveBorder": colors.base.background,
      "tab.activeBorderTop": colors.base.sharp,

      "breadcrumb.foreground": colors.base.soft,
      "breadcrumb.focusForeground": workbenchForeground,
      "breadcrumb.activeSelectionForeground": colors.base.text,
      "breadcrumbPicker.background": colors.base.elevated,

      "editor.foreground": editorForeground,
      "editor.background": colors.base.background,
      "editorWidget.background": colors.base.lowered,
      "editor.foldBackground": colors.base.lowered,
      "editor.lineHighlightBackground": colors.base.elevated,
      "editorLineNumber.foreground": colors.base.muted,
      "editorLineNumber.activeForeground": editorForeground,
      "editorIndentGuide.background": colors.base.elevated,
      "editorIndentGuide.activeBackground": colors.base.muted,
      "editorWhitespace.foreground": colors.base.muted,
      "editorCursor.foreground": colors.base.sharp,

      "editor.findMatchBackground": colors.background.findMatch,
      "editor.findMatchHighlightBackground":
        colors.background.findMatchHighlight,
      "editor.inactiveSelectionBackground": colors.background.inactiveSelection,
      "editor.selectionBackground": colors.background.selection,
      "editor.selectionHighlightBackground": colors.base.lush,
      "editor.selectionHighlightBorder": colors.transparent,
      "editor.wordHighlightBackground": colors.transparent,
      "editor.wordHighlightStrongBackground": colors.transparent,
      "editor.wordHighlightBorder": colors.base.text,
      "editor.wordHighlightStrongBorder": colors.base.text,
      "editorBracketMatch.background": colors.base.lush,
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
      "editorOverviewRuler.border": colors.base.black,

      "panel.background": colors.base.lowered,
      "panel.border": colors.base.black,
      "panelTitle.activeBorder": colors.base.sharp,
      "panelTitle.activeForeground": workbenchForeground,
      "panelTitle.inactiveForeground": colors.base.soft,
      "panelInput.border": colors.base.elevated,

      "terminal.foreground": colors.base.text,

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
      "peekViewEditor.background": colors.base.lowered,
      "peekViewResult.background": colors.base.lowered,

      "settings.headerForeground": workbenchForeground,
      "settings.modifiedItemIndicator": colors.accent,
      "welcomePage.buttonBackground": colors.base.elevated,
      "welcomePage.buttonHoverBackground": colors.base.muted,

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
          foreground: colors.base.background,
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
          foreground: colors.base.sharp,
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
          foreground: colors.base.sharp,
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
          foreground: colors.base.elevated,
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
          foreground: colors.base.text,
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
          foreground: colors.base.sharp,
          fontStyle: "underline",
        },
      },
    ],
  };
}

module.exports = getTheme;
