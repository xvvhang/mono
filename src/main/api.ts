import { ipcMain } from "electron";
import { createWorkspaceListener, getWorkspacesListener, openWorkspaceListener } from "./listeners/launcher";
import { openLauncherWindow, openSettingsWindow } from "./modules/windows";
import { getSettingsListener } from "./listeners/app";
import Channels from "@/shared/constants/channels";

export const registerAPI = () => {
  ipcMain.on(Channels.openLauncher, openLauncherWindow);
  ipcMain.on(Channels.openSettings, openSettingsWindow);
  ipcMain.handle(Channels.openWorkspace, openWorkspaceListener);

  ipcMain.handle(Channels.getSettings, getSettingsListener);
  ipcMain.handle(Channels.getWorkspaces, getWorkspacesListener);
  ipcMain.handle(Channels.createWorkspace, createWorkspaceListener);
}
