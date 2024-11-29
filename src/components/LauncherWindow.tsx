import React from "react";
import WorkspaceCreation from "./launcher/WorkspaceCreation";
import WorkspaceList from "./launcher/WorkspaceList";

const LauncherWindow: React.FC = () => {
  return (
    <>
      <div className="drag h-screen flex">
        <div className="w-[60%]">
          <WorkspaceCreation />
        </div>
        <div className="no-drag w-[40%] bg-gray-3 select-none">
          <WorkspaceList />
        </div>
      </div>
    </>
  )
}

export default LauncherWindow;