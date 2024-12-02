import { Button, TextField } from "@radix-ui/themes";
import { Dock, FolderClosed, SquarePlus } from 'lucide-react';
import { useState } from "react";

// TODO: rename this component and file
const WorkspaceCreation: React.FC = () => {
  const [isCreatingNewWorkspace, setIsCreatingNewWorkspace] = useState(false);
  const [newWorkspaceName, setNewWorkspaceName] = useState('');
  const [newWorkspaceLocation, setNewWorkspaceLocation] = useState('');

  const handleClickOpenExistingWorkspace = async () => {
    const res = await window.api.invoke('launcher.open-existing-workspace');
    if (!res.success) window.alert(res.message);
  }

  const handleClickOpenDirectory = async () => {
    const res = await window.api.invoke('system.select-directory', { defaultPath: newWorkspaceLocation });
    if (res.success) setNewWorkspaceLocation(res.data as string);
    else window.alert(res.message);
  }

  const handleClickCancelCreateNewWorkspace = () => {
    setIsCreatingNewWorkspace(false);
    setNewWorkspaceName('');
    setNewWorkspaceLocation('');
  }

  const handleClickSubmitCreateNewWorkspace = async () => {
    // TODO: add support for windows path 
    const directory = `${newWorkspaceLocation}/${newWorkspaceName}`;
    const res = await window.api.invoke('launcher.create-new-workspace', directory);
    // TODO: handle error
    if (!res.success) window.alert(res.message);
  }

  return (
    <div className="h-full p-16 flex flex-col gap-12">
      <div className="flex flex-col items-center gap-2 select-none">
        {/* TODO: add app icon */}
        <div className="no-drag w-32 h-32 bg-accent-10"></div>
        <div className="no-drag text-1 text-gray-11">Version 0.0.1</div>
      </div>
      <div className="no-drag flex flex-col gap-2">
        {
          isCreatingNewWorkspace ?
            <>
              <TextField.Root value={newWorkspaceName} placeholder="Workspace Name..." onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewWorkspaceName(e.target.value)}>
                <TextField.Slot>
                  <Dock size={16} />
                </TextField.Slot>
              </TextField.Root>
              <Button className="!justify-start !px-2" variant="outline" onClick={handleClickOpenDirectory}>
                <FolderClosed size={16} />
                <div>{ newWorkspaceLocation || 'Workspace Path...'}</div>
              </Button>
              <div className="flex gap-2">
                <Button className="!flex-1" variant="outline" onClick={handleClickCancelCreateNewWorkspace}>Cancel</Button>
                <Button className="!flex-1" disabled={!(newWorkspaceName && newWorkspaceLocation)} onClick={handleClickSubmitCreateNewWorkspace}>Create</Button>
              </div>
            </>
          :
            <>
              <Button variant="outline" onClick={handleClickOpenExistingWorkspace}>
                <FolderClosed size={16} />
                Open Existing Workspace...
              </Button>
              <Button onClick={() => setIsCreatingNewWorkspace(true)}>
                <SquarePlus size={16} />
                Create New Workspace...
              </Button>
            </>
        }
      </div>
    </div>
  )
}

export default WorkspaceCreation;
