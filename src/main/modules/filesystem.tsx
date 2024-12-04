import fs from "fs";
import path from "path";

export const ensureDirectoryExists = (folder: string): string => {
  if (!fs.existsSync(folder)) return fs.mkdirSync(folder, { recursive: true });
  else return folder;
};

export const getFileTree = (directory: string): FileTreeNode => {
  const stats = fs.statSync(directory);
  const node: FileTreeNode = {
    name: path.basename(directory),
    path: directory,
    type: stats.isDirectory() ? 'directory' : 'file',
  };

  if (stats.isDirectory()) {
    node.children = fs.readdirSync(directory).map((child) => {
      return getFileTree(path.join(directory, child));
    });
  }

  return node;
};