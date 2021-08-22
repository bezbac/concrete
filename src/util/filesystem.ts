import fs from "fs/promises";

export async function ensureDir(path: string): Promise<void> {
  return fs
    .stat(path)
    .catch((err) => {
      if (err.message.includes("no such file or directory")) {
        return fs.mkdir(path, { recursive: true });
      }
    })
    .then(() => Promise.resolve());
}
