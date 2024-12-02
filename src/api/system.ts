import { dialog } from "electron";

export const openDirectoryListener = async (
  event: Electron.IpcMainInvokeEvent,
  data: any,
): Promise<InvokeResponse> => {
  const options: Electron.OpenDialogOptions = { properties: ["openDirectory"] };
  if (data.defaultPath) options.defaultPath = data.defaultPath;
  const result = await dialog.showOpenDialog(options);
  if (result.canceled) return { success: false, message: "cancelled" };
  if (result.filePaths.length === 0)
    return { success: false, message: "no file paths" };
  return { success: true, data: result.filePaths[0] };
};