import { app, BaseWindowConstructorOptions, BrowserWindow } from "electron";
import path from "path";
import fs from "fs";

const settingsPath = path.join(app.getPath('userData'), 'settings.json');

const defaultSettings: Settings = {
  "theme": "auto",
  "lastWorkspace": "",
  "workspaces": []
}

let cachedSettings: Settings | null = null;

export const readSettings = (): Settings => {
  return cachedSettings || JSON.parse(fs.readFileSync(settingsPath, { encoding: 'utf-8' }));
}

export const writeSettings = (settings: Partial<Settings>): Settings => {
  const currentSettings = readSettings();
  const newSettings = { ...currentSettings, ...settings };
  fs.writeFileSync(settingsPath, JSON.stringify(newSettings));
  cachedSettings = newSettings;
  return newSettings;
}

export const initSettings = () => {
  if (!fs.existsSync(settingsPath)) {
    fs.writeFileSync(settingsPath, JSON.stringify(defaultSettings));
    cachedSettings = defaultSettings;
  }
  return readSettings();
}

export const ensureFolderExists = (folder: string) => {
  console.log('ensure folder exists: ', folder);
  if (!fs.existsSync(folder)) return fs.mkdirSync(folder, { recursive: true });
}

export const launchWorkspace = (folder: string) => {
  // TODO: init files

  createWindow({
    data: { type: 'workspace', workspace: folder },
    window: {
      width: 800,
      height: 600,
      frame: false,
      titleBarStyle: "hiddenInset" as "hiddenInset"
    }
  });

  const settings = readSettings();
  if (!settings.workspaces.includes(folder)) settings.workspaces.push(folder);
  settings.lastWorkspace = folder;
  writeSettings(settings);
}

type CreateWindowOptions = {
  data: {
    type: WindowType;
    workspace?: string;
  },
  window?: Partial<BaseWindowConstructorOptions>;
}


export const createWindow = (options: CreateWindowOptions) => {
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
