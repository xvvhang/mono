import path from "path";
import { BrowserWindow, BaseWindowConstructorOptions } from "electron";
const cachedWindows = [];

interface BrowserWindowWithData extends BrowserWindow {
  data: {
    type: WindowType;
    workspace?: string;
  };
}

type CreateWindowOptions = {
  data: {
    type: WindowType;
    workspace?: string;
  };
  window?: Partial<BaseWindowConstructorOptions>;
};

export const createWindow = (options: CreateWindowOptions) => {
  const mainWindow = new BrowserWindow({
    ...options.window,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  }) as BrowserWindowWithData;

  mainWindow.data = options.data;
  cachedWindows.push(mainWindow);

  const queryObject: { type: WindowType; workspace?: string } = {
    type: options.data.type,
  };
  if (options.data.workspace) queryObject.workspace = options.data.workspace;
  const queryParams = new URLSearchParams(queryObject);

  // and load the index.html of the app.
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL)
    mainWindow.loadURL(`${MAIN_WINDOW_VITE_DEV_SERVER_URL}?${queryParams}`);
  else
    mainWindow.loadFile(
      path.join(
        __dirname,
        `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html?${queryParams}`,
      ),
    );

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
};
