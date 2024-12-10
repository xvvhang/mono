import { ipcMain } from "electron";
import { createNewWorkspaceListener, openWorkspaceListener } from "./listeners/launcher";
import { openLauncherWindow, openSettingsWindow } from "./modules/windows";
import { getSettingsListener } from "./listeners/app";

export const registerAPI = () => {
  // app
  ipcMain.on('app.open-launcher', openLauncherWindow);
  ipcMain.on('app.open-settings', openSettingsWindow);
  ipcMain.handle('app.get-settings', getSettingsListener);
  // launcher
  ipcMain.handle('launcher.open-workspace', openWorkspaceListener);
  ipcMain.handle('launcher.create-new-workspace', createNewWorkspaceListener);
}
