import { getFileTree } from "../modules/filesystem"
import path from "path";

export const getKnowledgeFilesListener = (event: Electron.IpcMainInvokeEvent, directory: string) => {
  const subDirectory = path.join(directory, "knowledge");
  const data = getFileTree(subDirectory);
  return { success: true, data };
}

export const getProjectFilesListener = (event: Electron.IpcMainInvokeEvent, directory: string) => {
  const subDirectory = path.join(directory, "project");
  const data = getFileTree(subDirectory);
  return { success: true, data };
}
