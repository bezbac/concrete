import { Colors } from "./colors";

export type ThemeGenerator = (config: {
  colors: Colors;
  baseResourceDirectory: string;
  outputDirectory: string;
}) => Promise<void>;
