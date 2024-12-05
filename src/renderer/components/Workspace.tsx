import React, { useEffect } from "react";
import MenuBar from "./workspace/MenuBar";
import StatusBar from "./workspace/StatusBar";
import Layout from "./workspace/Layout";
import { layoutAtom, LeftSidebarPanel } from "../store/layout";
import { useAtom } from "jotai";
import { fileTreeAtom } from "../store/files";
import NotePanel from "./workspace/NotePanel";

const WorkspaceWindow: React.FC<{ directory: string }> = ({ directory }) => {
  const [layout] = useAtom(layoutAtom);
  const [fileTree, setFileTree] = useAtom(fileTreeAtom);

  const leftSidebar = () => layout.leftSidebarPanel === LeftSidebarPanel.Note ? <NotePanel /> : <div>Task</div>;
  const rightSidebar = () => <div>right</div>

  useEffect(() => {
    const initWorkspace = async () => {
      const res = await window.api.invoke('workspace.get-file-tree', directory);
      if (res.success) setFileTree(res.data as FileTreeNode);
    };

    initWorkspace();
  }, []);

  return (
    <div className="w-full h-screen flex flex-col">
      <MenuBar />
      <Layout leftSidebar={leftSidebar()} content={<div>{ JSON.stringify(fileTree) }</div>} rightSidebar={rightSidebar()} />
      <StatusBar />
    </div>
  )
}

export default WorkspaceWindow;