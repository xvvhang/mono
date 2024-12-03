import { layoutAtom } from "@/renderer/store/layout";
import { useAtom } from "jotai";
import NotePanel from "./panels/NotePanel";
import TodoPanel from "./panels/TodoPanel";

interface SidebarProps {
  side: 'left' | 'right';
}

const Sidebar: React.FC<SidebarProps> = ({ side }) => {
  const [layout] = useAtom(layoutAtom);
  return (
    <div>
      {
        side === 'left' && (
          <>
            { layout.leftSidebarPanel === 'note' && <NotePanel /> }
            { layout.leftSidebarPanel === 'todo' && <TodoPanel /> }
          </>
        )
      }
      {
        side === 'right' && (
          <div>
            Right Sidebar
          </div>
        )
      }
    </div>
  )
}

export default Sidebar;