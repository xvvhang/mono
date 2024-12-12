import { Note } from "@prisma/client";
import { atom } from "jotai";

export const foldersAtom = atom<FolderWithSubFoldersAndNotes[]>([]);
export const folderWithoutParentAtom = atom((get) => {
  get(foldersAtom).filter((folder: FolderWithSubFoldersAndNotes) => !folder.parentId);
})
export const notesAtom = atom<Note[]>([]);
