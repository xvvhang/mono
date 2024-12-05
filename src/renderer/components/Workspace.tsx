import React from "react";
import MenuBar from "./workspace/MenuBar";
import StatusBar from "./workspace/StatusBar";
import Layout from "./workspace/Layout";
import { layoutAtom, LeftSidebarPanel } from "../store/layout";
import { useAtom } from "jotai";

const WorkspaceWindow: React.FC<{ directory: string }> = ({ directory }) => {
  const [layout, setLlayout] = useAtom(layoutAtom);
  const leftSidebar = () => layout.leftSidebarPanel === LeftSidebarPanel.Note ? <div>Note</div> : <div>Task</div>;
  const rightSidebar = () => <div>right</div>
  return (
    <div className="w-full h-screen flex flex-col">
      <MenuBar />
      <Layout leftSidebar={leftSidebar()} content={<div>content</div>} rightSidebar={rightSidebar()} />
      <StatusBar />
    </div>
  )
}

export default WorkspaceWindow;