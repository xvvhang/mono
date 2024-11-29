import { ipcMain } from "electron";
import { closeWindowListener, createNewWorkspaceListener, getSettingsListener, openDirectoryListener, openExistingWorkspaceListener, openWorkspaceListener } from "./listeners";

// system
ipcMain.handle('system.open-directory', openDirectoryListener);

// app
ipcMain.on('app.close-window', closeWindowListener);
ipcMain.handle('app.get-settings', getSettingsListener);

// launcher
ipcMain.handle('launcher.create-new-workspace', createNewWorkspaceListener);
ipcMain.handle('launcher.open-existing-workspace', openExistingWorkspaceListener);
ipcMain.handle('launcher.open-workspace', openWorkspaceListener);