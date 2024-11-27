import { app } from "electron";
import path from "path";
import fs from "fs";

const readSettings = () => {
  const settingsPath = path.join(app.getPath('userData'), 'settings.json');
  const settingsString = fs.readFileSync(settingsPath, { encoding: 'utf-8' });
  return JSON.parse(settingsString);
}

const writeSettings = (data: Partial<Settings>) => {
  const settingsPath = path.join(app.getPath('userData'), 'settings.json');
  const oldSettings = readSettings();
  const newSettings = { ...oldSettings, ...data };
  fs.writeFileSync(settingsPath, JSON.stringify(newSettings));
  return newSettings;
}

export const readSettingsListener = () => {
  return readSettings();
}

export const writeSettingsListener = (_event: any, data: Partial<Settings>) => {
  return writeSettings(data);
}