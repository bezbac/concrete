import fs from "fs/promises";

export async function ensureDir(path: string) {
    return fs.stat(path).catch((err) => {        
        if (err.message.includes("no such file or directory")) {
            return fs.mkdir(path, { recursive: true });
        }
    });
}