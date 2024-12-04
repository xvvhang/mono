import { Theme } from "@radix-ui/themes";
import { useAtom } from "jotai";
import React, { useEffect } from "react";
import Launcher from './components/Launcher';
import Settings from './components/Settings';
import Workspace from './components/Workspace';
import "./index.css";
import { settingsAtom } from "./store/settings";

const search = new URLSearchParams(window.location.search);
const query = Object.fromEntries(search.entries());

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
      {query.type === 'launcher' && <Launcher />}
      {query.type === 'settings' && <Settings />}
      {query.type === 'workspace' && query.workspace && <Workspace directory={query.workspace} />}
    </Theme>
  )
}

export default App;
