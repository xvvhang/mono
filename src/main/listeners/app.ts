import { readSettings } from "../modules/settings";

export const getSettingsListener = async (): Promise<InvokeResponse> => {
  const settings = readSettings();
  return { success: true, data: settings };
};
