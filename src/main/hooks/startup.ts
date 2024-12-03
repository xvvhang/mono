import { initSettings } from "../modules/settings";
import { openLauncherWindow, openWorkspaceWindow } from "../modules/windows";

export const startupHook = () => {
  const settings = initSettings();
  if (settings.lastWorkspace) openWorkspaceWindow(settings.lastWorkspace);
  else openLauncherWindow();
}
