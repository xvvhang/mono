import { BrowserWindow } from "electron";
import { readSettings } from "@/utils/settings";

export const closeWindowListener = (event: Electron.IpcMainEvent) => {
  const window = BrowserWindow.fromWebContents(event.sender);
  window && window.close();
};
export const getSettingsListener = async (
  event: Electron.IpcMainInvokeEvent,
): Promise<InvokeResponse> => {
  const settings = readSettings();
  return { success: true, data: settings };
};