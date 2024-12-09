import React, { useEffect } from "react";
import MenuBar from "./workspace/MenuBar";
import StatusBar from "./workspace/StatusBar";
import Layout from "./workspace/Layout";
import { layoutAtom, LeftSidebarPanel } from "../store/layout";
import { useAtom } from "jotai";
import { noteFileTreeAtom, taskFileTreeAtom } from "../store/files";
import NotePanel from "./workspace/NotePanel";

const WorkspaceWindow: React.FC<{ directory: string }> = ({ directory }) => {
  const [layout] = useAtom(layoutAtom);
  const [, setNoteFileTree] = useAtom(noteFileTreeAtom);
  const [, setTaskFileTree] = useAtom(taskFileTreeAtom);

  const leftSidebar = () => layout.leftSidebarPanel === LeftSidebarPanel.Note ? <NotePanel /> : <div>Task</div>;
  const rightSidebar = () => <div>right</div>

  useEffect(() => {
    const getKnowledgeFiles = async () => {
      const res = await window.api.invoke('workspace.get-knowledge-files', directory);
      if (res.success) setNoteFileTree(res.data as FileTreeNode);
    }
    const getProjectFiles = async () => {
      const res = await window.api.invoke('workspace.get-project-files', directory);
      if (res.success) setTaskFileTree(res.data as FileTreeNode);
    }
    const initWorkspace = async () => {
      getKnowledgeFiles();
      getProjectFiles();
    };

    initWorkspace();
  }, []);

  return (
    <div className="w-full h-screen flex flex-col">
      <MenuBar />
      <Layout leftSidebar={leftSidebar()} content="content" rightSidebar={rightSidebar()} />
      <StatusBar />
    </div>
  )
}

export default WorkspaceWindow;