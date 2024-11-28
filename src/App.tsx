import React from "react";
import './index.css';
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";
import ManagerWindow from '@/components/ManagerWindow';
import WorkspaceWindow from '@/components/WorkspaceWindow';
import SettingsWindow from '@/components/SettingsWindow';

const queryParams = new URLSearchParams(window.location.search);
const queryObject = Object.fromEntries(queryParams.entries());

const App: React.FC = () => {
  return (
    <Theme> 
      {queryObject.type === 'manager' && <ManagerWindow />}
      {queryObject.type === 'settings' && <SettingsWindow />}
      {queryObject.type === 'workspace' && queryObject.workspace && <WorkspaceWindow />}
    </Theme>
  )
}

export default App;