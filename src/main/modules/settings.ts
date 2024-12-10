import prisma from './prisma';
import { Settings } from '@prisma/client';

let cachedSettings: Settings | null = null;

export const getSettings = async () => {
  if (cachedSettings) return cachedSettings;

  const settings = await prisma.settings.findFirst();
  if (settings) cachedSettings = settings;
  else cachedSettings = await prisma.settings.create({ data: { lastWorkspace: '' } });

  return cachedSettings;
}

export const setSettings = async (data: { lastWorkspace: string }) => {
  if (!cachedSettings) await getSettings();

  cachedSettings = await prisma.settings.update({ where: { id: cachedSettings.id }, data });

  return cachedSettings;
}