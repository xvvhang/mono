import { atom } from "jotai";

export const foldersAtom = atom<FolderWithSubFoldersAndNotes[]>([]);
export const foldersWithoutParentAtom = atom((get) => {
  get(foldersAtom).filter((folder: FolderWithSubFoldersAndNotes) => !folder.parentId);
})
