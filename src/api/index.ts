import { ipcMain } from "electron";
import { readSettingsListener, writeSettingsListener } from "./listeners/app";

ipcMain.handle('app.settings.read', readSettingsListener);
ipcMain.handle('app.settings.write', writeSettingsListener);

console.log('API listeners registered');