import { ipcMain } from "electron";
import { getSettingsListener } from "./listeners/app";
import { contextWorkspaceListener, createNewWorkspaceListener, openExistingWorkspaceListener, openWorkspaceListener } from "./listeners/launcher";
import { selectDirectoryListener } from "./listeners/system";
import { getKnowledgeFilesListener, getProjectFilesListener } from "./listeners/workspace";
import { openLauncherWindow, openSettingsWindow } from "./modules/windows";

export const registerAPI = () => {
  // system
  ipcMain.handle('system.select-directory', selectDirectoryListener);
  // app
  ipcMain.on('app.open-launcher', openLauncherWindow);
  ipcMain.on('app.open-settings', openSettingsWindow);
  ipcMain.handle('app.get-settings', getSettingsListener)
  // launcher
  ipcMain.on('launcher.context-workspace', contextWorkspaceListener);
  ipcMain.handle('launcher.open-existing-workspace', openExistingWorkspaceListener);
  ipcMain.handle('launcher.create-new-workspace', createNewWorkspaceListener);
  ipcMain.handle('launcher.open-workspace', openWorkspaceListener);
  // workspace
  ipcMain.handle('workspace.get-knowledge-files', getKnowledgeFilesListener);
  ipcMain.handle('workspace.get-project-files', getProjectFilesListener);
}
