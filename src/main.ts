import { app, BaseWindowConstructorOptions, BrowserWindow } from 'electron';
import path from 'path';
import fs from 'fs';
import "@/api/index";

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

type CreateWindowOptions = {
  data: {
    type: WindowType;
    workspace?: string;
  },
  window?: Partial<BaseWindowConstructorOptions>;
}

const checkSettings = () => {
  const settingsPath = path.join(app.getPath('userData'), 'settings.json');
  if (fs.existsSync(settingsPath)) {
    const settings = fs.readFileSync(settingsPath, { encoding: 'utf-8' });
    return JSON.parse(settings);
  } else {
    const defaultSettings: { lastWorkspace: Workspace | null, workspaces: Workspace[] } = { lastWorkspace: null, workspaces: [] };
    fs.writeFileSync(settingsPath, JSON.stringify(defaultSettings));
    return defaultSettings;
  }
}

const createWindow = (options: CreateWindowOptions) => {
  const mainWindow = new BrowserWindow({
    ...options.window,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  const queryObject: { type: WindowType, workspace?: string } = { type: options.data.type };
  if (options.data.workspace) queryObject.workspace = options.data.workspace;
  const queryParams = new URLSearchParams(queryObject);

  // and load the index.html of the app.
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) mainWindow.loadURL(`${MAIN_WINDOW_VITE_DEV_SERVER_URL}?${queryParams}`);
  else mainWindow.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html?${queryParams}`));

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
}

const startup = () => {
  const settings = checkSettings();
  if (settings.lastWorkspace) {
    createWindow({
      data: { type: 'workspace', workspace: settings.lastWorkspace.id }
    });
  } else {
    const windowOptions = {
      width: 720,
      height: 450,
      resizable: false,
      maximizable: false,
      show: false,
      frame: false
      // TODO: customize
    }
    createWindow({
      data: { type: 'manager' },
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
