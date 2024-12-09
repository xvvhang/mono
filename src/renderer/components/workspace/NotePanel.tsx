import { noteFileTreeAtom } from "@/renderer/store/files";
import { useAtom } from "jotai";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import NotePanelFile from "./note-panel/NotePanelFile";
import NotePanelDirectory from "./note-panel/NotePanelDirectory";

const NotePanel: React.FC = () => {
  const [noteFileTree] = useAtom(noteFileTreeAtom);

  return (
    <DndProvider backend={HTML5Backend}>
      {
        noteFileTree && noteFileTree.children.map((node: FileTreeNode, idx) => {
          if (node.type === 'directory') {
            return <NotePanelDirectory key={idx} directory={node} level={0} onDrop={(file) => console.log(file)} />
          } else {
            return <NotePanelFile key={idx} file={node} level={0} />
          }
        })
      }
    </DndProvider>
  )
}

export default NotePanel;