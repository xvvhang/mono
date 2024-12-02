import fs from "fs";
import { ensureFolderExists } from "@/utils/filesystem";
import { launchWorkspace } from "@/utils/workspace";
import { BrowserWindow, dialog, Menu, MenuItem, shell } from "electron";
import { readSettings, writeSettings } from "@/utils/settings";
import { createWindow } from "@/utils/windows";

export const createNewWorkspaceListener = (
  event: Electron.IpcMainInvokeEvent,
  folder: string,
): InvokeResponse => {
  const result = ensureFolderExists(folder);
  launchWorkspace(result);
  event.sender.close();
  return { success: true };
};
export const openExistingWorkspaceListener = async (
  event: Electron.IpcMainInvokeEvent,
): Promise<InvokeResponse> => {
  const result = await dialog.showOpenDialog({ properties: ["openDirectory"] });
  if (result.canceled || result.filePaths.length === 0) return;
  launchWorkspace(result.filePaths[0]);
  event.sender.close();
};
export const openWorkspaceListener = (
  event: Electron.IpcMainInvokeEvent,
  folder: string,
): InvokeResponse => {
  if (fs.existsSync(folder)) {
    launchWorkspace(folder);
    event.sender.close();
    return { success: true };
  } else return { success: false, message: "folder does not exist" };
};
export const contextWorkspaceListener = (
  event: Electron.IpcMainEvent,
  folder: string,
) => {
  const contextMenu = new Menu();
  contextMenu.append(
    new MenuItem({
      label: "Reveal in Finder",
      click: () => shell.showItemInFolder(folder),
    }),
  );
  contextMenu.append(
    new MenuItem({
      label: "Remove",
      click: () => {
        const settings = readSettings();
        settings.workspaces = settings.workspaces.filter(
          (workspace) => workspace !== folder,
        );
        writeSettings(settings);
      },
    }),
  );
  contextMenu.popup({ window: BrowserWindow.fromWebContents(event.sender) });
};

interface BrowserWindowWithData extends BrowserWindow {
  data: {
    type: WindowType;
    workspace?: string;
  };
}

export const openLauncherListener = (event: Electron.IpcMainInvokeEvent) => {
  const windows = BrowserWindow.getAllWindows();
  const launcher = windows.find(
    (w: BrowserWindowWithData) => w.data.type === "launcher",
  );
  console.log(launcher);
  if (!launcher) {
    createWindow({
      data: { type: "launcher" },
      window: {
        width: 400,
        height: 600,
        frame: false,
        titleBarStyle: "hiddenInset" as "hiddenInset",
      },
    });
  }
};
