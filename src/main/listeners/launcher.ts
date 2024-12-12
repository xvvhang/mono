import { openWorkspaceWindow } from "../modules/windows";
import { createWorkspace, fetchWorkspaces } from "../modules/workspace";
import { setSettings } from "../modules/settings";

export const getWorkspacesListener = async (): Promise<GetWorkspacesResponse> => {
  const workspaces = await fetchWorkspaces();
  return { success: true, data: workspaces };
};

export const openWorkspaceListener = async (event: Electron.IpcMainInvokeEvent, workspace: string) => {
  const workspaces = await fetchWorkspaces();
  const target = workspaces.find((w) => w.id === workspace);
  openWorkspaceWindow(target.id);
  setSettings({ lastWorkspace: target.id });
  event.sender.close();
};

export const createWorkspaceListener = async (event: Electron.IpcMainInvokeEvent, name: string): Promise<CreateWorkspaceResponse> => {
  const workspaces = await fetchWorkspaces();
  const exists = workspaces.find((w) => w.name === name);
  if (exists) return { success: false, message: "Workspace already exists" };

  const workspace = await createWorkspace(name);
  openWorkspaceWindow(workspace.id);
  setSettings({ lastWorkspace: workspace.id });
  event.sender.close();
  return { success: true };
};
