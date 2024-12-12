import { Note } from "@prisma/client";
import { FileText } from "lucide-react";

interface NotePanelNoteProps {
  note: Note
  level: number
}

const NotePanelNote: React.FC<NotePanelNoteProps> = ({ note, level }) => {
  const handleClick = () => {}
  const handleContextMenu = () => {}
  return (
    <div
      className="pr-3 flex items-center gap-2"
      style={{ paddingLeft: `${level * 12 + 12}px` }}
      onClick={handleClick}
      onContextMenu={handleContextMenu}>
      <div className="flex-0"><FileText size={14} /></div>
      <div className="flex-1 text-sm truncate">{note.title}</div>
    </div>
  )
}

export default NotePanelNote;