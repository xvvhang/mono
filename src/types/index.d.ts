type WindowType = 'manager' | 'workspace' | 'settings';

type Workspace = {
  id: string;
  name: string;
  path: string;
}

type Settings = {
  lastWorkspace: Workspace | null;
  workspaces: Workspace[];
}

interface Window {
  api: {
    invoke(channel: string, ...args: any[]): Promise<any>;
    send: (channel: string, ...args: any) => void;
    on: (channel: string, listener: (...args: any) => void) => void;
  };
}