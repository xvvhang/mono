import { useDrag } from "react-dnd";

const NotePanelFile: React.FC<{ file: FileTreeNode }> = ({ file }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'FILE',
    item: file,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));
  return (
    <div ref={drag} style={{ opacity: isDragging ? 0.5 : 1 }}>{ file.name }</div>
  )
}

export default NotePanelFile;