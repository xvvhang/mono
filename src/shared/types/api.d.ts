type InvokeResponse = {
  success: boolean;
  message?: string;
  data?: unknown;
};

interface Window {
  api: {
    invoke(channel: string, ...args: unknown[]): Promise<InvokeResponse>;
    send: (channel: string, ...args: unknown) => void;
    on: (channel: string, listener: (...args: unknown) => void) => void;
  };
}
