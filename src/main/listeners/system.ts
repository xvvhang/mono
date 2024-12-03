import { dialog, OpenDialogOptions } from "electron";

export const selectDirectoryListener = async (_: Electron.IpcMainInvokeEvent, data: OpenDialogOptions): Promise<InvokeResponse> => {
  const options: OpenDialogOptions = { ...data, properties: ["openDirectory"] };
  const result = await dialog.showOpenDialog(options);

  if (result.canceled) return { success: false, message: "cancelled" };
  if (result.filePaths.length === 0) return { success: false, message: "no file paths" };

  return { success: true, data: result.filePaths[0] };
};
