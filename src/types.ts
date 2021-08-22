import { Theme } from "./theme";

export type ThemeGenerator = (config: {
  theme: Theme;
  baseResourceDirectory: string;
  outputDirectory: string;
}) => Promise<void>;
