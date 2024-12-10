import { app, BrowserWindow } from 'electron';
import { registerAPI } from './main/api';
import { getSettings } from './main/modules/settings';
import { openLauncherWindow, openWorkspaceWindow } from './main/modules/windows';

if (require('electron-squirrel-startup')) app.quit();

registerAPI();

const onReady = async () => {
  const settings = await getSettings();
  settings.lastWorkspace ? openWorkspaceWindow(settings.lastWorkspace) : openLauncherWindow();
}

const onWindowAllClosed = () => {
  (process.platform !== 'darwin') && app.quit();
}

const onActivate = () => {
  const count = BrowserWindow.getAllWindows().length;
  count === 0 && onReady();
}

app.on('ready', onReady);
app.on('window-all-closed', onWindowAllClosed);
app.on('activate', onActivate);
