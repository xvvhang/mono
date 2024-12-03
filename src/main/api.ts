import { ipcMain } from "electron";
import { getSettingsListener } from "./listeners/app";
import { contextWorkspaceListener, createNewWorkspaceListener, openExistingWorkspaceListener, openWorkspaceListener } from "./listeners/launcher";
import { selectDirectoryListener } from "./listeners/system";
import { openLauncherWindow, openSettingsWindow } from "./modules/windows";

export const registerAPI = () => {
  ipcMain.handle('system.select-directory', selectDirectoryListener);
  ipcMain.on('app.open-launcher', openLauncherWindow);
  ipcMain.on('app.open-settings', openSettingsWindow);
  ipcMain.handle('app.get-settings', getSettingsListener)
  ipcMain.on('launcher.context-workspace', contextWorkspaceListener);
  ipcMain.handle('launcher.open-existing-workspace', openExistingWorkspaceListener);
  ipcMain.handle('launcher.create-new-workspace', createNewWorkspaceListener);
  ipcMain.handle('launcher.open-workspace', openWorkspaceListener);

  console.log('API registered');
}
