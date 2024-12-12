import { Workspace } from "@prisma/client";
import { Package2 } from "lucide-react";
import { useEffect, useState } from "react";

const LauncherWorkspaceList: React.FC = () => {
  const [workspaceList, setWorkspaceList] = useState<Workspace[]>([])

  const initWorkspaceList = async () => {
    const res = await window.api.getWorkspaces();
    if (res.success) setWorkspaceList(res.data as Workspace[]);
  }

  useEffect(() => {
    initWorkspaceList();
  }, [])

  return (
    <>
      {/* TODO: change placeholder's style */}
      {workspaceList.length === 0 && (
        <div className="h-full flex">
          <div className="m-auto text-gray-11">No Workspaces</div>
        </div>
      )}
      {workspaceList.length > 0 && (
        <div className="flex flex-col gap-2">
          {workspaceList.map((workspace) => (
            // TODO: change list item's style
            <div key={workspace.id} className="flex items-center gap-2">
              <Package2 size={14} />
              <div className="text-sm truncate">{workspace.name}</div>
            </div>
          ))}
        </div>
      )}
    </>
  )
}

export default LauncherWorkspaceList;