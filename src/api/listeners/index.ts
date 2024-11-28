import { BrowserWindow, dialog } from "electron";
import { ensureFolderExists, launchWorkspace } from "../internals/app";

export const openDirectoryListener = async (event: Electron.IpcMainInvokeEvent, data: any) => {
  const options: Electron.OpenDialogOptions = { properties: ['openDirectory'] };
  if (data.defaultPath) options.defaultPath = data.defaultPath;
  const result = await dialog.showOpenDialog(options);
  if (result.canceled) return { success: false, message: 'cancelled' };
  if (result.filePaths.length === 0) return { success: false, message: 'no file paths' };
  return { success: true, data: result.filePaths[0] }
}

export const openExistingWorkspaceListener = async (event: Electron.IpcMainInvokeEvent) => {
  const result = await dialog.showOpenDialog({ properties: ['openDirectory'] });
  if (result.canceled || result.filePaths.length === 0) return;
  launchWorkspace(result.filePaths[0]);
  event.sender.close();
}

export const createNewWorkspaceListener = async (event: Electron.IpcMainInvokeEvent, folder: string) => {
  const result = ensureFolderExists(folder);
  launchWorkspace(result);
  event.sender.close();
}

export const closeWindowListener = (event: Electron.IpcMainEvent) => {
  const window = BrowserWindow.fromWebContents(event.sender);
  window && window.close();
}