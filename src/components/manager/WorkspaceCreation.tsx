import { Button, TextField } from "@radix-ui/themes";
import { SquarePlus, FolderClosed, Dock } from 'lucide-react';
import { useState } from "react";

const WorkspaceCreation: React.FC = () => {
  const [isCreatingNewWorkspace, setIsCreatingNewWorkspace] = useState(false);
  const [newWorkspaceName, setNewWorkspaceName] = useState('');
  const [newWorkspaceLocation, setNewWorksapceLocation] = useState('');

  const handleClickOpenExistingWorkspace = async () => {
    await window.api.invoke('app.workspace.open-existing-workspace');
  }

  const handleClickOpenDirectory = async () => {
    const res = await window.api.invoke('app.workspace.open-directory', { defaultPath: newWorkspaceLocation });
    if (res.success) setNewWorksapceLocation(res.data);
  }

  const handleClickCancelCreateNewWorkspace = () => {
    setIsCreatingNewWorkspace(false);
    setNewWorkspaceName('');
    setNewWorksapceLocation('');
  }

  const handleClickSubmitCreateNewWorkspace = async () => {
    // TODO: 兼容 Windows
    const folder = `${newWorkspaceLocation}/${newWorkspaceName}`;
    await window.api.invoke('app.workspace.create-new-workspace', folder);
  }

  return (
    <div className="h-full p-16 flex flex-col gap-12">
      <div className="flex flex-col items-center gap-2 select-none">
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