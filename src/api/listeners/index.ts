import { BrowserWindow, dialog } from "electron";
import { checkFolderExists, ensureFolderExists, launchWorkspace, readSettings } from "../internals/app";

export const getSettingsListener = async (event: Electron.IpcMainInvokeEvent): Promise<InvokeResponse> => {
  const settings = readSettings();
  return { success: true, data: settings };
}

export const openDirectoryListener = async (event: Electron.IpcMainInvokeEvent, data: any): Promise<InvokeResponse> => {
  const options: Electron.OpenDialogOptions = { properties: ['openDirectory'] };
  if (data.defaultPath) options.defaultPath = data.defaultPath;
  const result = await dialog.showOpenDialog(options);
  if (result.canceled) return { success: false, message: 'cancelled' };
  if (result.filePaths.length === 0) return { success: false, message: 'no file paths' };
  return { success: true, data: result.filePaths[0] }
}

export const openExistingWorkspaceListener = async (event: Electron.IpcMainInvokeEvent): Promise<InvokeResponse> => {
  const result = await dialog.showOpenDialog({ properties: ['openDirectory'] });
  if (result.canceled || result.filePaths.length === 0) return;
  launchWorkspace(result.filePaths[0]);
  event.sender.close();
}

export const createNewWorkspaceListener = (event: Electron.IpcMainInvokeEvent, folder: string): InvokeResponse => {
  const result = ensureFolderExists(folder);
  launchWorkspace(result);
  event.sender.close();
  return { success: true };
}

export const closeWindowListener = (event: Electron.IpcMainEvent) => {
  const window = BrowserWindow.fromWebContents(event.sender);
  window && window.close()
}

export const openWorkspaceListener = (event: Electron.IpcMainInvokeEvent, folder: string): InvokeResponse => {
  if (checkFolderExists(folder)) {
    launchWorkspace(folder);
    event.sender.close();
    return { success: true };
  }
  else return { success: false, message: 'folder does not exist' };
}