import { ipcMain } from "electron";
import { createWorkspaceListener, getWorkspacesListener, openWorkspaceListener } from "./listeners/launcher";
import { openLauncherWindow, openSettingsWindow } from "./modules/windows";
import { getSettingsListener } from "./listeners/app";
import Channels from "@/shared/constants/channels";
import { fetchFoldersListener, fetchNotesListener } from "./listeners/workspace";

export const registerAPI = () => {
  ipcMain.on(Channels.openLauncher, openLauncherWindow);
  ipcMain.on(Channels.openSettings, openSettingsWindow);
  ipcMain.on(Channels.openWorkspace, openWorkspaceListener);

  ipcMain.handle(Channels.getSettings, getSettingsListener);
  ipcMain.handle(Channels.getWorkspaces, getWorkspacesListener);
  ipcMain.handle(Channels.createWorkspace, createWorkspaceListener);

  ipcMain.handle(Channels.fetchFolders, fetchFoldersListener);
  ipcMain.handle(Channels.fetchNotes, fetchNotesListener);
}
