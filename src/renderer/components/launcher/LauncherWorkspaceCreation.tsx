import { Button, TextField } from "@radix-ui/themes";
import { Package2 } from "lucide-react";
import { useState } from "react";

const LauncherWorkspaceCreation: React.FC = () => {
  const [isCreating, setIsCreating] = useState(false);
  const [newWorkspace, setNewWorkspace] = useState('');

  const handleCancelCreate = () => {
    setIsCreating(false);
    setNewWorkspace('');
  }

  const handleConfirmCreate = async () => {
    await window.api.invoke('launcher.create-workspace', newWorkspace);
  }

  return (
    <>
      {!isCreating && (
        <div className="flex flex-col">
          <Button className="!w-full" onClick={() => setIsCreating(true)}>Create New Workspace...</Button>
        </div>
      )}
      {isCreating && (
        <div className="flex flex-col gap-2">
          <TextField.Root
            value={newWorkspace}
            placeholder="Workspace Name..."
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewWorkspace(e.target.value)}>
            <TextField.Slot>
              <Package2 size={16} strokeWidth={2} />
            </TextField.Slot>
          </TextField.Root>
          <div className="flex gap-2">
            <Button className="!flex-1" variant="outline" onClick={handleCancelCreate}>Cancel</Button>
            <Button className="!flex-1" onClick={handleConfirmCreate}>Create</Button>
          </div>
        </div>
      )}
    </>
  )
}

export default LauncherWorkspaceCreation;