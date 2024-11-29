import MenuBar from "./MenuBar";
import Sidebar from "./Sidebar";
import Content from "./Content";
import StatusBar from "./StatusBar";
import { useEffect, useState } from "react";

const Layout: React.FC = () => {
  const [sidebarWidth, setSidebarWidth] = useState(200);
  const [isResizingSidebar, setIsResizingSidebar] = useState(false);

  const handleMouseDownResizeHandle = (e: React.MouseEvent) => {
    setIsResizingSidebar(true);
  }

  const handleMouseMove = (e: MouseEvent) => {
    if (isResizingSidebar) {
      setSidebarWidth(e.clientX);
    }
  }

  const handleMouseUp = () => {
    setIsResizingSidebar(false);
  }

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    }
  }, [isResizingSidebar])

  return (
    <div className="w-full h-screen flex flex-col">
      <MenuBar />
      <div className="flex-1 flex">
        <div className="relative" style={{ width: sidebarWidth }}>
          <Sidebar />
          <div className="z-10 absolute bg-accent-9 w-1 cursor-ew-resize top-0 bottom-0 right-0" onMouseDown={handleMouseDownResizeHandle}></div>
        </div>
        <div className="flex-1 bg-gray-10">
          <Content />
        </div>
      </div>
      <StatusBar />
    </div>
  )
}

export default Layout;