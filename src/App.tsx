import React, { useEffect } from "react";
import './index.css';
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";
import Launcher from '@/components/Launcher';
import Workspace from '@/components/Workspace';
import Settings from '@/components/Settings';
import { useAtom } from "jotai";
import { settingsAtom } from "./store";

const queryParams = new URLSearchParams(window.location.search);
const queryObject = Object.fromEntries(queryParams.entries());

const App: React.FC = () => {
  const [_, setSettings] = useAtom(settingsAtom);
  useEffect(() => {
    const init = async () => {
      const { success, data } = await window.api.invoke('app.get-settings');
      if (success) setSettings(data);
    }

    init();
  }, []);
  return (
    <Theme> 
      {queryObject.type === 'launcher' && <Launcher />}
      {queryObject.type === 'settings' && <Settings />}
      {queryObject.type === 'workspace' && queryObject.workspace && <Workspace />}
    </Theme>
  )
}

export default App;