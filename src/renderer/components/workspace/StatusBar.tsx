import { layoutAtom } from "@/renderer/store/layout";
import StatusBarIconButton from "./statusbar/StatusBarIconButton";
import { Bell, Package2, ListTodo, ListTree, Settings } from "lucide-react";
import { useAtom } from "jotai";

const StatusBar: React.FC = () => {
  const [layout, setLayout] = useAtom(layoutAtom);

  const handleClickOpenSettingsWindow = () => window.api.send("app.open-settings");
  const handleClickOpenLauncherWindow = () => window.api.send("app.open-launcher");
  const handleClickNotePanel = () => setLayout({
    ...layout,
    leftSidebarOpen: layout.leftSidebarOpen && layout.leftSidebarPanel === 'note' ? false : true,
    leftSidebarPanel: 'note'
  });
  const handleClickTodoPanel = () => setLayout({
    ...layout,
    leftSidebarOpen: layout.leftSidebarOpen && layout.leftSidebarPanel === 'todo' ? false : true,
    leftSidebarPanel: 'todo'
  });

  return (
    <div className="h-6 border-t border-gray-6 bg-gray-1 px-3 flex justify-between text-gray-11">
      <div className="flex items-center gap-1">
        <StatusBarIconButton handleClick={handleClickOpenSettingsWindow}>
          <Settings size={15} strokeWidth={2} />
        </StatusBarIconButton>
        <StatusBarIconButton handleClick={handleClickOpenLauncherWindow}>
          <Package2 size={16} strokeWidth={2} />
        </StatusBarIconButton>
        <StatusBarIconButton isActive={layout.leftSidebarOpen && layout.leftSidebarPanel === 'note'} handleClick={handleClickNotePanel}>
          <ListTree size={16} strokeWidth={2} />
        </StatusBarIconButton>
        <StatusBarIconButton isActive={layout.leftSidebarOpen && layout.leftSidebarPanel === 'todo'} handleClick={handleClickTodoPanel}>
          <ListTodo size={16} strokeWidth={2} />
        </StatusBarIconButton>
      </div>
      <div className="flex items-center gap-3">
        {/* TODO: add notification handler */}
        <StatusBarIconButton>
          <Bell size={16} strokeWidth={2} />
        </StatusBarIconButton>
      </div>
    </div>
  );
};

export default StatusBar;