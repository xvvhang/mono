import { Settings } from "@prisma/client";
import { atom } from "jotai";

export const settingsAtom = atom<Partial<Settings>>({})