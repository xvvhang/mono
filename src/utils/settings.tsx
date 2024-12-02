import {app } from "electron";
import path from "path";
import fs from "fs";

const settingsPath = path.join(app.getPath("userData"), "settings.json");

const defaultSettings: Settings = {
  theme: "auto",
  lastWorkspace: "",
  workspaces: [],
};

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