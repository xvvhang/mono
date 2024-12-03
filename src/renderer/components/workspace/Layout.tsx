import MenuBar from "./MenuBar";
import Sidebar from "./Sidebar";
import Content from "./Content";
import StatusBar from "./StatusBar";
import { useEffect, useRef, useState } from "react";

const Layout: React.FC = () => {
  const [hideLeftSidebar, setHideLeftSidebar] = useState(false);
  const [hideRightSidebar, setHideRightSidebar] = useState(false);
  const [leftSidebarWidth, setLeftSidebarWidth] = useState(320);
  const [rightSidebarWidth, setRightSidebarWidth] = useState(320);
  const [isResizing, setIsResizing] = useState(false);
  const [resizingSide, setResizingSide] = useState('left');
  const leftSidebarRef = useRef<HTMLDivElement>(null);
  const rightSidebarRef = useRef<HTMLDivElement>(null);

  const handleMouseDownResizeHandler = (side: 'left' | 'right') => {
    setIsResizing(true);
    setResizingSide(side);
  }

  const handleMouseMove = (event: React.MouseEvent) => {
    if (!isResizing) return;
    const ref = resizingSide === 'left' ? leftSidebarRef : rightSidebarRef;
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      if (resizingSide === 'left') {
        const newWidth = event.clientX - rect.left;
        if (newWidth > 100) {
          setLeftSidebarWidth(newWidth);
        }
        if (newWidth < 50) {
          setHideLeftSidebar(true);
          setIsResizing(false);
        }
      } else {
        const newWidth = rect.right - event.clientX;
        if (newWidth > 100) {
          setRightSidebarWidth(newWidth);
        }
        if (newWidth < 50) {
          setHideRightSidebar(true);
          setIsResizing(false);
        }
      }
    }
  }

  return (
    <div className="w-full h-screen flex flex-col" onMouseMove={handleMouseMove} onMouseUp={() => setIsResizing(false)}>
      <MenuBar />
      <div className="flex-1 flex">
        {
          !hideLeftSidebar && (
            <div
              ref={leftSidebarRef}
              className="relative border-gray-6 border-r"
              style={{ width: leftSidebarWidth }}
            >
              <Sidebar />
              <div
                onMouseDown={() => handleMouseDownResizeHandler('left')}
                className="absolute top-0 bottom-0 -right-0.5 w-1 cursor-ew-resize select-none hover:bg-accent-6"
              ></div>
            </div>
          )
        }
        <div className="flex-1"><Content /></div>
        {
          !hideRightSidebar && (
            <div
              ref={rightSidebarRef}
              className="relative border-gray-6 border-l"
              style={{ width: rightSidebarWidth }}
            >
              <Sidebar />
              <div
                onMouseDown={() => handleMouseDownResizeHandler('right')}
                className="absolute top-0 bottom-0 -left-0.5 w-1 cursor-ew-resize select-none hover:bg-accent-6"
              ></div>
            </div>
          )
        }
      </div>
      <StatusBar />
    </div>
  )
}

export default Layout;