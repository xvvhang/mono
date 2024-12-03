import StatusBarIconButton from "./statusbar/StatusBarIconButton";
import { Bell, Package2, ListTodo, ListTree, Settings } from "lucide-react";

const StatusBar: React.FC = () => {
  const handleClickOpenSettingsWindow = () => {};

  const handleClickOpenLauncherWindow = () =>
    window.api.send("app.open-launcher");

  return (
    <div className="h-6 border-t border-gray-6 bg-gray-1 px-3 flex justify-between text-gray-11">
      <div className="flex items-center gap-1">
        <StatusBarIconButton handleClick={handleClickOpenSettingsWindow}>
          <Settings size={15} strokeWidth={2} />
        </StatusBarIconButton>
        <StatusBarIconButton handleClick={handleClickOpenLauncherWindow}>
          <Package2 size={16} strokeWidth={2} />
        </StatusBarIconButton>
        <StatusBarIconButton>
          <ListTree size={16} strokeWidth={2} />
        </StatusBarIconButton>
        <StatusBarIconButton>
          <ListTodo size={16} strokeWidth={2} />
        </StatusBarIconButton>
      </div>
      <div className="flex items-center gap-3">
        <StatusBarIconButton>
          <Bell size={16} strokeWidth={2} />
        </StatusBarIconButton>
      </div>
    </div>
  );
};

export default StatusBar;
