import { useAtom } from "jotai";
import { layoutAtom, LeftSidebarPanel } from "../store/layout";
import Layout from "./workspace/Layout";
import MenuBar from "./workspace/MenuBar";
import StatusBar from "./workspace/StatusBar";
import NotePanel from "./workspace/NotePanel";
import TaskPanel from "./workspace/TaskPanel";
import { useInitWorkspace } from "../hooks/workspace";

interface WorkspaceProps {
  workspace: string;
}

const Workspace: React.FC<WorkspaceProps> = ({ workspace }) => {
  const [layout] = useAtom(layoutAtom);

  useInitWorkspace();

  const leftSidebarPanel = () => {
    return layout.leftSidebarPanel === LeftSidebarPanel.Note ?
      <NotePanel /> :
      <TaskPanel />;
  }

  return (
    <div className="w-full h-screen flex flex-col">
      <MenuBar />
      <Layout leftSidebar={leftSidebarPanel()} content={<div>{ workspace }</div>} />
      <StatusBar />
    </div>
  )
}

export default Workspace;