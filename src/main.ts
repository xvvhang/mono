import { app, BrowserWindow } from 'electron';
import "@/api/index";
import { createWindow } from "@/utils/windows";
import { initSettings } from '@/utils/settings';
import { launchWorkspace } from '@/utils/workspace';

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

const startup = () => {
  const settings = initSettings();
  if (settings.lastWorkspace) {
    launchWorkspace(settings.lastWorkspace);
  } else {
    const windowOptions = {
      width: 720,
      height: 450,
      resizable: false,
      maximizable: false,
      frame: false,
      titleBarStyle: "hiddenInset" as "hiddenInset"
    }
    createWindow({
      data: { type: 'launcher' },
      window: windowOptions
    });
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', startup);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) startup();
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
