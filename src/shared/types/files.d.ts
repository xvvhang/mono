type FileTreeNode = {
  name: string;
  path: string;
  type: 'directory' | 'file';
  children?: FileTreeNode[];
}