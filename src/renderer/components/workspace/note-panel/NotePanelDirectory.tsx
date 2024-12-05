import { useDrop } from "react-dnd";
import NotePanelFile from "./NotePanelFile";
import { FolderClosed, FolderOpen } from "lucide-react";
import { useState } from "react";

interface NotePanelDirectoryProps {
  directory: FileTreeNode;
  onDrop: (file: FileTreeNode) => void;
}
const NotePanelDirectory: React.FC<NotePanelDirectoryProps> = ({ directory, onDrop }) => {
  const [open, setOpen] = useState(false);
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'FILE',
    drop: (item: FileTreeNode) => onDrop(item),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <div ref={drop} className={ isOver ? "bg-gray-1" : "bg-accent-6" }>
      <div className="flex items-center gap-1" onClick={() => setOpen(!open)}>
        { open ? <FolderOpen size={14} /> : <FolderClosed size={14} /> }
        <div className="text-sm">{ directory.name }</div>
      </div>
      {open && (
        <div className="pl-6">
          {
            directory.children.map((node, idx) => {
              if (node.type === 'directory') {
                return <NotePanelDirectory key={idx} directory={node} onDrop={onDrop} />
              } else {
                return <NotePanelFile key={idx} file={node} />
              }
            })
          }
        </div>
      )}
    </div>
  )
}

export default NotePanelDirectory;