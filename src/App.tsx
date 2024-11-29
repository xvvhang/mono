import React, { useEffect } from "react";
import './index.css';
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";
import LauncherWindow from '@/components/LauncherWindow';
import WorkspaceWindow from '@/components/WorkspaceWindow';
import SettingsWindow from '@/components/SettingsWindow';
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
      {queryObject.type === 'launcher' && <LauncherWindow />}
      {queryObject.type === 'settings' && <SettingsWindow />}
      {queryObject.type === 'workspace' && queryObject.workspace && <WorkspaceWindow />}
    </Theme>
  )
}

export default App;