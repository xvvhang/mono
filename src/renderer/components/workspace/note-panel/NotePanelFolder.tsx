import { foldersAtom } from "@/renderer/store/folder";
import { notesAtom } from "@/renderer/store/note";
import { Folder } from "@prisma/client";
import { useAtom } from "jotai";
import { FolderClosed, FolderOpen } from "lucide-react";
import { useState } from "react";
import NotePanelNote from "./NotePanelNote";

interface NotePanelFolderProps {
  folder: Folder
  level: number
}

const NotePanelFolder: React.FC<NotePanelFolderProps> = ({ folder, level }) => {
  const [open, setOpen] = useState(false);
  const [folders] = useAtom(foldersAtom);
  const [notes] = useAtom(notesAtom);

  const children = folders.filter((f) => f.parentId === folder.id);
  const foldreNotes = notes.filter((n) => n.folderId === folder.id);

  const handleContextMenu = () => {}

  return (
    <>
      <div
        className="pr-3 flex items-center gap-2"
        style={{ paddingLeft: `${level * 12 + 12}px` }}
        onClick={() => setOpen(!open)}
        onContextMenu={handleContextMenu}>
          <div className="flex-0">{open ? <FolderOpen size={14} /> : <FolderClosed size={14} />}</div>
          <div className="flex-1 text-sm truncate">{folder.name}</div>
        </div>
      {open && children.map((child) => (
        <NotePanelFolder folder={child} level={level + 1} />
      ))}
      {open && foldreNotes.map((note) => (
        <NotePanelNote note={note} level={level + 1} />
      ))}
    </>
  )
}

export default NotePanelFolder;