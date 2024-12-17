import { Note } from "@prisma/client";
import { FileText } from "lucide-react";

interface NotePanelNoteProps {
  note: Note
  level: number
}

const NotePanelNote: React.FC<NotePanelNoteProps> = ({ note, level }) => {
  const handleClick = () => {}
  const handleContextMenu = (event: React.MouseEvent) => {
    event.stopPropagation();
    window.api.contextNote({ noteId: note.id })
  }

  return (
    <div
      className="pr-3 py-0.5 flex items-center gap-2 select-none"
      style={{ paddingLeft: `${level * 12 + 12}px` }}
      onClick={handleClick}
      onContextMenu={handleContextMenu}>
      <div className="flex-0"><FileText size={14} /></div>
      <div className="flex-1 text-sm truncate">{note.title}</div>
    </div>
  )
}

export default NotePanelNote;