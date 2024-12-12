import { getSettings } from "../modules/settings";

export const getSettingsListener = async (): Promise<GetSettingsResponse> => {
  const settings = await getSettings();
  return { success: true, data: settings };
}