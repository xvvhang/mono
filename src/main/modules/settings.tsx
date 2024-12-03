import { app } from "electron";
import fs from "fs";
import path from "path";
import { defaultSettings } from "../../shared/defaults";

const settingsPath = path.join(app.getPath("userData"), "settings.json");

let cachedSettings: Settings | null = null;

export const readSettings = (): Settings => {
  return (
    cachedSettings ||
    JSON.parse(fs.readFileSync(settingsPath, { encoding: "utf-8" }))
  );
}

export const writeSettings = (settings: Partial<Settings>): Settings => {
  const currentSettings = readSettings();
  const newSettings = { ...currentSettings, ...settings };
  fs.writeFileSync(settingsPath, JSON.stringify(newSettings));
  cachedSettings = newSettings;
  return newSettings;
};

export const initSettings = () => {
  if (!fs.existsSync(settingsPath)) {
    fs.writeFileSync(settingsPath, JSON.stringify(defaultSettings));
    cachedSettings = defaultSettings;
  }
  return readSettings();
};
