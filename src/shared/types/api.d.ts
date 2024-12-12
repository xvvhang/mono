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