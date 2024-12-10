import { useAtom } from "jotai";
import { layoutAtom, LeftSidebarPanel } from "../store/layout";
import Layout from "./workspace/Layout";
import MenuBar from "./workspace/MenuBar";
import StatusBar from "./workspace/StatusBar";
import NotePanel from "./workspace/NotePanel";
import TaskPanel from "./workspace/TaskPanel";
import { noteListAtom, taskListAtom } from "../store/workspace";
import { Note, Task } from "@prisma/client";
import { useEffect } from "react";

interface WorkspaceProps {
  workspace: string;
}

const Workspace: React.FC<WorkspaceProps> = ({ workspace }) => {
  const [layout] = useAtom(layoutAtom);
  const [, setNoteList] = useAtom(noteListAtom);
  const [, setTaskLIst] = useAtom(taskListAtom);

  const fetchNotes = async () => {
    const res = await window.api.invoke('workspace.fetch-notes');
    if (res.success) setNoteList(res.data as Note[]);
  };

  const fetchTasks = async () => {
    const res = await window.api.invoke('workspace.fetch-tasks');
    if (res.success) setTaskLIst(res.data as Task[]);
  }

  const leftSidebarPanel = () => {
    return layout.leftSidebarPanel === LeftSidebarPanel.Note ?
      <NotePanel /> :
      <TaskPanel />;
  }

  useEffect(() => {
    fetchNotes();
    fetchTasks();
  }, []);

  return (
    <div className="w-full h-screen flex flex-col">
      <MenuBar />
      <Layout leftSidebar={leftSidebarPanel()} content={<div>{ workspace }</div>} />
      <StatusBar />
    </div>
  )
}

export default Workspace;