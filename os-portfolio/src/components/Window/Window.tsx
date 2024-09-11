import React, { useState } from 'react';  
import { Rnd } from 'react-rnd';
import { Window as WindowType } from '@/types/types';
import { WindowHeader } from './WindowHeader';
import { useWindowStyles, useWindowCallbacks } from '@/hooks/windowHooks';

interface WindowProps {
  window: WindowType;
  isActive: boolean;
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  onRestore: () => void;
  onFocus: () => void;
  onUpdatePosition: (position: { x: number; y: number }) => void;
  onUpdateSize: (size: { width: number; height: number }) => void;
  children: React.ReactNode;
}

const Window: React.FC<WindowProps> = ({
  window,
  isActive,
  onClose,
  onMinimize,
  onMaximize,
  onRestore,
  onFocus,
  onUpdatePosition,
  onUpdateSize,
  children
}) => {
  const [zIndex, setZIndex] = useState(40);
  const { windowContentStyle, windowClassName } = useWindowStyles(window, isActive);
  const { handleDragStop, handleResize, handleFocus } = useWindowCallbacks(
    onUpdatePosition,
    onUpdateSize,
    onFocus,
    setZIndex
  );

  const windowContent = (
    <div className={windowClassName} style={windowContentStyle} onClick={handleFocus}>
      <WindowHeader
        name={window.name}
        isMaximized={window.isMaximized}
        onMinimize={onMinimize}
        onMaximize={onMaximize}
        onRestore={onRestore}
        onClose={onClose}
      />
      <div className="p-4 h-full overflow-auto backdrop-blur-2xl bg-black">
        {children}
      </div>
    </div>
  );

  if (window.isMaximized) {
    return <div className="fixed inset-0">{windowContent}</div>;
  }

  return (
    <Rnd
      style={{ zIndex: isActive ? zIndex : 40 }}
      size={{ width: window.size.width || 600, height: window.size.height || 600 }}
      position={{ x: window.position.x, y: window.position.y }}
      onDragStop={handleDragStop}
      onResize={handleResize}
      minWidth={500}
      minHeight={500}
      maxWidth={window.innerWidth}
      maxHeight={window.innerHeight}
      resizeHandleClasses={{ bottomRight: 'w-4 h-4 cursor-se-resize' }}
      enableResizing={{ bottomRight: true }}
      dragHandleClassName="window-header"
    >
      {windowContent}
    </Rnd>
  );
};

export default React.memo(Window);