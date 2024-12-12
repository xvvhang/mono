import { contextBridge, ipcRenderer } from "electron";
import Channels from "./shared/constants/channels";

contextBridge.exposeInMainWorld("api", {
  openLauncher: () => ipcRenderer.send(Channels.openLauncher),
  openSettings: () => ipcRenderer.send(Channels.openSettings),
  openWorkspace: (payload: OpenWorkspacePayload) => ipcRenderer.send(Channels.openWorkspace, payload),

  getSettings: (): Promise<GetSettingsResponse> => ipcRenderer.invoke(Channels.getSettings),
  getWorkspaces: (): Promise<GetWorkspacesResponse> => ipcRenderer.invoke(Channels.getWorkspaces),
  createWorkspace: (payload: CreateWorkspacePayload): Promise<CreateWorkspaceResponse> => ipcRenderer.invoke(Channels.createWorkspace, payload),

  getFolders: (): Promise<FetchFoldersResponse> => ipcRenderer.invoke(Channels.fetchFolders),
  getNotes: (): Promise<FetchNotesResponse> => ipcRenderer.invoke(Channels.fetchNotes),
});