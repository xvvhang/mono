type WindowType = 'launcher' | 'workspace' | 'settings';

type Settings = {
  theme: "auto" | "light" | "dark";
  lastWorkspace: string;
  workspaces: string[];
}

type InvokeResponse = {
  success: boolean;
  message?: string;
  data?: any;
}

interface Window {
  api: {
    invoke(channel: string, ...args: any[]): Promise<InvokeResponse>;
    send: (channel: string, ...args: any) => void;
    on: (channel: string, listener: (...args: any) => void) => void;
  };
}