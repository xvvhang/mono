import { BrowserWindow, BrowserWindowConstructorOptions } from "electron";
import path from "path";
import { defaultLauncherWindowOptions, defaultSettingsWindowOptions, defaultWorkspaceWindowOptions } from "../../shared/defaults";
import { readSettings, writeSettings } from "./settings";

interface BrowserWindowWithData extends BrowserWindow { data: WindowData }

// TODO: add background to avoid flash
const createWindow = (options: BrowserWindowConstructorOptions, data: WindowData) => {
  const window = new BrowserWindow({
    ...options,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  }) as BrowserWindowWithData;

  window.data = data;

  const search = new URLSearchParams(data);

  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) window.loadURL(`${MAIN_WINDOW_VITE_DEV_SERVER_URL}?${search}`);
  else window.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html?${search}`));

  window.webContents.openDevTools();

  return window;
}

export const openLauncherWindow = () => {
  const windows = BrowserWindow.getAllWindows() as BrowserWindowWithData[];
  const createdWindow = windows.find(window => window.data.type === "launcher");
  if (createdWindow) createdWindow.show();
  else createWindow(defaultLauncherWindowOptions, { type: "launcher" });
}

export const openWorkspaceWindow = (workspace: string) => {
  const windows = BrowserWindow.getAllWindows() as BrowserWindowWithData[];
  const createdWindow = windows.find(window => window.data.type === "workspace" && window.data.workspace === workspace);
  if (createdWindow) {
    createdWindow.show();
  }
  else {
    createWindow(defaultWorkspaceWindowOptions, { type: "workspace", workspace });
    writeSettings({ lastWorkspace: workspace, workspaces: Array.from(new Set([workspace, ...readSettings().workspaces])) });
  }
}

export const openSettingsWindow = () => {
  const windows = BrowserWindow.getAllWindows() as BrowserWindowWithData[];
  const createdWindow = windows.find(window => window.data.type === "settings");
  if (createdWindow) createdWindow.show();
  else createWindow(defaultSettingsWindowOptions, { type: "settings" });
}