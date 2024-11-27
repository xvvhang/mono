import React, { useEffect } from "react";
import './index.css';
import { useAtom } from "jotai";
import { settingsAtom } from "@/store";
import ManagerWindow from '@/components/ManagerWindow';
import WorkspaceWindow from '@/components/WorkspaceWindow';
import SettingsWindow from '@/components/SettingsWindow';

const queryParams = new URLSearchParams(window.location.search);
const queryObject = Object.fromEntries(queryParams.entries());

const App: React.FC = () => {
  const [_, setSettings] = useAtom(settingsAtom)
  useEffect(() => {
    const init = async () => {
      const settings = await window.api.invoke('app.settings.read');
      setSettings(settings);
    }

    init();
  }, []);
  return (
    <>
      {queryObject.type === 'manager' && <ManagerWindow />}
      {queryObject.type === 'settings' && <SettingsWindow />}
      {queryObject.type === 'workspace' && queryObject.workspace && <WorkspaceWindow />}
    </>
  )
}

export default App;