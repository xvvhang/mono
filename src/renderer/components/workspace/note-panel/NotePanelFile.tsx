import { FileText } from "lucide-react";
import { useDrag } from "react-dnd";

interface NotePanelFileProps {
  file: FileTreeNode;
  level: number;
}

const NotePanelFile: React.FC<NotePanelFileProps> = ({ file, level }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'FILE',
    item: file,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));
  return (
    <div className="py-0.5 pr-4 flex items-center gap-2 select-none hover:bg-gray-2" style={{ paddingLeft: level * 16 + 16 }}>
      <div className="flex-0"><FileText size={14} /></div>
      <div ref={drag} className="flex-1 truncate text-sm" style={{ opacity: isDragging ? 0.5 : 1 }}>{ file.name }</div>
    </div>
  )
}

export default NotePanelFile;