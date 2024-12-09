import { BrowserWindow, dialog, Menu, MenuItem, shell } from "electron";
import fs from "fs";
import { ensureDirectoryExists } from "../modules/filesystem";
import { readSettings, writeSettings } from "../modules/settings";
import { openWorkspaceWindow } from "../modules/windows";

export const createNewWorkspaceListener = (event: Electron.IpcMainInvokeEvent, directory: string): InvokeResponse => {
  const workspaceDirectory = ensureDirectoryExists(directory);
  // TODO add default direcotries
  openWorkspaceWindow(workspaceDirectory);
  event.sender.close();
  return { success: true };
};

export const openExistingWorkspaceListener = async (event: Electron.IpcMainInvokeEvent): Promise<InvokeResponse> => {
  const result = await dialog.showOpenDialog({ properties: ["openDirectory"] });
  if (result.canceled || result.filePaths.length === 0) return;
  // TODO add check if directory is a workspace
  openWorkspaceWindow(result.filePaths[0]);
  event.sender.close();
  return { success: true }
};

export const openWorkspaceListener = (event: Electron.IpcMainInvokeEvent, directory: string): InvokeResponse => {
  if (!fs.existsSync(directory)) return { success: false, message: "folder does not exist" };
  openWorkspaceWindow(directory);
  event.sender.close();
  return { success: true };
};

export const contextWorkspaceListener = (event: Electron.IpcMainEvent, directory: string) => {
  const contextMenu = new Menu();
  contextMenu.append(
    new MenuItem({
      label: "Reveal in Finder",
      click: () => shell.showItemInFolder(directory),
    }),
  );
  contextMenu.append(
    new MenuItem({
      label: "Remove",
      click: () => {
        const settings = readSettings();
        settings.workspaces = settings.workspaces.filter(
          (workspace) => workspace !== directory,
        );
        writeSettings(settings);
        // TODO: send event to renderer to update workspace list
        // event.sender.send()
      },
    }),
  );
  contextMenu.popup({ window: BrowserWindow.fromWebContents(event.sender) });
};
