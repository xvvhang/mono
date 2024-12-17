import Channels from "../../shared/constants/channels";
import { useEffect } from "react";

export const useOnceListener = (channel: Channels, listener: MessageListener) => {
  useEffect(() => {
    window.api.once(channel, listener);
  }, []);
}

export const useListener = (channel: Channels, listener: MessageListener) => {
  useEffect(() => {
    window.api.on(channel, listener);
    return () => {
      window.api.off(channel, listener);
    }
  }, [channel, listener]);
}
