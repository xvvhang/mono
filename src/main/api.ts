import { ipcMain } from "electron";
import { createWorkspaceListener, openWorkspaceListener } from "./listeners/launcher";
import { openLauncherWindow, openSettingsWindow } from "./modules/windows";
import { getSettingsListener } from "./listeners/app";
import { fetchNotesListener, fetchTasksListener } from "./listeners/workspace";

export const registerAPI = () => {
  // app
  ipcMain.on('app.open-launcher', openLauncherWindow);
  ipcMain.on('app.open-settings', openSettingsWindow);
  ipcMain.handle('app.get-settings', getSettingsListener);
  // launcher
  ipcMain.handle('launcher.get-workspaces', openWorkspaceListener);
  ipcMain.handle('launcher.open-workspace', openWorkspaceListener);
  ipcMain.handle('launcher.create-workspace', createWorkspaceListener);
  // workspace
  ipcMain.handle('workspace.fetch-notes', fetchNotesListener);
  ipcMain.handle('workspace.fetch-tasks', fetchTasksListener);
}
