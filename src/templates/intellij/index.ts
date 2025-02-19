import { ThemeGenerator } from "../../types";
import path from "path";
import fsPromises from "fs/promises";
import fs from "fs";
import { Colors } from "../../colors";
import { ensureDir } from "../../util/filesystem";
import archiver from "archiver";

export const generate: ThemeGenerator = async ({
  colors,
  baseOutputDirectory,
}) => {
  const outputDirectory = path.join(baseOutputDirectory, "intellij");

  const templateDirectory = path.join(__dirname, "./template");

  await fsPromises.cp(templateDirectory, outputDirectory, { recursive: true });

  await ensureDir(path.join(outputDirectory, "./resources/theme"));

  // Create UI theme
  await fsPromises.writeFile(
    path.join(outputDirectory, "./resources/theme/concrete.theme.json"),
    createUiTheme(colors)
  );

  //  Create syntax theme
  await fsPromises.writeFile(
    path.join(outputDirectory, "./resources/theme/concrete.xml"),
    createSyntaxTheme(colors)
  );

  // Create a zip file in the output directory
  await new Promise<void>((resolve, reject) => {
    const output = fs.createWriteStream(
      path.join(baseOutputDirectory, "/intellij.zip")
    );

    const archive = archiver("zip", {
      zlib: { level: 9 },
    });

    output.on("close", function () {
      resolve();
    });

    archive.on("warning", function (err) {
      if (err.code === "ENOENT") {
        console.warn(err);
      } else {
        reject(err);
      }
    });

    archive.on("error", function (err) {
      reject(err);
    });

    archive.pipe(output);

    archive.directory(path.join(outputDirectory, "resources"), "resources");

    archive.finalize();
  });
};

function createUiTheme(colors: Colors) {
  return JSON.stringify(
    {
      name: "Concrete",
      dark: true,
      author: "Ben Bachem",
      editorScheme: "/concrete.xml",
      ui: {
        "*": {
          background: colors.neutral[150],
          foreground: colors.neutral[840],
          infoForeground: colors.neutral[620],
          errorForeground: colors.semantic.error,
          selectionBackground: {
            "os.default": colors.background.selection,
            "os.windows": colors.background.selection,
            "os.mac": colors.background.selection,
          },
          selectionForeground: {
            "os.default": "selectionForeground",
            "os.windows": "selectionForeground",
            "os.mac": "selectionForeground",
          },
          selectionInactiveBackground: colors.background.inactiveSelection,
          selectionBackgroundInactive: colors.background.inactiveSelection,
          disabledBackground: "backgroundColor",
          inactiveBackground: "backgroundColor",
          acceleratorForeground: "#E6E6E6",
          acceleratorSelectionForeground: "#E6E6E6",

          borderColor: "#333841",
          disabledBorderColor: "#2d3137",
          focusColor: "backgroundColor",
          focusedBorderColor: "accentColor",
          separatorColor: "#32363c",
        },
        ActionButton: {
          hoverBackground: "#3d424b",
          hoverBorderColor: "#3d424b",
          pressedBackground: "#3f444d",
          pressedBorderColor: "#3f444d",
        },
        "BookmarkIcon.background": "#d9a343",
        BookmarkMnemonicAssigned: {
          foreground: "#ffffff",
          background: "#4d78cc",
          borderColor: "#4d78cc",
        },
        BookmarkMnemonicAvailable: {
          borderColor: "borderColor",
          foreground: "#a0a7b4",
          background: "#3d424b",
        },
        BookmarkMnemonicCurrent: {
          borderColor: "accentColor",
          foreground: "#a0a7b4",
          background: "#323844",
        },
        BookmarkMnemonicIcon: {
          foreground: "#a0a7b4",
          background: "#3d424b",
          borderColor: "accentColor",
        },
        Button: {
          foreground: "#a0a7b4",
          startBackground: "#3d424b",
          endBackground: "#3d424b",
          startBorderColor: "#464c55",
          endBorderColor: "#464c55",
          shadowColor: "backgroundColor",
          focusedBorderColor: "#646a73",
          default: {
            foreground: "#ffffff",
            startBackground: "accentColor",
            endBackground: "accentColor",
            startBorderColor: "accentColor",
            endBorderColor: "accentColor",
            focusedBorderColor: "#4269b9",
            focusColor: "#4269b9",
          },
        },
        Borders: {
          color: "#333841",
          ContrastBorderColor: "#333841",
        },
        ComboBox: {
          nonEditableBackground: "#333841",
          background: "#333841",
          selectionBackground: "#4d78cc",
          ArrowButton: {
            iconColor: "#abb2bf",
            disabledIconColor: "#2c313a",
            nonEditableBackground: "#333841",
          },
        },
        "ComboPopup.border": "1,1,1,1,2d3137",
        CompletionPopup: {
          background: "#3d424b",
          selectionBackground: "#2c313a",
          matchForeground: "accentColor",
        },
        ComplexPopup: {
          Header: {
            background: "backgroundColor",
          },
        },
        Component: {
          errorFocusColor: "#802d43",
          inactiveErrorFocusColor: "#522530",
          warningFocusColor: "#8c812b",
          inactiveWarningFocusColor: "#47441f",
        },
        Counter: {
          background: "#3d424b",
          foreground: "#abb2bf",
        },
        DefaultTabs: {
          underlineColor: "accentColor",
          inactiveUnderlineColor: "#4269b9",
          hoverBackground: "#323844",
        },
        DragAndDrop: {
          areaForeground: "#abb2bf",
          areaBackground: "#323844",
          areaBorderColor: "#333841",
        },
        Editor: {
          background: "#282c34",
          foreground: "#abb2bf",
          SearchField: {
            background: "#282c34",
          },
          shortcutForeground: "accentColor",
          ToolTip: {
            background: "#323844",
          },
        },
        "EditorPane.inactiveBackground": "#282c34",
        EditorTabs: {
          underlinedTabBackground: "#3d424b",
        },
        FileColor: {
          Yellow: "#3d3026",
          Green: "#293a24",
          Blue: "#24354f",
          Violet: "#2d1942",
          Orange: "#3d3026",
          Rose: "#3d1e2b",
        },
        GotItTooltip: {
          foreground: "#abb2bf",
          background: "#3d424b",
          borderColor: "#53565f",
          linkForeground: "#6494ed",
          shortcutForeground: "infoForeground",
        },
        Label: {
          infoForeground: "infoForeground",
          successForeground: "#89ca78",
        },
        Lesson: {
          "Tooltip.background": "#3d424b",
          "Tooltip.spanBackground": "accentColor",
          "Tooltip.foreground": "#ffffff",
        },
        Link: {
          activeForeground: "#6494ed",
          hoverForeground: "#6494ed",
          pressedForeground: "#6494ed",
          visitedForeground: "#6494ed",
        },
        List: {
          selectionBackground: "#4d78cc",
          selectionForeground: "#ffffff",
        },
        MainToolbar: {
          inactiveBackground: "#282c34",
          background: "backgroundColor",
          Dropdown: {
            hoverBackground: "#3d424b",
          },
        },
        MemoryIndicator: {
          allocatedBackground: "#304676",
          usedBackground: "#3a5a9c",
        },
        Notification: {
          background: "notificationBackground",
          borderColor: "#53565f",
          errorForeground: "#abb2bf",
          errorBackground: "#4d232e",
          errorBorderColor: "#692746",
          MoreButton: {
            background: "#2f343c",
            innerBorderColor: "#53565f",
          },
          ToolWindow: {
            informativeForeground: "#abb2bf",
            informativeBackground: "#2e4280",
            informativeBorderColor: "#252555",
            warningForeground: "#abb2bf",
            warningBackground: "#735822",
            warningBorderColor: "#5f4422",
            errorForeground: "#abb2bf",
            errorBackground: "#802d43",
            errorBorderColor: "#552029",
          },
        },
        "NotificationsToolwindow.newNotification.background":
          "notificationBackground",
        "NotificationsToolwindow.newNotification.hoverBackground": "#3d424b",
        "NotificationsToolwindow.Notification.hoverBackground": "#3d424b",
        "Panel.background": "backgroundColor",
        ParameterInfo: {
          background: "#3d424b",
          foreground: "#abb2bf",
          infoForeground: "#5c6370",
          currentParameterForeground: "#ffffff",
        },
        Plugins: {
          background: "backgroundColor",
          disabledForeground: "#5c6370",
          hoverBackground: "#323844",
          lightSelectionBackground: "#323844",
          tagBackground: "#414855",
          tagForeground: "#abb2bf",
          Button: {
            installForeground: "accentColor",
            installBorderColor: "accentColor",
            installFillForeground: "#ffffff",
            installFillBackground: "accentColor",
            updateForeground: "#ffffff",
            updateBackground: "accentColor",
            updateBorderColor: "accentColor",
          },
          SearchField: {
            background: "#282c34",
            borderColor: "#1b1d21",
          },
          "SectionHeader.background": "#414855",
          Tab: {
            selectedForeground: "#abb2bf",
            selectedBackground: "#323844",
            hoverBackground: "#323844",
          },
        },
        Popup: {
          background: "#282c34",
          paintBorder: false,
          borderColor: "#21252b",
          "Toolbar.borderColor": "#3d424b",
          "Header.activeBackground": "#414855",
          "Header.inactiveBackground": "#2c313a",
          Advertiser: {
            foreground: "#5c6370",
            borderColor: "#2d3137",
          },
        },
        ProgressBar: {
          trackColor: "#1D1D26",
          progressColor: "accentColor",
          indeterminateStartColor: "#313469",
          indeterminateEndColor: "accentColor",
          failedColor: colors.background.deleted,
          failedEndColor: colors.gutter.deleted,
          passedColor: colors.background.added,
          passedEndColor: colors.gutter.added,
        },
        RunWidget: {
          foreground: "#eef3ff",
          separatorColor: "#eef3ff",
          background: "accentColor",
        },
        SearchEverywhere: {
          "Advertiser.foreground": "#5c6370",
          "Header.background": "backgroundColor",
          SearchField: {
            background: "#282c34",
            borderColor: "#1b1d21",
          },
          Tab: {
            selectedForeground: "#abb2bf",
            selectedBackground: "#323844",
          },
        },
        SearchMatch: {
          startBackground: "accentColor",
          endBackground: "accentColor",
        },
        "SidePanel.background": "backgroundColor",
        SpeedSearch: {
          foreground: "#abb2bf",
          borderColor: "#3d424b",
          background: "#3d424b",
          errorForeground: "#e06c75",
        },
        "Settings.Spotlight.borderColor": "accentColor",
        "StatusBar.background": "baseBackground",
        TabbedPane: {
          underlineColor: "accentColor",
          contentAreaColor: "#323844",
          hoverColor: "#323844",
        },
        Table: {
          background: "#282c34",
          stripeColor: "#2c313a",
          selectionForeground: "#ffffff",
          foreground: "#abb2bf",
          dropLineColor: "#abb2bf",
          focusCellForeground: "#abb2bf",
          gridColor: "#5c6370",
          lightSelectionInactiveForeground: "#abb2bf",
          lightSelectionForeground: "#abb2bf",
          selectionBackground: "#3d424b",
          selectionInactiveForeground: "#abb2bf",
          lightSelectionBackground: "#414855",
          lightSelectionInactiveBackground: "#323844",
        },
        "Tag.background": "#3d424b",
        TextArea: {
          background: "#282c34",
          selectionBackground: "#414855",
        },
        TextField: {
          background: "#282c34",
          selectionBackground: "#414855",
        },
        ToggleButton: {
          onForeground: "#ffffff",
          onBackground: "accentColor",
          offForeground: "#9f9fa6",
          offBackground: "#3d424b",
          borderColor: "#3d424b",
          buttonColor: "#5c6370",
        },
        ToolTip: {
          background: "#3d424b",
        },
        ToolWindow: {
          background: "backgroundColor",
          Button: {
            hoverBackground: "#323844",
            selectedBackground: "#3d424b",
            selectedForeground: "#abb2bf",
          },
          Header: {
            background: "#414855",
            inactiveBackground: "#323844",
          },
          HeaderTab: {
            hoverBackground: "#323844",
            hoverInactiveBackground: "#3d424b",
            selectedBackground: "#323844",
            selectedInactiveBackground: "#3d424b",
          },
        },
        TitlePane: {
          infoForeground: "infoForeground",
          inactiveInfoForeground: "#5C6370",
        },
        Tree: {
          selectionBackground: "#4d78cc",
          modifiedItemForeground: "accentColor",
          selectionInactiveForeground: "foregroundColor",
          rowHeight: 20,
        },
        ValidationTooltip: {
          errorBackground: "#802d43",
          errorBorderColor: "#802d43",
          warningBackground: "#735822",
          warningBorderColor: "#5f4422",
        },
        VersionControl: {
          "Log.Commit": {
            currentBranchBackground: "#282c35",
            hoveredBackground: "#2c313c",
            unmatchedForeground: "#5c6370",
          },
          RefLabel: {
            backgroundBrightness: 0.3,
            backgroundBase: "#5c6370",
            foreground: "#abb2bf",
          },
        },
        WelcomeScreen: {
          borderColor: "borderColor",
          Projects: {
            "actions.background": "#323844",
            selectionInactiveBackground: "#2c313a",
          },
          separatorColor: "#2c313a",
          "SidePanel.background": "#282c34",
          "Details.background": "backgroundColor",
        },
      },
      icons: {
        ColorPalette: {
          "Checkbox.Background.Default.Dark": "#282c34",
          "Checkbox.Border.Default.Dark": "#414855",
          "Checkbox.Foreground.Selected.Dark": "#abb2bf",
          "Checkbox.Focus.Wide.Dark": "#568AF2",
          "Checkbox.Focus.Thin.Default.Dark": "#568AF2",
          "Checkbox.Focus.Thin.Selected.Dark": "#568AF2",
          "Checkbox.Background.Disabled.Dark": "#21252b",
          "Checkbox.Border.Disabled.Dark": "#2c313a",
          "Checkbox.Foreground.Disabled.Dark": "#5c6370",
        },
      },
    },
    null,
    2
  );
}

