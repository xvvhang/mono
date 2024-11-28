import React from "react";
import WorkspaceCreation from "./manager/WorkspaceCreation";
import WorkspaceList from "./manager/WorkspaceList";

const ManagerWindow: React.FC = () => {
  return (
    <>
      <div className="drag h-screen flex">
        <div className="w-[60%]">
          <WorkspaceCreation />
        </div>
        <div className="w-[40%] bg-gray-3">
          <WorkspaceList />
        </div>
      </div>
    </>
  )
}

export default ManagerWindow;