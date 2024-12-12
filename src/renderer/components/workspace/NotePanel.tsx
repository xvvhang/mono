import { foldersWithoutParentAtom } from "@/renderer/store/folder";
import { useAtom } from "jotai";
import NotePanelFolder from "./note-panel/NotePanelFolder";
import { notesWithoutFolderAtom } from "@/renderer/store/note";
import NotePanelNote from "./note-panel/NotePanelNote";

const NotePanel: React.FC = () => {
  const [foldersWithoutParent] = useAtom(foldersWithoutParentAtom);
  const [notesWithoutFolder] = useAtom(notesWithoutFolderAtom);

  const handleContextMenu = () => {}

  return (
    <div
      className="h-full"
      onContextMenu={handleContextMenu}>
      {foldersWithoutParent.map((folder) => (
        <NotePanelFolder folder={folder} level={0} key={folder.id} />
      ))}
      {notesWithoutFolder.map((note) => (
        <NotePanelNote note={note} level={0} key={note.id} />
      ))}
    </div>
  )
}

export default NotePanel;