import { getSettings } from "../modules/settings";

export const getSettingsListener = async () => {
  const settings = await getSettings();
  return { success: true, data: settings };
}