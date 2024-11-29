import { settingsAtom } from "@/store";
import { useAtom } from "jotai";
import { Dock } from "lucide-react";

const WorkspaceList: React.FC = () => {
  const [settings] = useAtom(settingsAtom);

  const handleClickWorkspace = async (folder: string) => {
    const res = await window.api.invoke('launcher.open-workspace', folder);
    if (!res.success) console.error(res.message);
  }

  const handleContextWorkspace = async (folder: string) => window.api.send('launcher.context-workspace', folder);

  return (
    <div className="w-full h-full flex flex-col">
      {
        settings?.workspaces?.length > 0 ?
          <ul className="h-full overflow-auto p-2 flex flex-col gap-2">
            {
              settings.workspaces.map((folder, index) => (
                <li className="border border-gray-6 rounded-2 bg-gray-2 p-2 hover:bg-gray-3" key={index} onClick={() => handleClickWorkspace(folder)} onContextMenu={() => handleContextWorkspace(folder)}>
                  <div className="flex items-center gap-1 text-gray-12">
                    <Dock size={14} />
                    <span className="text-1 font-bold">{folder.split('/').pop()}</span>
                  </div>
                  <p className="text-1 text-gray-11">{folder}</p>
                </li>
              ))
            }
          </ul> :
          <div className="m-auto text-center text-2 text-gray-11">No Recent Workspaces</div>
      }
    </div>
  )
}

export default WorkspaceList;