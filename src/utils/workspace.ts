import { readSettings, writeSettings } from "./settings";
import { createWindow } from "./windows";

export const launchWorkspace = (folder: string) => {
  // TODO: init files

  createWindow({
    data: { type: "workspace", workspace: folder },
    window: {
      width: 800,
      height: 600,
      frame: false,
      titleBarStyle: "hiddenInset" as "hiddenInset",
    },
  });

  const settings = readSettings();
  if (!settings.workspaces.includes(folder)) settings.workspaces.push(folder);
  settings.lastWorkspace = folder;
  writeSettings(settings);
};
