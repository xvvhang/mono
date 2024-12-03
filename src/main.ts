import { app, BrowserWindow } from 'electron';
import { registerAPI } from './main/api';
import { startupHook } from './main/hooks/startup';

if (require('electron-squirrel-startup')) app.quit();
registerAPI();
app.on('ready', startupHook);
app.on('window-all-closed', () => (process.platform !== 'darwin') && app.quit());
app.on('activate', () => BrowserWindow.getAllWindows().length === 0 && startupHook());
