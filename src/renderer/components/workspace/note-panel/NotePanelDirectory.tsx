import { useDrop } from "react-dnd";
import NotePanelFile from "./NotePanelFile";
import { FolderClosed, FolderOpen } from "lucide-react";
import { useState } from "react";

interface NotePanelDirectoryProps {
  directory: FileTreeNode;
  level: number;
  onDrop: (file: FileTreeNode) => void;
}

const NotePanelDirectory: React.FC<NotePanelDirectoryProps> = ({ directory, level, onDrop }) => {
  const [open, setOpen] = useState(false);
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'FILE',
    drop: (item: FileTreeNode) => onDrop(item),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <div ref={drop} className={ isOver ? "bg-gray-4" : "bg-gray-1" }>
      <div className="py-0.5 pr-4 flex items-center gap-2 select-none hover:bg-gray-2" style={{ paddingLeft: level * 16 + 16 }} onClick={() => setOpen(!open)}>
        <div className="flex-0">{ open ? <FolderOpen size={14} /> : <FolderClosed size={14} /> }</div>
        <div className="flex-1 truncate text-sm">{ directory.name }</div>
      </div>
      {open && (
        <div>
          {
            directory.children.map((node, idx) => {
              if (node.type === 'directory') {
                return <NotePanelDirectory key={idx} directory={node} level={level + 1} onDrop={onDrop} />
              } else {
                return <NotePanelFile key={idx} file={node} level={level + 1} />
              }
            })
          }
        </div>
      )}
    </div>
  )
}

export default NotePanelDirectory;