type WindowType = 'manager' | 'workspace' | 'settings';

type Settings = {
  theme: "auto" | "light" | "dark";
  lastWorkspace: string;
  workspaces: string[];
}

interface Window {
  api: {
    invoke(channel: string, ...args: any[]): Promise<any>;
    send: (channel: string, ...args: any) => void;
    on: (channel: string, listener: (...args: any) => void) => void;
  };
}