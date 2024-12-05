import { layoutAtom } from "@/renderer/store/layout";
import { useAtom } from "jotai";
import { useEffect, useRef, useState } from "react";

interface LayoutProps {
  content?: React.ReactNode;
  leftSidebar?: React.ReactNode;
  rightSidebar?: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({
  content,
  leftSidebar,
  rightSidebar
}) => {
  const [layout, setLayout] = useAtom(layoutAtom);

  const [resizing, setResizing] = useState<false | 'left' | 'right'>(false)
  const leftSidebarRef = useRef<HTMLDivElement>(null);
  const rightSidebarRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (event: MouseEvent) => {
    if (!resizing) return;

    const ref = resizing === 'left' ? leftSidebarRef : rightSidebarRef;
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();

    if (resizing === 'left') {
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
    window.addEventListener('mouseup', () => setResizing(false));

    return () => {
      window.removeEventListener('mousemove', moveHandler);
      window.removeEventListener('mouseup', () => setResizing(false));
    }
  }, [resizing])

  return (
    <div className="flex-1 flex">
      { layout.leftSidebarOpen && (
        <div
          className="flex-0 relative border-r border-gray-6"
          style={{ width: layout.leftSidebarWidth }}
          ref={leftSidebarRef}
        >
          { leftSidebar }
          <div
            className={
              "absolute top-0 bottom-0 -right-0.5 w-1 hover:cursor-col-resize hover:bg-accent-6" +
              (resizing === 'left' && ' bg-accent-6' || '')
            }
            onMouseDown={() => setResizing('left')}
          ></div>
        </div>
      )}
      <div className="flex-1">{ content }</div>
      { layout.rightSidebarOpen && (
        <div
          className="flex-0 relative border-l border-gray-6"
          style={{ width: layout.rightSidebarWidth }}
          ref={rightSidebarRef}
        >
          { rightSidebar }
          <div
            className={
              "absolute top-0 bottom-0 -left-0.5 w-1 hover:cursor-col-resize hover:bg-accent-6" +
              (resizing === 'right' && ' bg-accent-6' || '')
            }
            onMouseDown={() => setResizing('right')}
          ></div>
        </div>
      )}
    </div>
  )
}

export default Layout;