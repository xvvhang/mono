import { settingsAtom } from "@/store";
import { useAtom } from "jotai";

const WorkspaceList: React.FC = () => {
  const [settings] = useAtom(settingsAtom);
  return (
    <div className="h-full p-2 flex">
      {
        settings?.workspaces?.length > 0 ?
          <ul>
            {settings.workspaces.map((workspace, index) => (
              <li key={index}>{workspace}</li>
            ))}
          </ul> :
          <div className="flex-1 self-center text-center text-2 text-gray-11">No Recent Workspaces</div>
      }
    </div>
  )
}

export default WorkspaceList;