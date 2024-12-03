import React, { useRef, useState } from "react";
import MenuBar from "./workspace/MenuBar";
import StatusBar from "./workspace/StatusBar";
import { layoutAtom } from "../store/layout";
import { useAtom } from "jotai";
import Sidebar from "./workspace/Sidebar";

// TODO: refactor layout
const WorkspaceWindow: React.FC = () => {
  const [layout, setLayout] = useAtom(layoutAtom);
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
          setLayout({ ...layout, leftSidebarWidth: newWidth });
        }
      } else {
        const newWidth = rect.right - event.clientX;
        if (newWidth > 100) {
          setLayout({ ...layout, rightSidebarWidth: newWidth });
        }
      }
    }
  }

  return (
    <div
      className="w-full h-screen flex flex-col"
      onMouseMove={handleMouseMove}
      onMouseUp={() => setIsResizing(false)}
    >
      <MenuBar />
      <div className="flex-1 flex">
        {
          layout.leftSidebarOpen && (
            <div
              ref={leftSidebarRef}
              className="relative border-r border-gray-6"
              style={{ width: layout.leftSidebarWidth }}
            >
              <Sidebar side="left" />
              <div
                className="absolute top-0 bottom-0 -right-0.5 w-1 curosr-es-resize select-none hover:bg-accent-6"
                onMouseDown={() => handleMouseDownResizeHandler('left')}
              ></div>
            </div>
          )
        }
        <div className="flex-1"></div>
        {
          layout.rightSidebarOpen && (
            <div
              ref={rightSidebarRef}
              className="relative border-l border-gray-6"
              style={{ width: layout.rightSidebarWidth }}
            >
              <Sidebar side="right" />
              <div
                className="absolute top-0 bottom-0 -left-0.5 w-1 cursor-ew-resize select-none hover:bg-accent-6"
                onMouseDown={() => handleMouseDownResizeHandler('right')}
              ></div>
            </div>
          )
        }
      </div>
      <StatusBar />
    </div>
  )
}

export default WorkspaceWindow;