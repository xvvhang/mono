import { createRoot } from 'react-dom/client';
import './index.css';
import ManagerWindow from '@/components/ManagerWindow';
import WorkspaceWindow from '@/components/WorkspaceWindow';
import SettingsWindow from '@/components/SettingsWindow';

const queryParams = new URLSearchParams(window.location.search);
const queryObject = Object.fromEntries(queryParams.entries());

const rootDOM = document.getElementById('root')
const appRoot = createRoot(rootDOM);

appRoot.render(queryObject.type === 'workspace' ? <WorkspaceWindow workspace={queryObject.workspace} /> : queryObject.type === 'settings' ? <SettingsWindow /> : <ManagerWindow />);
