import { Folder } from "@prisma/client";
import { atom } from "jotai";

export const foldersAtom = atom<Folder[]>([]);
export const foldersWithoutParentAtom = atom((get) => {
  return get(foldersAtom).filter((folder: Folder) => !folder.parentId);
})
