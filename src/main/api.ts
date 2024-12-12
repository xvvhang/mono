import { ipcMain } from "electron";
import { createWorkspaceListener, getWorkspacesListener, openWorkspaceListener } from "./listeners/workspace";
import { openLauncherWindow, openSettingsWindow } from "./modules/windows";
import { getSettingsListener } from "./listeners/settings";
import Channels from "@/shared/constants/channels";
import { fetchNotesListener } from "./listeners/note";
import { fetchFoldersListener } from "./listeners/folder";

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
