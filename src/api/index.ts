import { ipcMain } from "electron";
import { openDirectoryListener } from "./system";
import { closeWindowListener, getSettingsListener } from "./app";
import { contextWorkspaceListener, createNewWorkspaceListener, openExistingWorkspaceListener, openLauncherListener, openWorkspaceListener } from "./launcher";

ipcMain.handle("system.open-directory", openDirectoryListener);

ipcMain.on("app.close-window", closeWindowListener);
ipcMain.handle("app.get-settings", getSettingsListener);
ipcMain.on("app.open-launcher", openLauncherListener);

ipcMain.handle("launcher.create-new-workspace", createNewWorkspaceListener);
ipcMain.handle("launcher.open-existing-workspace", openExistingWorkspaceListener);
ipcMain.handle("launcher.open-workspace", openWorkspaceListener);
ipcMain.on("launcher.context-workspace", contextWorkspaceListener);
