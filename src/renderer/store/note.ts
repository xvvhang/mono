import { Note } from "@prisma/client";
import { atom } from "jotai";

export const notesAtom = atom<Note[]>([]);
export const notesWithoutFolderAtom = atom((get) => {
  return get(notesAtom).filter((note: Note) => !note.folderId);
})
