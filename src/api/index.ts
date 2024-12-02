import { ipcMain } from "electron";
import {
  closeWindowListener,
  contextWorkspaceListener,
  createNewWorkspaceListener,
  getSettingsListener,
  openDirectoryListener,
  openExistingWorkspaceListener,
  openWorkspaceListener,
  openLauncherListener,
} from "./listeners";

// system
ipcMain.handle("system.open-directory", openDirectoryListener);

// app
ipcMain.on("app.close-window", closeWindowListener);
ipcMain.handle("app.get-settings", getSettingsListener);
ipcMain.on("app.open-launcher", openLauncherListener);

// launcher
ipcMain.handle("launcher.create-new-workspace", createNewWorkspaceListener);
ipcMain.handle(
  "launcher.open-existing-workspace",
  openExistingWorkspaceListener,
);
ipcMain.handle("launcher.open-workspace", openWorkspaceListener);
ipcMain.on("launcher.context-workspace", contextWorkspaceListener);
