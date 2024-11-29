import StatusBarIconButton from "./statusbar/StatusBarIconButton";
import { Bell, Package2, ListTodo, ListTree, Settings } from "lucide-react";

const StatusBar: React.FC = () => {
  // TODO: global state for active panels
  return (
    <div className="h-6 border-t border-gray-6 bg-gray-1 px-3 flex justify-between text-gray-11">
      <div className="flex items-center gap-1">
        <StatusBarIconButton label="Open Settings Window">
          <Settings size={15} strokeWidth={2} />
        </StatusBarIconButton>
        <StatusBarIconButton label="Open Launcher Window">
          <Package2 size={16} strokeWidth={2} />
        </StatusBarIconButton>
        <StatusBarIconButton label="Toggle Folder Tree Panel">
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
  )
}

export default StatusBar;