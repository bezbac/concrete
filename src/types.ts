import { Colors } from "./colors";

export type ThemeGenerator = (config: {
  colors: Colors;
  baseResourceDirectory: string;
  baseOutputDirectory: string;
}) => Promise<void>;
