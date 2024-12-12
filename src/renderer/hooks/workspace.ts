import { useAtom } from "jotai";
import { foldersAtom } from "../store/folder";
import { useEffect } from "react";
import { notesAtom } from "../store/note";

export const useInitWorkspace = () => {
  const [, setFolders] = useAtom(foldersAtom);
  const [, setNotes] = useAtom(notesAtom);

  const initFolders = async () => {
    const res = await window.api.getFolders();
    if (res.success) setFolders(res.data);
  }

  const initNotes = async () => {
    const res = await window.api.getNotes();
    if (res.success) setNotes(res.data);
  }

  useEffect(() => {
    initFolders();
    initNotes();
  }, []);
}
