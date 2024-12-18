import { useAtom } from "jotai";
import { Bell, ListTodo, ListTree, Package2, Settings } from "lucide-react";
import { layoutAtom, LeftSidebarPanel } from "../../store/layout";
import StatusBarIconButton from "./status-bar/StatusBarIconButton";

const StatusBar: React.FC = () => {
  const [layout, setLayout] = useAtom(layoutAtom);

  const handleClickOpenSettingsWindow = () => window.api.openSettings();
  const handleClickOpenLauncherWindow = () => window.api.openLauncher();

  const handleClickNotesPanel = () => setLayout({
    ...layout,
    leftSidebarOpen: layout.leftSidebarOpen && layout.leftSidebarPanel === LeftSidebarPanel.Note ? false : true,
    leftSidebarPanel: LeftSidebarPanel.Note
  });

  const handleClickTasksPanel = () => setLayout({
    ...layout,
    leftSidebarOpen: layout.leftSidebarOpen && layout.leftSidebarPanel === LeftSidebarPanel.Task ? false : true,
    leftSidebarPanel: LeftSidebarPanel.Task
  });

  return (
    <div className="drag h-6 border-t border-gray-6 bg-gray-1 px-3 flex justify-between text-gray-11">
      <div className="no-drag flex items-center gap-1">
        <StatusBarIconButton handleClick={handleClickOpenSettingsWindow}>
          <Settings size={15} strokeWidth={2} />
        </StatusBarIconButton>
        <StatusBarIconButton handleClick={handleClickOpenLauncherWindow}>
          <Package2 size={16} strokeWidth={2} />
        </StatusBarIconButton>
        <StatusBarIconButton
          isActive={layout.leftSidebarOpen && layout.leftSidebarPanel === LeftSidebarPanel.Note}
          handleClick={handleClickNotesPanel}
        >
          <ListTree size={16} strokeWidth={2} />
        </StatusBarIconButton>
        <StatusBarIconButton
          isActive={layout.leftSidebarOpen && layout.leftSidebarPanel === LeftSidebarPanel.Task}
          handleClick={handleClickTasksPanel}
        >
          <ListTodo size={16} strokeWidth={2} />
        </StatusBarIconButton>
      </div>
      <div className="no-drag flex items-center gap-3">
        {/* TODO: add notification handler */}
        <StatusBarIconButton>
          <Bell size={16} strokeWidth={2} />
        </StatusBarIconButton>
      </div>
    </div>
  );
};

export default StatusBar;
