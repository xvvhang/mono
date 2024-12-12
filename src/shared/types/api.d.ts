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
    getFolders: () => Promise<FetchFoldersResponse>;
    getNotes: () => Promise<FetchNotesResponse>;
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

interface FetchFoldersResponse extends InvokeResponse {
  data?: FolderWithSubFoldersAndNotes[]
}

interface FetchNotesResponse extends InvokeResponse {
  data?: Note[]
}