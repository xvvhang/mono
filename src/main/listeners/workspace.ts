import { getFileTree } from "../modules/filesystem"

export const getFileTreeListener = (event: Electron.IpcMainInvokeEvent, directory: string) => {
  const data = getFileTree(directory);
  return { success: true, data };
}
