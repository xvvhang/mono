import { ipcMain } from "electron";
import { closeWindowListener, createNewWorkspaceListener, openDirectoryListener, openExistingWorkspaceListener } from "./listeners";

ipcMain.on('close-window', closeWindowListener);
ipcMain.handle('app.workspace.open-directory', openDirectoryListener);
ipcMain.handle('app.workspace.create-new-workspace', createNewWorkspaceListener);
ipcMain.handle('app.workspace.open-existing-workspace', openExistingWorkspaceListener);