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
    node.children = fs.readdirSync(directory)
      .filter((child) => !child.startsWith('.'))
      .map((child) => {
        return getFileTree(path.join(directory, child));
      }).sort((a, b) => {
        if (a.type === b.type) return a.name.localeCompare(b.name);
        return a.type === 'directory' ? -1 : 1;
      });
  }

  return node;
};