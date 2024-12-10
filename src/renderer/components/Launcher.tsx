import LauncherWorkspaceList from "./launcher/LauncherWorkspaceList";
import LauncherLogoVersion from "./launcher/LauncherLogoVersion";
import LauncherWorkspaceCreation from "./launcher/LauncherWorkspaceCreation";

const LauncherWindow: React.FC = () => {
  return (
    <div className="h-screen flex">
      <div className="flex-1 bg-gray-1 p-20 flex flex-col justify-between">
        <LauncherLogoVersion />
        <LauncherWorkspaceCreation />
      </div>
      <div className="no-drag flex-0 w-[40%] bg-gray-2">
        <LauncherWorkspaceList />
      </div>
    </div>
  );
}

export default LauncherWindow;