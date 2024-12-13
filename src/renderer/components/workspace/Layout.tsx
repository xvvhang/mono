import { useAtom } from "jotai";
import { useEffect, useRef, useState } from "react";
import { layoutAtom } from "../../store/layout";

interface Layout {
  content?: React.ReactNode;
  leftSidebar?: React.ReactNode;
  rightSidebar?: React.ReactNode;
}

const Layout: React.FC<Layout> = ({ content, leftSidebar, rightSidebar }) => {
  const [layout, setLayout] = useAtom(layoutAtom);
  const [isResizing, setIsResizing] = useState<false | 'left' | 'right'>(false)
  const leftSidebarRef = useRef<HTMLDivElement>(null);
  const rightSidebarRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (event: MouseEvent) => {
    if (!isResizing) return;

    const ref = isResizing === 'left' ? leftSidebarRef : rightSidebarRef;
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();

    if (isResizing === 'left') {
      const newWidth = event.clientX - rect.left;
      setLayout({ ...layout, leftSidebarWidth: Math.max(newWidth, layout.leftSidebarMinWidth || 200) });
    } else {
      const newWidth = rect.right - event.clientX;
      setLayout({ ...layout, rightSidebarWidth: Math.max(newWidth, layout.rightSidebarMinWidth || 200) });
    }
  }

  useEffect(() => {
    const moveHandler = (event: MouseEvent) => {
      requestAnimationFrame(() => handleMouseMove(event));
    }

    window.addEventListener('mousemove', moveHandler);
    window.addEventListener('mouseup', () => setIsResizing(false));

    return () => {
      window.removeEventListener('mousemove', moveHandler);
      window.removeEventListener('mouseup', () => setIsResizing(false));
    }
  }, [isResizing])

  return (
    <div className="flex-1 flex">
      {layout.leftSidebarOpen && (
        <div
          className="flex-0 relative border-r border-gray-6"
          style={{ width: layout.leftSidebarWidth }}
          ref={leftSidebarRef}>
          {leftSidebar}
          <div
            className={
              "absolute top-0 bottom-0 -right-0.5 w-1 hover:cursor-col-resize hover:bg-accent-6" +
              (isResizing === 'left' && ' bg-accent-6' || '')
            }
            onMouseDown={() => setIsResizing('left')}>
          </div>
        </div>
      )}
      <div className="flex-1">{content}</div>
      {layout.rightSidebarOpen && (
        <div
          className="flex-0 relative border-l border-gray-6"
          style={{ width: layout.rightSidebarWidth }}
          ref={rightSidebarRef}>
          {rightSidebar}
          <div
            className={
              "absolute top-0 bottom-0 -left-0.5 w-1 hover:cursor-col-resize hover:bg-accent-6" +
              (isResizing === 'right' && ' bg-accent-6' || '')
            }
            onMouseDown={() => setIsResizing('right')}>
          </div>
        </div>
      )}
    </div>
  )
}

export default Layout;
