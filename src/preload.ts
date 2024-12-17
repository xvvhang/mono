import { contextBridge, ipcRenderer } from "electron";
import Channels from "./shared/constants/channels";

contextBridge.exposeInMainWorld("api", {
  openLauncher: () => ipcRenderer.send(Channels.openLauncher),
  openSettings: () => ipcRenderer.send(Channels.openSettings),
  openWorkspace: (payload: OpenWorkspacePayload) => ipcRenderer.send(Channels.openWorkspace, payload),

  getSettings: (): Promise<GetSettingsResponse> => ipcRenderer.invoke(Channels.getSettings),

  getWorkspaces: (): Promise<GetWorkspacesResponse> => ipcRenderer.invoke(Channels.getWorkspaces),
  createWorkspace: (payload: CreateWorkspacePayload): Promise<CreateWorkspaceResponse> => ipcRenderer.invoke(Channels.createWorkspace, payload),

  getFolders: (): Promise<GetFoldersResponse> => ipcRenderer.invoke(Channels.getFolders),

  getNotes: (): Promise<GetNotesResponse> => ipcRenderer.invoke(Channels.getNotes),

  contextFolder: (payload: ContextFolderPayload) => ipcRenderer.send(Channels.contextFolder, payload),
  contextNote: (payload: ContextNotePayload) => ipcRenderer.send(Channels.contextNote, payload),
});