function createSyntaxTheme(colors: Colors) {
  return `
<scheme name="Concrete" version="1" parent_scheme="Darcula">
  <colors>
    <option name="GUTTER_BACKGROUND" value="262626" />
    <option name="INDENT_GUIDE" value="4F4E4F" />
    <option name="SELECTED_INDENT_GUIDE" value="4F4E4F" />
    <option name="WHITESPACES" value="4F4E4F" />
    <option name="SELECTION_BACKGROUND" value="29425F" />
    <option name="CARET_COLOR" value="FFFFFF" />
    <option name="LINE_NUMBERS_COLOR" value="D1D5DA" />
    <option name="CARET_ROW_COLOR" value="313031" />
    <option name="CONSOLE_BACKGROUND_KEY" value="262626" />
  </colors>
  <attributes>
    <option name="BAD_CHARACTER">
      <value>
        <option name="BACKGROUND" value="6E3B3B" />
      </value>
    </option>
    <option name="BREAKPOINT_ATTRIBUTES">
      <value>
        <option name="BACKGROUND" value="743D3D" />
      </value>
    </option>
    <option name="BUILDOUT.KEY">
      <value>
        <option name="FOREGROUND" value="D76496" />
      </value>
    </option>
    <option name="BUILDOUT.KEY_VALUE_SEPARATOR">
      <value>
        <option name="FOREGROUND" value="D76496" />
      </value>
    </option>
    <option name="BUILDOUT.LINE_COMMENT">
      <value>
        <option name="FOREGROUND" value="6A737D" />
      </value>
    </option>
    <option name="BUILDOUT.SECTION_NAME">
      <value>
        <option name="FOREGROUND" value="4091C9" />
      </value>
    </option>
    <option name="BUILDOUT.VALUE">
      <value>
        <option name="FOREGROUND" value="9ECBFF" />
      </value>
    </option>
    <option name="CLASS_NAME_ATTRIBUTES" baseAttributes="TEXT" />
    <option name="CLASS_REFERENCE">
      <value>
        <option name="FOREGROUND" value="B392F0" />
      </value>
    </option>
    <option name="COFFEESCRIPT.BAD_CHARACTER">
      <value>
        <option name="BACKGROUND" value="6E3B3B" />
      </value>
    </option>
    <option name="COFFEESCRIPT.BLOCK_COMMENT">
      <value>
        <option name="FOREGROUND" value="6A737D" />
      </value>
    </option>
    <option name="COFFEESCRIPT.BOOLEAN">
      <value>
        <option name="FOREGROUND" value="4091C9" />
      </value>
    </option>
    <option name="COFFEESCRIPT.BRACE" baseAttributes="DEFAULT_BRACES" />
    <option name="COFFEESCRIPT.BRACKET" baseAttributes="DEFAULT_BRACKETS" />
    <option name="COFFEESCRIPT.CLASS_NAME">
      <value>
        <option name="FOREGROUND" value="B392F0" />
      </value>
    </option>
    <option name="COFFEESCRIPT.COLON">
      <value>
        <option name="FOREGROUND" value="D76496" />
      </value>
    </option>
    <option name="COFFEESCRIPT.COMMA" baseAttributes="DEFAULT_COMMA" />
    <option name="COFFEESCRIPT.DOT" baseAttributes="DEFAULT_DOT" />
    <option name="COFFEESCRIPT.ESCAPE_SEQUENCE">
      <value>
        <option name="FOREGROUND" value="4091C9" />
      </value>
    </option>
    <option name="COFFEESCRIPT.EXISTENTIAL">
      <value>
        <option name="FOREGROUND" value="D76496" />
      </value>
    </option>
    <option name="COFFEESCRIPT.EXPRESSIONS_SUBSTITUTION_MARK" baseAttributes="TEXT" />
    <option name="COFFEESCRIPT.FUNCTION">
      <value>
        <option name="FOREGROUND" value="D76496" />
      </value>
    </option>
    <option name="COFFEESCRIPT.FUNCTION_BINDING">
      <value>
        <option name="FOREGROUND" value="D76496" />
      </value>
    </option>
    <option name="COFFEESCRIPT.FUNCTION_NAME">
      <value>
        <option name="FOREGROUND" value="B392F0" />
      </value>
    </option>
    <option name="COFFEESCRIPT.GLOBAL_VARIABLE">
      <value>
        <option name="FOREGROUND" value="D1D5DA" />
      </value>
    </option>
    <option name="COFFEESCRIPT.HEREDOC_CONTENT">
      <value>
        <option name="FOREGROUND" value="9ECBFF" />
      </value>
    </option>
    <option name="COFFEESCRIPT.HEREDOC_ID">
      <value>
        <option name="FOREGROUND" value="9ECBFF" />
      </value>
    </option>
    <option name="COFFEESCRIPT.HEREGEX_CONTENT">
      <value>
        <option name="FOREGROUND" value="FFFFFF" />
      </value>
    </option>
    <option name="COFFEESCRIPT.HEREGEX_ID">
      <value>
        <option name="FOREGROUND" value="FFFFFF" />
      </value>
    </option>
    <option name="COFFEESCRIPT.IDENTIFIER">
      <value>
        <option name="FOREGROUND" value="D1D5DA" />
      </value>
    </option>
    <option name="COFFEESCRIPT.JAVASCRIPT_CONTENT" baseAttributes="DEFAULT_STRING" />
    <option name="COFFEESCRIPT.JAVASCRIPT_ID">
      <value>
        <option name="FOREGROUND" value="9ECBFF" />
      </value>
    </option>
    <option name="COFFEESCRIPT.KEYWORD">
      <value>
        <option name="FOREGROUND" value="D76496" />
      </value>
    </option>
    <option name="COFFEESCRIPT.LINE_COMMENT">
      <value>
        <option name="FOREGROUND" value="6A737D" />
      </value>
    </option>
    <option name="COFFEESCRIPT.LOCAL_VARIABLE">
      <value>
        <option name="FOREGROUND" value="D1D5DA" />
      </value>
    </option>
    <option name="COFFEESCRIPT.NUMBER">
      <value>
        <option name="FOREGROUND" value="4091C9" />
      </value>
    </option>
    <option name="COFFEESCRIPT.OBJECT_KEY">
      <value>
        <option name="FOREGROUND" value="F1993B" />
      </value>
    </option>
    <option name="COFFEESCRIPT.OPERATIONS">
      <value>
        <option name="FOREGROUND" value="D76496" />
      </value>
    </option>
    <option name="COFFEESCRIPT.PARENTHESIS" baseAttributes="DEFAULT_PARENTHS" />
    <option name="COFFEESCRIPT.PROTOTYPE">
      <value>
        <option name="FOREGROUND" value="B392F0" />
      </value>
    </option>
    <option name="COFFEESCRIPT.RANGE" baseAttributes="DEFAULT_DOT" />
    <option name="COFFEESCRIPT.REGULAR_EXPRESSION_CONTENT">
      <value>
        <option name="FOREGROUND" value="FFFFFF" />
      </value>
    </option>
    <option name="COFFEESCRIPT.REGULAR_EXPRESSION_FLAG">
      <value>
        <option name="FOREGROUND" value="FFFFFF" />
      </value>
    </option>
    <option name="COFFEESCRIPT.REGULAR_EXPRESSION_ID">
      <value>
        <option name="FOREGROUND" value="FFFFFF" />
      </value>
    </option>
    <option name="COFFEESCRIPT.SEMICOLON" baseAttributes="DEFAULT_SEMICOLON" />
    <option name="COFFEESCRIPT.SPLAT" baseAttributes="DEFAULT_DOT" />
    <option name="COFFEESCRIPT.STRING">
      <value>
        <option name="FOREGROUND" value="9ECBFF" />
      </value>
    </option>
    <option name="COFFEESCRIPT.STRING_LITERAL">
      <value>
        <option name="FOREGROUND" value="9ECBFF" />
      </value>
    </option>
    <option name="COFFEESCRIPT.THIS">
      <value>
        <option name="FOREGROUND" value="4091C9" />
      </value>
    </option>
    <option name="CONDITIONALLY_NOT_COMPILED">
      <value>
        <option name="FOREGROUND" value="6A737D" />
      </value>
    </option>
    <option name="CONSOLE_BLUE_OUTPUT">
      <value>
        <option name="FOREGROUND" value="C7C7FF" />
      </value>
    </option>
    <option name="CONSOLE_CYAN_OUTPUT">
      <value>
        <option name="FOREGROUND" value="06B8B8" />
      </value>
    </option>
    <option name="CONSOLE_ERROR_OUTPUT">
      <value>
        <option name="FOREGROUND" value="FFB3B3" />
      </value>
    </option>
    <option name="CONSOLE_GRAY_OUTPUT">
      <value>
        <option name="FOREGROUND" value="A7A7A7" />
      </value>
    </option>
    <option name="CONSOLE_GREEN_OUTPUT">
      <value>
        <option name="FOREGROUND" value="68E868" />
      </value>
    </option>
    <option name="CONSOLE_MAGENTA_OUTPUT">
      <value>
        <option name="FOREGROUND" value="FF2EFF" />
      </value>
    </option>
    <option name="CONSOLE_NORMAL_OUTPUT">
      <value>
        <option name="FOREGROUND" value="FFFFFF" />
      </value>
    </option>
    <option name="CONSOLE_RED_OUTPUT">
      <value>
        <option name="FOREGROUND" value="FF6667" />
      </value>
    </option>
    <option name="CONSOLE_SYSTEM_OUTPUT">
      <value>
        <option name="FOREGROUND" value="E4E4FF" />
      </value>
    </option>
    <option name="CONSOLE_USER_INPUT">
      <value>
        <option name="FOREGROUND" value="6AE96A" />
        <option name="FONT_TYPE" value="2" />
      </value>
    </option>
    <option name="CONSOLE_YELLOW_OUTPUT">
      <value>
        <option name="FOREGROUND" value="754200" />
      </value>
    </option>
    <option name="CSS.COMMENT">
      <value>
        <option name="FOREGROUND" value="6A737D" />
      </value>
    </option>
    <option name="CSS.FUNCTION">
      <value>
        <option name="FOREGROUND" value="4091C9" />
      </value>
    </option>
    <option name="CSS.IDENT">
      <value>
        <option name="FOREGROUND" value="B392F0" />
      </value>
    </option>
    <option name="CSS.NUMBER">
      <value>
        <option name="FOREGROUND" value="4091C9" />
      </value>
    </option>
    <option name="CSS.PROPERTY_NAME">
      <value>
        <option name="FOREGROUND" value="4091C9" />
      </value>
    </option>
    <option name="CSS.PROPERTY_VALUE">
      <value>
        <option name="FOREGROUND" value="68E868" />
        <option name="FONT_TYPE" value="1" />
      </value>
    </option>
    <option name="CSS.TAG_NAME">
      <value>
        <option name="FOREGROUND" value="85E89D" />
      </value>
    </option>
    <option name="CSS.URL">
      <value>
        <option name="FOREGROUND" value="F1993B" />
      </value>
    </option>
    <option name="CUSTOM_INVALID_STRING_ESCAPE_ATTRIBUTES">
      <value>
        <option name="FOREGROUND" value="68E868" />
        <option name="BACKGROUND" value="481515" />
      </value>
    </option>
    <option name="CUSTOM_KEYWORD1_ATTRIBUTES">
      <value>
        <option name="FOREGROUND" value="E3E3FF" />
        <option name="FONT_TYPE" value="1" />
      </value>
    </option>
    <option name="CUSTOM_KEYWORD2_ATTRIBUTES">
      <value>
        <option name="FOREGROUND" value="FDA5FF" />
        <option name="FONT_TYPE" value="1" />
      </value>
    </option>
    <option name="CUSTOM_KEYWORD3_ATTRIBUTES">
      <value>
        <option name="FOREGROUND" value="71D7D7" />
        <option name="FONT_TYPE" value="1" />
      </value>
    </option>
    <option name="CUSTOM_KEYWORD4_ATTRIBUTES">
      <value>
        <option name="FOREGROUND" value="FFC2C2" />
        <option name="FONT_TYPE" value="1" />
      </value>
    </option>
    <option name="CUSTOM_LINE_COMMENT_ATTRIBUTES">
      <value>
        <option name="FOREGROUND" value="6A737D" />
        <option name="FONT_TYPE" value="2" />
      </value>
    </option>
    <option name="CUSTOM_MULTI_LINE_COMMENT_ATTRIBUTES">
      <value>
        <option name="FOREGROUND" value="6A737D" />
        <option name="FONT_TYPE" value="2" />
      </value>
    </option>
    <option name="CUSTOM_NUMBER_ATTRIBUTES">
      <value>
        <option name="FOREGROUND" value="4091C9" />
      </value>
    </option>
    <option name="CUSTOM_STRING_ATTRIBUTES">
      <value>
        <option name="FOREGROUND" value="9ECBFF" />
        <option name="FONT_TYPE" value="1" />
      </value>
    </option>
    <option name="CUSTOM_VALID_STRING_ESCAPE_ATTRIBUTES">
      <value>
        <option name="FOREGROUND" value="4091C9" />
        <option name="FONT_TYPE" value="1" />
      </value>
    </option>
    <option name="Clojure Atom">
      <value>
        <option name="FOREGROUND" value="D76496" />
      </value>
    </option>
    <option name="Clojure Character">
      <value>
        <option name="FOREGROUND" value="9ECBFF" />
      </value>
    </option>
    <option name="Clojure Keyword">
      <value>
        <option name="FOREGROUND" value="F1993B" />
      </value>
    </option>
    <option name="Clojure Line comment">
      <value>
        <option name="FOREGROUND" value="6A737D" />
      </value>
    </option>
    <option name="Clojure Literal">
      <value>
        <option name="FOREGROUND" value="F1993B" />
      </value>
    </option>
    <option name="Clojure Numbers">
      <value>
        <option name="FOREGROUND" value="4091C9" />
      </value>
    </option>
    <option name="Clojure Strings">
      <value>
        <option name="FOREGROUND" value="9ECBFF" />
      </value>
    </option>
    <option name="DEFAULT_ATTRIBUTE">
      <value>
        <option name="FOREGROUND" value="B392F0" />
      </value>
    </option>
    <option name="DEFAULT_BLOCK_COMMENT">
      <value>
        <option name="FOREGROUND" value="6A737D" />
      </value>
    </option>
    <option name="DEFAULT_BRACES" baseAttributes="TEXT" />
    <option name="DEFAULT_BRACKETS" baseAttributes="TEXT" />
    <option name="DEFAULT_CLASS_NAME">
      <value>
        <option name="FOREGROUND" value="B392F0" />
      </value>
    </option>
    <option name="DEFAULT_COMMA" baseAttributes="TEXT" />
    <option name="DEFAULT_CONSTANT">
      <value>
        <option name="FOREGROUND" value="4091C9" />
      </value>
    </option>
    <option name="DEFAULT_DOC_COMMENT">
      <value>
        <option name="FOREGROUND" value="6A737D" />
      </value>
    </option>
    <option name="DEFAULT_DOC_COMMENT_TAG">
      <value>
        <option name="FOREGROUND" value="6A737D" />
      </value>
    </option>
    <option name="DEFAULT_DOC_MARKUP">
      <value>
        <option name="FOREGROUND" value="6A737D" />
      </value>
    </option>
    <option name="DEFAULT_DOT" baseAttributes="TEXT" />
    <option name="DEFAULT_ENTITY">
      <value>
        <option name="FOREGROUND" value="4091C9" />
      </value>
    </option>
    <option name="DEFAULT_FUNCTION_CALL">
      <value>
        <option name="FOREGROUND" value="4091C9" />
      </value>
    </option>
    <option name="DEFAULT_FUNCTION_DECLARATION">
      <value>
        <option name="FOREGROUND" value="B392F0" />
      </value>
    </option>
    <option name="DEFAULT_GLOBAL_VARIABLE">
      <value>
        <option name="FOREGROUND" value="F1993B" />
        <option name="FONT_TYPE" value="2" />
      </value>
    </option>
    <option name="DEFAULT_IDENTIFIER">
      <value>
        <option name="FOREGROUND" value="B392F0" />
      </value>
    </option>
    <option name="DEFAULT_INSTANCE_FIELD">
      <value>
        <option name="FOREGROUND" value="F1993B" />
      </value>
    </option>
    <option name="DEFAULT_INSTANCE_METHOD">
      <value>
        <option name="FOREGROUND" value="B392F0" />
      </value>
    </option>
    <option name="DEFAULT_INTERFACE_NAME">
      <value>
        <option name="FOREGROUND" value="B392F0" />
      </value>
    </option>
    <option name="DEFAULT_INVALID_STRING_ESCAPE" baseAttributes="TEXT" />
    <option name="DEFAULT_KEYWORD">
      <value>
        <option name="FOREGROUND" value="D76496" />
      </value>
    </option>
    <option name="DEFAULT_LABEL">
      <value>
        <option name="FOREGROUND" value="B392F0" />
      </value>
    </option>
    <option name="DEFAULT_LINE_COMMENT">
      <value>
        <option name="FOREGROUND" value="6A737D" />
      </value>
    </option>
    <option name="DEFAULT_LOCAL_VARIABLE">
      <value>
        <option name="FOREGROUND" value="F1993B" />
      </value>
    </option>
    <option name="DEFAULT_METADATA" baseAttributes="TEXT" />
    <option name="DEFAULT_NUMBER">
      <value>
        <option name="FOREGROUND" value="4091C9" />
      </value>
    </option>
    <option name="DEFAULT_OPERATION_SIGN">
      <value>
        <option name="FOREGROUND" value="D76496" />
      </value>
    </option>
    <option name="DEFAULT_PARAMETER">
      <value>
        <option name="FOREGROUND" value="F1993B" />
      </value>
    </option>
    <option name="DEFAULT_PARENTHS" baseAttributes="TEXT" />
    <option name="DEFAULT_PREDEFINED_SYMBOL">
      <value>
        <option name="FOREGROUND" value="4091C9" />
      </value>
    </option>
    <option name="DEFAULT_SEMICOLON" baseAttributes="TEXT" />
    <option name="DEFAULT_STATIC_FIELD">
      <value>
        <option name="FOREGROUND" value="F1993B" />
        <option name="FONT_TYPE" value="2" />
      </value>
    </option>
    <option name="DEFAULT_STATIC_METHOD">
      <value>
        <option name="FOREGROUND" value="B392F0" />
      </value>
    </option>
    <option name="DEFAULT_STRING">
      <value>
        <option name="FOREGROUND" value="9ECBFF" />
      </value>
    </option>
    <option name="DEFAULT_TAG" baseAttributes="TEXT" />
    <option name="DEFAULT_TEMPLATE_LANGUAGE_COLOR" baseAttributes="TEXT" />
    <option name="DEFAULT_VALID_STRING_ESCAPE">
      <value>
        <option name="FOREGROUND" value="4091C9" />
      </value>
    </option>
    <option name="DEPRECATED_ATTRIBUTES">
      <value>
        <option name="EFFECT_TYPE" value="3" />
        <option name="EFFECT_COLOR" value="C0C0C0" />
      </value>
    </option>
    <option name="DJANGO_COMMENT">
      <value>
        <option name="FOREGROUND" value="6A737D" />
      </value>
    </option>
    <option name="DJANGO_FILTER">
      <value>
        <option name="FOREGROUND" value="4091C9" />
      </value>
    </option>
    <option name="DJANGO_ID">
      <value>
        <option name="FOREGROUND" value="B392F0" />
      </value>
    </option>
    <option name="DJANGO_KEYWORD">
      <value>
        <option name="FOREGROUND" value="D76496" />
      </value>
    </option>
    <option name="DJANGO_NUMBER">
      <value>
        <option name="FOREGROUND" value="4091C9" />
      </value>
    </option>
    <option name="DJANGO_STRING_LITERAL">
      <value>
        <option name="FOREGROUND" value="9ECBFF" />
      </value>
    </option>
    <option name="DJANGO_TAG_NAME">
      <value>
        <option name="FOREGROUND" value="85E89D" />
      </value>
    </option>
    <option name="DJANGO_TAG_START_END" baseAttributes="DEFAULT_BRACES" />
    <option name="DUPLICATE_FROM_SERVER">
      <value>
        <option name="BACKGROUND" value="30322B" />
      </value>
    </option>
    <option name="ENUM_CONST">
      <value>
        <option name="FOREGROUND" value="4091C9" />
      </value>
    </option>
    <option name="ERRORS_ATTRIBUTES">
      <value>
        <option name="EFFECT_TYPE" value="2" />
        <option name="EFFECT_COLOR" value="FF6667" />
        <option name="ERROR_STRIPE_COLOR" value="FF0000" />
      </value>
    </option>
    <option name="FOLLOWED_HYPERLINK_ATTRIBUTES">
      <value>
        <option name="FOREGROUND" value="C7C7FF" />
        <option name="BACKGROUND" value="171717" />
        <option name="FONT_TYPE" value="2" />
        <option name="EFFECT_TYPE" value="1" />
        <option name="EFFECT_COLOR" value="C7C7FF" />
      </value>
    </option>
    <option name="First symbol in list">
      <value>
        <option name="FOREGROUND" value="F1993B" />
        <option name="FONT_TYPE" value="1" />
      </value>
    </option>
    <option name="GENERIC_SERVER_ERROR_OR_WARNING">
      <value>
        <option name="EFFECT_TYPE" value="2" />
        <option name="EFFECT_COLOR" value="AA4E00" />
        <option name="ERROR_STRIPE_COLOR" value="F49810" />
      </value>
    </option>
    <option name="GHERKIN_COMMENT">
      <value>
        <option name="FOREGROUND" value="6A737D" />
      </value>
    </option>
    <option name="GHERKIN_KEYWORD">
      <value>
        <option name="FOREGROUND" value="D76496" />
      </value>
    </option>
    <option name="GHERKIN_OUTLINE_PARAMETER_SUBSTITUTION">
      <value>
        <option name="FOREGROUND" value="D1D5DA" />
      </value>
    </option>
    <option name="GHERKIN_PYSTRING">
      <value>
        <option name="FOREGROUND" value="9ECBFF" />
      </value>
    </option>
    <option name="GHERKIN_REGEXP_PARAMETER">
      <value>
        <option name="FOREGROUND" value="9ECBFF" />
      </value>
    </option>
    <option name="GHERKIN_TABLE_CELL" baseAttributes="GHERKIN_TEXT" />
    <option name="GHERKIN_TABLE_HEADER_CELL">
      <value>
        <option name="FOREGROUND" value="D1D5DA" />
      </value>
    </option>
    <option name="GHERKIN_TABLE_PIPE">
      <value>
        <option name="FOREGROUND" value="D76496" />
      </value>
    </option>
    <option name="GHERKIN_TAG">
      <value>
        <option name="FOREGROUND" value="D76496" />
      </value>
    </option>
    <option name="GHERKIN_TEXT" baseAttributes="TEXT" />
    <option name="GO_BLOCK_COMMENT">
      <value>
        <option name="FOREGROUND" value="6A737D" />
      </value>
    </option>
    <option name="GO_BUILTIN_CONSTANT">
      <value>
        <option name="FOREGROUND" value="4091C9" />
      </value>
    </option>
    <option name="GO_BUILTIN_FUNCTION_CALL">
      <value>
        <option name="FOREGROUND" value="4091C9" />
      </value>
    </option>
    <option name="GO_BUILTIN_TYPE_REFERENCE">
      <value>
        <option name="FOREGROUND" value="B392F0" />
      </value>
    </option>
    <option name="GO_BUILTIN_VARIABLE">
      <value>
        <option name="FOREGROUND" value="F1993B" />
        <option name="FONT_TYPE" value="2" />
      </value>
    </option>
    <option name="GO_EXPORTED_FUNCTION">
      <value>
        <option name="FOREGROUND" value="B392F0" />
      </value>
    </option>
    <option name="GO_EXPORTED_FUNCTION_CALL">
      <value>
        <option name="FOREGROUND" value="4091C9" />
      </value>
    </option>
    <option name="GO_KEYWORD">
      <value>
        <option name="FOREGROUND" value="D76496" />
      </value>
    </option>
    <option name="GO_LINE_COMMENT">
      <value>
        <option name="FOREGROUND" value="6A737D" />
      </value>
    </option>
    <option name="GO_LOCAL_CONSTANT">
      <value>
        <option name="FOREGROUND" value="4091C9" />
      </value>
    </option>
    <option name="GO_LOCAL_FUNCTION">
      <value>
        <option name="FOREGROUND" value="B392F0" />
      </value>
    </option>
    <option name="GO_LOCAL_FUNCTION_CALL">
      <value>
        <option name="FOREGROUND" value="4091C9" />
      </value>
    </option>
    <option name="GO_METHOD_RECEIVER">
      <value>
        <option name="FOREGROUND" value="F1993B" />
      </value>
    </option>
    <option name="GO_PACKAGE">
      <value>
        <option name="FOREGROUND" value="B392F0" />
      </value>
    </option>
    <option name="GO_PACKAGE_EXPORTED_CONSTANT">
      <value>
        <option name="FOREGROUND" value="4091C9" />
      </value>
    </option>
    <option name="GO_PACKAGE_LOCAL_CONSTANT">
      <value>
        <option name="FOREGROUND" value="4091C9" />
      </value>
    </option>
    <option name="GO_TYPE_REFERENCE">
      <value>
        <option name="FOREGROUND" value="B392F0" />
      </value>
    </option>
    <option name="GQL_ID">
      <value>
        <option name="FOREGROUND" value="4091C9" />
      </value>
    </option>
    <option name="GQL_INT_LITERAL">
      <value>
        <option name="FOREGROUND" value="4091C9" />
      </value>
    </option>
    <option name="GQL_KEYWORD">
      <value>
        <option name="FOREGROUND" value="D76496" />
      </value>
    </option>
    <option name="GQL_STRING_LITERAL">
      <value>
        <option name="FOREGROUND" value="9ECBFF" />
      </value>
    </option>
    <option name="HAML_CLASS">
      <value>
        <option name="FOREGROUND" value="85E89D" />
      </value>
    </option>
    <option name="HAML_COMMENT">
      <value>
        <option name="FOREGROUND" value="6A737D" />
      </value>
    </option>
    <option name="HAML_FILTER" baseAttributes="HAML_TEXT" />
    <option name="HAML_FILTER_CONTENT" baseAttributes="HAML_TEXT" />
    <option name="HAML_ID">
      <value>
        <option name="FOREGROUND" value="85E89D" />
      </value>
    </option>
    <option name="HAML_LINE_CONTINUATION" baseAttributes="HAML_TEXT" />
    <option name="HAML_PARENTHS" baseAttributes="DEFAULT_PARENTHS" />
    <option name="HAML_RUBY_CODE" baseAttributes="HAML_TEXT" />
    <option name="HAML_RUBY_START" baseAttributes="HAML_TEXT" />
    <option name="HAML_STRING">
      <value>
        <option name="FOREGROUND" value="9ECBFF" />
      </value>
    </option>
    <option name="HAML_STRING_INTERPOLATED">
      <value>
        <option name="FOREGROUND" value="9ECBFF" />
      </value>
    </option>
    <option name="HAML_TAG" baseAttributes="HAML_TEXT" />
    <option name="HAML_TAG_NAME">
      <value>
        <option name="FOREGROUND" value="85E89D" />
      </value>
    </option>
    <option name="HAML_TEXT" baseAttributes="TEXT" />
    <option name="HAML_WS_REMOVAL" baseAttributes="HAML_TEXT" />
    <option name="HAML_XHTML" baseAttributes="HAML_TEXT" />
    <option name="HTML_ATTRIBUTE_NAME">
      <value>
        <option name="FOREGROUND" value="B392F0" />
      </value>
    </option>
    <option name="HTML_ATTRIBUTE_VALUE">
      <value>
        <option name="FOREGROUND" value="9ECBFF" />
        <option name="FONT_TYPE" value="1" />
      </value>
    </option>
    <option name="HTML_COMMENT">
      <value>
        <option name="FOREGROUND" value="6A737D" />
      </value>
    </option>
    <option name="HTML_ENTITY_REFERENCE">
      <value>
        <option name="FOREGROUND" value="4091C9" />
        <option name="FONT_TYPE" value="1" />
      </value>
    </option>
    <option name="HTML_TAG" baseAttributes="XML_TAG" />
    <option name="HTML_TAG_NAME">
      <value>
        <option name="FOREGROUND" value="85E89D" />
      </value>
    </option>
    <option name="HYPERLINK_ATTRIBUTES">
      <value>
        <option name="FOREGROUND" value="C7C7FF" />
        <option name="FONT_TYPE" value="2" />
        <option name="EFFECT_TYPE" value="1" />
        <option name="EFFECT_COLOR" value="C7C7FF" />
      </value>
    </option>
    <option name="IDENTIFIER_UNDER_CARET_ATTRIBUTES">
      <value>
        <option name="BACKGROUND" value="3C3C57" />
        <option name="ERROR_STRIPE_COLOR" value="CCCCFF" />
      </value>
    </option>
    <option name="IMPLICIT_ANONYMOUS_CLASS_PARAMETER_ATTRIBUTES">
      <value>
        <option name="FOREGROUND" value="FDA5FF" />
      </value>
    </option>
    <option name="INFO_ATTRIBUTES">
      <value>
        <option name="EFFECT_TYPE" value="2" />
        <option name="EFFECT_COLOR" value="343434" />
        <option name="ERROR_STRIPE_COLOR" value="FFFFCC" />
      </value>
    </option>
    <option name="INJECTED_LANGUAGE_FRAGMENT">
      <value>
        <option name="BACKGROUND" value="273627" />
      </value>
    </option>
    <option name="INSTANCE_FIELD_ATTRIBUTES">
      <value>
        <option name="FOREGROUND" value="FDA5FF" />
        <option name="FONT_TYPE" value="1" />
      </value>
    </option>
    <option name="IVAR">
      <value>
        <option name="FOREGROUND" value="D1D5DA" />
      </value>
    </option>
    <option name="JADE_FILE_PATH">
      <value>
        <option name="FOREGROUND" value="9ECBFF" />
      </value>
    </option>
    <option name="JADE_FILTER_NAME">
      <value>
        <option name="FOREGROUND" value="B392F0" />
      </value>
    </option>
    <option name="JADE_JS_BLOCK">
      <value>
        <option name="FOREGROUND" value="B392F0" />
      </value>
    </option>
    <option name="JADE_STATEMENTS">
      <value>
        <option name="FOREGROUND" value="D76496" />
      </value>
    </option>
    <option name="JAVA_BLOCK_COMMENT">
      <value>
        <option name="FOREGROUND" value="6A737D" />
      </value>
    </option>
    <option name="JAVA_BRACES" baseAttributes="TEXT" />
    <option name="JAVA_BRACKETS" baseAttributes="TEXT" />
    <option name="JAVA_COMMA" baseAttributes="TEXT" />
    <option name="JAVA_DOC_COMMENT">
      <value>
        <option name="FOREGROUND" value="6A737D" />
      </value>
    </option>
    <option name="JAVA_DOC_MARKUP">
      <value>
        <option name="BACKGROUND" value="223F22" />
      </value>
    </option>
    <option name="JAVA_DOC_TAG">
      <value>
        <option name="FONT_TYPE" value="1" />
        <option name="EFFECT_TYPE" value="1" />
        <option name="EFFECT_COLOR" value="807F80" />
      </value>
    </option>
    <option name="JAVA_DOT" baseAttributes="TEXT" />
    <option name="JAVA_INVALID_STRING_ESCAPE">
      <value>
        <option name="FOREGROUND" value="68E868" />
        <option name="BACKGROUND" value="481515" />
      </value>
    </option>
    <option name="JAVA_KEYWORD">
      <value>
        <option name="FOREGROUND" value="D76496" />
      </value>
    </option>
    <option name="JAVA_LINE_COMMENT">
      <value>
        <option name="FOREGROUND" value="6A737D" />
      </value>
    </option>
    <option name="JAVA_NUMBER">
      <value>
        <option name="FOREGROUND" value="4091C9" />
      </value>
    </option>
    <option name="JAVA_OPERATION_SIGN">
      <value>
        <option name="FOREGROUND" value="D76496" />
      </value>
    </option>
    <option name="JAVA_PARENTH" baseAttributes="TEXT" />
    <option name="JAVA_SEMICOLON" baseAttributes="TEXT" />
    <option name="JAVA_STRING">
      <value>
        <option name="FOREGROUND" value="9ECBFF" />
      </value>
    </option>
    <option name="JAVA_VALID_STRING_ESCAPE">
      <value>
        <option name="FOREGROUND" value="4091C9" />
      </value>
    </option>
    <option name="JS.GLOBAL_VARIABLE">
      <value>
        <option name="FOREGROUND" value="F1993B" />
        <option name="FONT_TYPE" value="2" />
      </value>
    </option>
    <option name="JS.INSTANCE_MEMBER_FUNCTION">
      <value>
        <option name="FOREGROUND" value="B392F0" />
      </value>
    </option>
    <option name="JS.LOCAL_VARIABLE">
      <value>
        <option name="FOREGROUND" value="F1993B" />
      </value>
    </option>
    <option name="JS.PARAMETER">
      <value>
        <option name="FOREGROUND" value="F1993B" />
      </value>
    </option>
    <option name="JS.REGEXP">
      <value>
        <option name="FOREGROUND" value="FFFFFF" />
      </value>
    </option>
    <option name="LABEL">
      <value>
        <option name="FOREGROUND" value="D76496" />
      </value>
    </option>
    <option name="LESS_INJECTED_CODE" baseAttributes="TEXT" />
    <option name="LESS_JS_CODE_DELIM">
      <value>
        <option name="FOREGROUND" value="D1D5DA" />
      </value>
    </option>
    <option name="LESS_VARIABLE">
      <value>
        <option name="FOREGROUND" value="D1D5DA" />
      </value>
    </option>
    <option name="LOCAL_VARIABLE_ATTRIBUTES" baseAttributes="TEXT" />
    <option name="MACRONAME">
      <value>
        <option name="FOREGROUND" value="B392F0" />
      </value>
    </option>
    <option name="MACRO_PARAMETER" baseAttributes="TEXT" />
    <option name="MATCHED_BRACE_ATTRIBUTES">
      <value>
        <option name="BACKGROUND" value="3A6DA0" />
      </value>
    </option>
    <option name="NOT_USED_ELEMENT_ATTRIBUTES">
      <value>
        <option name="FOREGROUND" value="807F80" />
      </value>
    </option>
    <option name="OC.BADCHARACTER" baseAttributes="TEXT" />
    <option name="OC.BLOCK_COMMENT">
      <value>
        <option name="FOREGROUND" value="6A737D" />
      </value>
    </option>
    <option name="OC.BRACES" baseAttributes="OC.DOT" />
    <option name="OC.BRACKETS" baseAttributes="OC.DOT" />
    <option name="OC.COMMA" baseAttributes="OC.DOT" />
    <option name="OC.CPP_KEYWORD">
      <value>
        <option name="FOREGROUND" value="D76496" />
      </value>
    </option>
    <option name="OC.DIRECTIVE">
      <value>
        <option name="FOREGROUND" value="D76496" />
      </value>
    </option>
    <option name="OC.DOT" baseAttributes="TEXT" />
    <option name="OC.EXTERN_VARIABLE">
      <value>
        <option name="FOREGROUND" value="D1D5DA" />
      </value>
    </option>
    <option name="OC.GLOBAL_VARIABLE">
      <value>
        <option name="FOREGROUND" value="D1D5DA" />
      </value>
    </option>
    <option name="OC.KEYWORD">
      <value>
        <option name="FOREGROUND" value="D76496" />
      </value>
    </option>
    <option name="OC.LINE_COMMENT">
      <value>
        <option name="FOREGROUND" value="6A737D" />
      </value>
    </option>
    <option name="OC.LOCAL_VARIABLE">
      <value>
        <option name="FOREGROUND" value="D1D5DA" />
      </value>
    </option>
    <option name="OC.MESSAGE_ARGUMENT">
      <value>
        <option name="FOREGROUND" value="B392F0" />
      </value>
    </option>
    <option name="OC.METHOD_DECLARATION">
      <value>
        <option name="FOREGROUND" value="B392F0" />
      </value>
    </option>
    <option name="OC.NUMBER">
      <value>
        <option name="FOREGROUND" value="4091C9" />
      </value>
    </option>
    <option name="OC.OPERATION_SIGN" baseAttributes="OC.DOT" />
    <option name="OC.PARAMETER">
      <value>
        <option name="FOREGROUND" value="D1D5DA" />
      </value>
    </option>
    <option name="OC.PARENTHS" baseAttributes="OC.DOT" />
    <option name="OC.PROPERTY">
      <value>
        <option name="FOREGROUND" value="D1D5DA" />
      </value>
    </option>
    <option name="OC.SELFSUPERTHIS">
      <value>
        <option name="FOREGROUND" value="4091C9" />
      </value>
    </option>
    <option name="OC.SEMICOLON" baseAttributes="OC.DOT" />
    <option name="OC.STRING">
      <value>
        <option name="FOREGROUND" value="9ECBFF" />
      </value>
    </option>
    <option name="OC.STRUCT_FIELD">
      <value>
        <option name="FOREGROUND" value="4091C9" />
      </value>
    </option>
    <option name="OC_FORMAT_TOKEN">
      <value>
        <option name="FOREGROUND" value="9ECBFF" />
      </value>
    </option>
    <option name="PARAMETER_ATTRIBUTES" baseAttributes="TEXT" />
    <option name="PHP_PARAMETER">
      <value>
        <option name="FOREGROUND" value="F1993B" />
      </value>
    </option>
    <option name="PHP_VAR">
      <value>
        <option name="FOREGROUND" value="F1993B" />
      </value>
    </option>
    <option name="PROTOCOL_REFERENCE">
      <value>
        <option name="FOREGROUND" value="B392F0" />
      </value>
    </option>
    <option name="PUPPET_BAD_CHARACTER">
      <value>
        <option name="BACKGROUND" value="6E3B3B" />
      </value>
    </option>
    <option name="PUPPET_BLOCK_COMMENT">
      <value>
        <option name="FOREGROUND" value="6A737D" />
      </value>
    </option>
    <option name="PUPPET_BRACES" baseAttributes="DEFAULT_BRACES" />
    <option name="PUPPET_BRACKETS" baseAttributes="DEFAULT_BRACKETS" />
    <option name="PUPPET_CLASS">
      <value>
        <option name="FOREGROUND" value="B392F0" />
      </value>
    </option>
    <option name="PUPPET_COMMA" baseAttributes="DEFAULT_COMMA" />
    <option name="PUPPET_DOT" baseAttributes="DEFAULT_DOT" />
    <option name="PUPPET_ESCAPE_SEQUENCE">
      <value>
        <option name="FOREGROUND" value="4091C9" />
      </value>
    </option>
    <option name="PUPPET_KEYWORD">
      <value>
        <option name="FOREGROUND" value="D76496" />
      </value>
    </option>
    <option name="PUPPET_NUMBER">
      <value>
        <option name="FOREGROUND" value="4091C9" />
      </value>
    </option>
    <option name="PUPPET_OPERATION_SIGN">
      <value>
        <option name="FOREGROUND" value="D76496" />
      </value>
    </option>
    <option name="PUPPET_PARENTH" baseAttributes="DEFAULT_PARENTHS" />
    <option name="PUPPET_REGEX">
      <value>
        <option name="FOREGROUND" value="FFFFFF" />
      </value>
    </option>
    <option name="PUPPET_RESOURCE_REFERENCE" baseAttributes="TEXT" />
    <option name="PUPPET_SEMICOLON" baseAttributes="DEFAULT_SEMICOLON" />
    <option name="PUPPET_SQ_STRING">
      <value>
        <option name="FOREGROUND" value="9ECBFF" />
      </value>
    </option>
    <option name="PUPPET_STRING">
      <value>
        <option name="FOREGROUND" value="9ECBFF" />
      </value>
    </option>
    <option name="PUPPET_VARIABLE">
      <value>
        <option name="FOREGROUND" value="F1993B" />
      </value>
    </option>
    <option name="PUPPET_VARIABLE_INTERPOLATION">
      <value>
        <option name="FOREGROUND" value="9ECBFF" />
      </value>
    </option>
    <option name="PY.BRACES" baseAttributes="DEFAULT_BRACES" />
    <option name="PY.BRACKETS" baseAttributes="DEFAULT_BRACKETS" />
    <option name="PY.BUILTIN_NAME">
      <value>
        <option name="FOREGROUND" value="4091C9" />
      </value>
    </option>
    <option name="PY.CLASS_DEFINITION">
      <value>
        <option name="FOREGROUND" value="B392F0" />
      </value>
    </option>
    <option name="PY.COMMA" baseAttributes="DEFAULT_COMMA" />
    <option name="PY.DECORATOR">
      <value>
        <option name="FOREGROUND" value="B392F0" />
      </value>
    </option>
    <option name="PY.DOC_COMMENT">
      <value>
        <option name="FOREGROUND" value="6A737D" />
      </value>
    </option>
    <option name="PY.DOT" baseAttributes="DEFAULT_DOT" />
    <option name="PY.FUNC_DEFINITION">
      <value>
        <option name="FOREGROUND" value="B392F0" />
      </value>
    </option>
    <option name="PY.INVALID_STRING_ESCAPE" baseAttributes="DEFAULT_INVALID_STRING_ESCAPE" />
    <option name="PY.KEYWORD">
      <value>
        <option name="FOREGROUND" value="D76496" />
      </value>
    </option>
    <option name="PY.LINE_COMMENT">
      <value>
        <option name="FOREGROUND" value="6A737D" />
      </value>
    </option>
    <option name="PY.NUMBER">
      <value>
        <option name="FOREGROUND" value="4091C9" />
      </value>
    </option>
    <option name="PY.OPERATION_SIGN">
      <value>
        <option name="FOREGROUND" value="D76496" />
      </value>
    </option>
    <option name="PY.PARENTHS" baseAttributes="DEFAULT_PARENTHS" />
    <option name="PY.PREDEFINED_DEFINITION" baseAttributes="TEXT" />
    <option name="PY.PREDEFINED_USAGE">
      <value>
        <option name="FOREGROUND" value="4091C9" />
      </value>
    </option>
    <option name="PY.STRING">
      <value>
        <option name="FOREGROUND" value="9ECBFF" />
      </value>
    </option>
    <option name="PY.VALID_STRING_ESCAPE">
      <value>
        <option name="FOREGROUND" value="4091C9" />
      </value>
    </option>
    <option name="REST.BOLD">
      <value>
        <option name="FONT_TYPE" value="1" />
      </value>
    </option>
    <option name="REST.EXPLICIT">
      <value>
        <option name="FOREGROUND" value="D76496" />
      </value>
    </option>
    <option name="REST.FIELD">
      <value>
        <option name="FOREGROUND" value="D76496" />
      </value>
    </option>
    <option name="REST.FIXED">
      <value>
        <option name="BACKGROUND" value="48485F" />
      </value>
    </option>
    <option name="REST.INLINE">
      <value>
        <option name="BACKGROUND" value="273627" />
      </value>
    </option>
    <option name="REST.INTERPRETED">
      <value>
        <option name="BACKGROUND" value="4D5D3D" />
      </value>
    </option>
    <option name="REST.ITALIC">
      <value>
        <option name="FONT_TYPE" value="2" />
      </value>
    </option>
    <option name="REST.LINE_COMMENT">
      <value>
        <option name="FOREGROUND" value="6A737D" />
      </value>
    </option>
    <option name="REST.REF.NAME">
      <value>
        <option name="FOREGROUND" value="9ECBFF" />
      </value>
    </option>
    <option name="REST.SECTION.HEADER">
      <value>
        <option name="FOREGROUND" value="4091C9" />
      </value>
    </option>
    <option name="RHTML_COMMENT_ID">
      <value>
        <option name="FOREGROUND" value="6A737D" />
      </value>
    </option>
    <option name="RHTML_EXPRESSION_END_ID" baseAttributes="XML_TAG" />
    <option name="RHTML_EXPRESSION_START_ID" baseAttributes="XML_TAG" />
    <option name="RHTML_OMIT_NEW_LINE_ID" baseAttributes="XML_TAG" />
    <option name="RHTML_SCRIPTING_BACKGROUND_ID" baseAttributes="XML_TAG" />
    <option name="RHTML_SCRIPTLET_END_ID" baseAttributes="XML_TAG" />
    <option name="RHTML_SCRIPTLET_START_ID" baseAttributes="XML_TAG" />
    <option name="RUBY_BAD_CHARACTER" baseAttributes="TEXT" />
    <option name="RUBY_BRACKETS" baseAttributes="DEFAULT_BRACKETS" />
    <option name="RUBY_COLON" baseAttributes="DEFAULT_SEMICOLON" />
    <option name="RUBY_COMMA" baseAttributes="DEFAULT_COMMA" />
    <option name="RUBY_COMMENT">
      <value>
        <option name="FOREGROUND" value="6A737D" />
      </value>
    </option>
    <option name="RUBY_CONSTANT">
      <value>
        <option name="FOREGROUND" value="4091C9" />
      </value>
    </option>
    <option name="RUBY_CONSTANT_DECLARATION">
      <value>
        <option name="FOREGROUND" value="B392F0" />
      </value>
    </option>
    <option name="RUBY_CVAR">
      <value>
        <option name="FOREGROUND" value="D1D5DA" />
      </value>
    </option>
    <option name="RUBY_DOT" baseAttributes="DEFAULT_DOT" />
    <option name="RUBY_ESCAPE_SEQUENCE">
      <value>
        <option name="FOREGROUND" value="4091C9" />
      </value>
    </option>
    <option name="RUBY_EXPR_IN_STRING">
      <value>
        <option name="FOREGROUND" value="9ECBFF" />
      </value>
    </option>
    <option name="RUBY_GVAR">
      <value>
        <option name="FOREGROUND" value="D1D5DA" />
      </value>
    </option>
    <option name="RUBY_HASH_ASSOC">
      <value>
        <option name="FOREGROUND" value="D76496" />
      </value>
    </option>
    <option name="RUBY_HEREDOC_CONTENT">
      <value>
        <option name="FOREGROUND" value="9ECBFF" />
      </value>
    </option>
    <option name="RUBY_HEREDOC_ID">
      <value>
        <option name="FOREGROUND" value="9ECBFF" />
      </value>
    </option>
    <option name="RUBY_IDENTIFIER">
      <value>
        <option name="FOREGROUND" value="F1993B" />
      </value>
    </option>
    <option name="RUBY_INTERPOLATED_STRING">
      <value>
        <option name="FOREGROUND" value="9ECBFF" />
      </value>
    </option>
    <option name="RUBY_INVALID_ESCAPE_SEQUENCE" baseAttributes="DEFAULT_INVALID_STRING_ESCAPE" />
    <option name="RUBY_IVAR">
      <value>
        <option name="FOREGROUND" value="D1D5DA" />
      </value>
    </option>
    <option name="RUBY_KEYWORD">
      <value>
        <option name="FOREGROUND" value="D76496" />
      </value>
    </option>
    <option name="RUBY_LINE_CONTINUATION">
      <value>
        <option name="FOREGROUND" value="D76496" />
      </value>
    </option>
    <option name="RUBY_LOCAL_VAR_ID">
      <value>
        <option name="FOREGROUND" value="F1993B" />
      </value>
    </option>
    <option name="RUBY_METHOD_NAME">
      <value>
        <option name="FOREGROUND" value="B392F0" />
      </value>
    </option>
    <option name="RUBY_NTH_REF" baseAttributes="TEXT" />
    <option name="RUBY_NUMBER">
      <value>
        <option name="FOREGROUND" value="4091C9" />
      </value>
    </option>
    <option name="RUBY_OPERATION_SIGN">
      <value>
        <option name="FOREGROUND" value="D76496" />
      </value>
    </option>
    <option name="RUBY_PARAMDEF_CALL">
      <value>
        <option name="FOREGROUND" value="4091C9" />
      </value>
    </option>
    <option name="RUBY_PARAMETER_ID">
      <value>
        <option name="FOREGROUND" value="F1993B" />
      </value>
    </option>
    <option name="RUBY_REGEXP">
      <value>
        <option name="FOREGROUND" value="FFFFFF" />
      </value>
    </option>
    <option name="RUBY_SEMICOLON" baseAttributes="DEFAULT_SEMICOLON" />
    <option name="RUBY_SPECIFIC_CALL">
      <value>
        <option name="FOREGROUND" value="D76496" />
      </value>
    </option>
    <option name="RUBY_STRING">
      <value>
        <option name="FOREGROUND" value="9ECBFF" />
      </value>
    </option>
    <option name="RUBY_SYMBOL">
      <value>
        <option name="FOREGROUND" value="4091C9" />
      </value>
    </option>
    <option name="RUBY_WORDS">
      <value>
        <option name="FOREGROUND" value="9ECBFF" />
      </value>
    </option>
    <option name="SASS_COMMENT">
      <value>
        <option name="FOREGROUND" value="6A737D" />
      </value>
    </option>
    <option name="SASS_DEFAULT">
      <value>
        <option name="FOREGROUND" value="D76496" />
      </value>
    </option>
    <option name="SASS_EXTEND">
      <value>
        <option name="FOREGROUND" value="D76496" />
      </value>
    </option>
    <option name="SASS_FUNCTION">
      <value>
        <option name="FOREGROUND" value="4091C9" />
      </value>
    </option>
    <option name="SASS_IDENTIFIER">
      <value>
        <option name="FOREGROUND" value="B392F0" />
      </value>
    </option>
    <option name="SASS_IMPORTANT">
      <value>
        <option name="FOREGROUND" value="D76496" />
      </value>
    </option>
    <option name="SASS_KEYWORD">
      <value>
        <option name="FOREGROUND" value="D76496" />
      </value>
    </option>
    <option name="SASS_MIXIN">
      <value>
        <option name="FOREGROUND" value="B392F0" />
      </value>
    </option>
    <option name="SASS_NUMBER">
      <value>
        <option name="FOREGROUND" value="4091C9" />
      </value>
    </option>
    <option name="SASS_PROPERTY_NAME">
      <value>
        <option name="FOREGROUND" value="4091C9" />
      </value>
    </option>
    <option name="SASS_PROPERTY_VALUE">
      <value>
        <option name="FOREGROUND" value="4091C9" />
      </value>
    </option>
    <option name="SASS_STRING">
      <value>
        <option name="FOREGROUND" value="9ECBFF" />
      </value>
    </option>
    <option name="SASS_TAG_NAME">
      <value>
        <option name="FOREGROUND" value="85E89D" />
      </value>
    </option>
    <option name="SASS_URL">
      <value>
        <option name="FOREGROUND" value="4091C9" />
      </value>
    </option>
    <option name="SASS_VARIABLE">
      <value>
        <option name="FOREGROUND" value="F1993B" />
      </value>
    </option>
    <option name="SEARCH_RESULT_ATTRIBUTES">
      <value>
        <option name="BACKGROUND" value="4F4F82" />
      </value>
    </option>
    <option name="SLIM_BAD_CHARACTER">
      <value>
        <option name="FOREGROUND" value="F97583" />
        <option name="FONT_TYPE" value="2" />
      </value>
    </option>
    <option name="SLIM_CALL" baseAttributes="SLIM_STATIC_CONTENT" />
    <option name="SLIM_CLASS">
      <value>
        <option name="FOREGROUND" value="85E89D" />
      </value>
    </option>
    <option name="SLIM_COMMENT">
      <value>
        <option name="FOREGROUND" value="6A737D" />
      </value>
    </option>
    <option name="SLIM_DOCTYPE_KWD">
      <value>
        <option name="FOREGROUND" value="85E89D" />
      </value>
    </option>
    <option name="SLIM_FILTER">
      <value>
        <option name="FOREGROUND" value="85E89D" />
      </value>
    </option>
    <option name="SLIM_FILTER_CONTENT" baseAttributes="SLIM_STATIC_CONTENT" />
    <option name="SLIM_ID">
      <value>
        <option name="FOREGROUND" value="85E89D" />
      </value>
    </option>
    <option name="SLIM_INTERPOLATION">
      <value>
        <option name="FOREGROUND" value="9ECBFF" />
      </value>
    </option>
    <option name="SLIM_PARENTHS" baseAttributes="DEFAULT_PARENTHS" />
    <option name="SLIM_RUBY_CODE" baseAttributes="HAML_TEXT" />
    <option name="SLIM_STATIC_CONTENT" baseAttributes="TEXT" />
    <option name="SLIM_STRING_INTERPOLATED">
      <value>
        <option name="FOREGROUND" value="9ECBFF" />
      </value>
    </option>
    <option name="SLIM_TAG">
      <value>
        <option name="FOREGROUND" value="85E89D" />
      </value>
    </option>
    <option name="SLIM_TAG_ATTR_KEY">
      <value>
        <option name="FOREGROUND" value="B392F0" />
      </value>
    </option>
    <option name="SLIM_TAG_START" baseAttributes="SLIM_STATIC_CONTENT" />
    <option name="SPY-JS.EXCEPTION">
      <value>
        <option name="BACKGROUND" value="713F3F" />
        <option name="EFFECT_TYPE" value="2" />
        <option name="EFFECT_COLOR" value="D1D5DA" />
      </value>
    </option>
    <option name="SPY-JS.FUNCTION_SCOPE">
      <value>
        <option name="BACKGROUND" value="2E2E1F" />
        <option name="EFFECT_TYPE" value="2" />
        <option name="EFFECT_COLOR" value="D1D5DA" />
      </value>
    </option>
    <option name="SPY-JS.PATH_LEVEL_ONE">
      <value>
        <option name="BACKGROUND" value="264226" />
        <option name="EFFECT_TYPE" value="2" />
        <option name="EFFECT_COLOR" value="D1D5DA" />
      </value>
    </option>
    <option name="SPY-JS.PATH_LEVEL_TWO">
      <value>
        <option name="EFFECT_TYPE" value="1" />
        <option name="EFFECT_COLOR" value="D1D5DA" />
      </value>
    </option>
    <option name="SPY-JS.PROGRAM_SCOPE">
      <value>
        <option name="BACKGROUND" value="2B2B2B" />
        <option name="EFFECT_TYPE" value="2" />
        <option name="EFFECT_COLOR" value="D1D5DA" />
      </value>
    </option>
    <option name="SPY-JS.VALUE_HINT" baseAttributes="TEXT" />
    <option name="STATIC_FIELD_ATTRIBUTES">
      <value>
        <option name="FOREGROUND" value="FDA5FF" />
        <option name="FONT_TYPE" value="3" />
      </value>
    </option>
    <option name="STATIC_METHOD_ATTRIBUTES">
      <value>
        <option name="FONT_TYPE" value="2" />
      </value>
    </option>
    <option name="TAG_ATTR_KEY">
      <value>
        <option name="FOREGROUND" value="B392F0" />
      </value>
    </option>
    <option name="TEXT">
      <value>
        <option name="FOREGROUND" value="D1D5DA" />
        <option name="BACKGROUND" value="262626" />
      </value>
    </option>
    <option name="TEXT_SEARCH_RESULT_ATTRIBUTES">
      <value>
        <option name="BACKGROUND" value="5F5F00" />
        <option name="ERROR_STRIPE_COLOR" value="00FF00" />
      </value>
    </option>
    <option name="TODO_DEFAULT_ATTRIBUTES">
      <value>
        <option name="FOREGROUND" value="C7C7FF" />
        <option name="FONT_TYPE" value="3" />
        <option name="ERROR_STRIPE_COLOR" value="FF" />
      </value>
    </option>
    <option name="TYPEDEF">
      <value>
        <option name="FOREGROUND" value="D76496" />
      </value>
    </option>
    <option name="UNMATCHED_BRACE_ATTRIBUTES">
      <value>
        <option name="BACKGROUND" value="583535" />
      </value>
    </option>
    <option name="WARNING_ATTRIBUTES">
      <value>
        <option name="BACKGROUND" value="4A3F10" />
        <option name="EFFECT_TYPE" value="1" />
        <option name="EFFECT_COLOR" value="D1D5DA" />
        <option name="ERROR_STRIPE_COLOR" value="FFFF00" />
      </value>
    </option>
    <option name="WRITE_IDENTIFIER_UNDER_CARET_ATTRIBUTES">
      <value>
        <option name="BACKGROUND" value="472C47" />
        <option name="ERROR_STRIPE_COLOR" value="FFCDFF" />
      </value>
    </option>
    <option name="WRITE_SEARCH_RESULT_ATTRIBUTES">
      <value>
        <option name="BACKGROUND" value="623062" />
      </value>
    </option>
    <option name="XML_ATTRIBUTE_NAME">
      <value>
        <option name="FOREGROUND" value="B392F0" />
      </value>
    </option>
    <option name="XML_ATTRIBUTE_VALUE">
      <value>
        <option name="FOREGROUND" value="9ECBFF" />
      </value>
    </option>
    <option name="XML_ENTITY_REFERENCE">
      <value>
        <option name="FOREGROUND" value="4091C9" />
      </value>
    </option>
    <option name="XML_PROLOGUE">
      <value>
        <option name="FONT_TYPE" value="2" />
      </value>
    </option>
    <option name="XML_TAG" baseAttributes="TEXT" />
    <option name="XML_TAG_DATA">
      <value>
        <option name="FONT_TYPE" value="1" />
      </value>
    </option>
    <option name="XML_TAG_NAME">
      <value>
        <option name="FOREGROUND" value="85E89D" />
      </value>
    </option>
    <option name="YAML_COMMENT">
      <value>
        <option name="FOREGROUND" value="6A737D" />
      </value>
    </option>
    <option name="YAML_SCALAR_DSTRING">
      <value>
        <option name="FOREGROUND" value="9ECBFF" />
      </value>
    </option>
    <option name="YAML_SCALAR_KEY">
      <value>
        <option name="FOREGROUND" value="85E89D" />
      </value>
    </option>
    <option name="YAML_SCALAR_LIST">
      <value>
        <option name="FOREGROUND" value="9ECBFF" />
      </value>
    </option>
    <option name="YAML_SCALAR_STRING">
      <value>
        <option name="FOREGROUND" value="9ECBFF" />
      </value>
    </option>
    <option name="YAML_SCALAR_VALUE">
      <value>
        <option name="FOREGROUND" value="9ECBFF" />
      </value>
    </option>
    <option name="YAML_SIGN">
      <value>
        <option name="FOREGROUND" value="D76496" />
      </value>
    </option>
    <option name="YAML_TEXT">
      <value>
        <option name="FOREGROUND" value="9ECBFF" />
      </value>
    </option>
  </attributes>
</scheme>
  `.trim();
}
