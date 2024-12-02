import fs from "fs";
export const ensureFolderExists = (folder: string): string => {
  if (!fs.existsSync(folder)) return fs.mkdirSync(folder, { recursive: true });
  else return folder;
};