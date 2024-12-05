import { fileTreeAtom } from "@/renderer/store/files";
import { useAtom } from "jotai";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import NotePanelFile from "./note-panel/NotePanelFile";
import NotePanelDirectory from "./note-panel/NotePanelDirectory";

const NotePanel: React.FC = () => {
  const [fileTree] = useAtom(fileTreeAtom);

  return (
    <DndProvider backend={HTML5Backend}>
      {
        fileTree && fileTree.children.map((node: FileTreeNode, idx) => {
          if (node.type === 'directory') {
            return <NotePanelDirectory key={idx} directory={node} files={node.children} onDrop={(file) => console.log(file)} />
          } else {
            return <NotePanelFile key={idx} file={node} />
          }
        })
      }
    </DndProvider>
  )
}

export default NotePanel;