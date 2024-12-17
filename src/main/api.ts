import { ipcMain } from "electron";
import Channels from "../shared/constants/channels";
import { fetchFoldersListener } from "./listeners/folder";
import { fetchNotesListener } from "./listeners/note";
import { getSettingsListener } from "./listeners/settings";
import { createWorkspaceListener, getWorkspacesListener, openWorkspaceListener } from "./listeners/workspace";
import { openLauncherWindow, openSettingsWindow } from "./modules/windows";
import { contextFolderListener, contextNoteListener } from "./listeners/note-panel";

export const registerAPI = () => {
  ipcMain.on(Channels.openLauncher, openLauncherWindow);
  ipcMain.on(Channels.openSettings, openSettingsWindow);
  ipcMain.on(Channels.openWorkspace, openWorkspaceListener);

  ipcMain.handle(Channels.getSettings, getSettingsListener);

  ipcMain.handle(Channels.getWorkspaces, getWorkspacesListener);
  ipcMain.handle(Channels.createWorkspace, createWorkspaceListener);

  ipcMain.handle(Channels.getFolders, fetchFoldersListener);

  ipcMain.handle(Channels.getNotes, fetchNotesListener);

  ipcMain.on(Channels.contextFolder, contextFolderListener);
  ipcMain.on(Channels.contextNote, contextNoteListener);
}
