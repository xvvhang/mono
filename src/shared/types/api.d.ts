type InvokeResponse = {
  success: boolean;
  message?: string;
  data?: unknown;
};

interface Window {
  api: {
    openLauncher: () => void;
    openSettings: () => void;
    openWorkspace: (payload: OpenWorkspacePayload) => Promise<InvokeResponse>;
    
    getSettings: () => Promise<GetSettingsResponse>;

    getWorkspaces: () => Promise<GetWorkspacesResponse>;
    createWorkspace: (payload: CreateWorkspacePayload) => Promise<CreateWorkspaceResponse>;  

    getFolders: () => Promise<GetFoldersResponse>;

    getNotes: () => Promise<GetNotesResponse>;

    contextFolder: (payload?: ContextFolderPayload) => void;
    contextNote: () => void;
  };
}

interface OpenWorkspacePayload {
  workspace: string;
}

interface GetSettingsResponse extends InvokeResponse {
  data: Settings
}

interface GetWorkspacesResponse extends InvokeResponse {
  data: Workspace[]
}

interface CreateWorkspacePayload {
  name: string;
}

interface CreateWorkspaceResponse extends InvokeResponse {
  data?: Workspace
}

interface GetFoldersResponse extends InvokeResponse {
  data?: Folder[]
}

interface GetNotesResponse extends InvokeResponse {
  data?: Note[]
}

interface ContextFolderPayload {
  folderId?: string;
}

interface ContextNotePayload {
  folder?: string;
  note: string;
}