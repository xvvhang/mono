import { Theme } from "@radix-ui/themes";
import { useAtom } from "jotai";
import React, { useEffect } from "react";
import Launcher from './components/Launcher';
import Settings from './components/Settings';
import Workspace from './components/Workspace';
import { settingsAtom } from "./store";

const queryParams = new URLSearchParams(window.location.search);
const queryObject = Object.fromEntries(queryParams.entries());

const App: React.FC = () => {
  const [, setSettings] = useAtom(settingsAtom);
  useEffect(() => {
    const init = async () => {
      const { success, data } = await window.api.invoke('app.get-settings');
      if (success) setSettings(data);
    }

    init();
  }, []);
  return (
    <Theme appearance="dark">
      {queryObject.type === 'launcher' && <Launcher />}
      {queryObject.type === 'settings' && <Settings />}
      {queryObject.type === 'workspace' && queryObject.workspace && <Workspace />}
    </Theme>
  )
}

export default App;
