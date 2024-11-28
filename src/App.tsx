import React, { useEffect } from "react";
import './index.css';
import "@radix-ui/themes/styles.css";
import { useAtom } from "jotai";
import { settingsAtom } from "@/store";
import { Theme } from "@radix-ui/themes";
import ManagerWindow from '@/components/ManagerWindow';
import WorkspaceWindow from '@/components/WorkspaceWindow';
import SettingsWindow from '@/components/SettingsWindow';

const queryParams = new URLSearchParams(window.location.search);
const queryObject = Object.fromEntries(queryParams.entries());

const App: React.FC = () => {
  const [settings, setSettings] = useAtom(settingsAtom)

  useEffect(() => {
    const init = async () => {
      const _settings = await window.api.invoke('app.settings.read');
      setSettings(_settings);
    }

    init();
  }, []);

  return (
    <Theme appearance={ settings.theme === "auto" ?  (window.matchMedia('(prefers-color-scheme: dark)').matches ? "dark" : "light") : settings.theme }> 
      {queryObject.type === 'manager' && <ManagerWindow />}
      {queryObject.type === 'settings' && <SettingsWindow />}
      {queryObject.type === 'workspace' && queryObject.workspace && <WorkspaceWindow />}
    </Theme>
  )
}

export default App;