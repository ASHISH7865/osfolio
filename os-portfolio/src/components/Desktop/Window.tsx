import React, { useCallback, useState } from 'react';
import { DraggableData, Rnd , RndResizeCallback , RndDragEvent } from 'react-rnd';
import { Window as WindowType } from '@/types/types';
import { X, Minus, Maximize2, Minimize2 } from 'lucide-react';

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
}) => {

  const [zIndex, setZIndex] = useState(40);

  const handleDragStop = useCallback((_e: RndDragEvent, data: DraggableData) => {
    onUpdatePosition({ x: data.x, y: data.y });
  }, [onUpdatePosition]);

  const handleResize: RndResizeCallback = useCallback((_e, _direction, ref) => {
    onUpdateSize({ width: ref.offsetWidth, height: ref.offsetHeight });
  }, [onUpdateSize]);

  const handleFocus = useCallback(() => {
    setZIndex(50); // Set zIndex to the highest value
    onFocus();
  }, [onFocus]);

  const windowContent = (
    <div
      className={` 
        shadow-2xl overflow-hidden border
        transition-all duration-200 ease-in-out
        ${isActive ? 'z-50' : 'z-40'}
        ${window.isMinimized ? 'hidden' : ''}
        ${window.isMaximized ? 'rounded-0' : 'rounded-[5px]'}
      `}
      style={{
        width: window.isMaximized ? '100%' : `${window.size.width}px`,
        height: window.isMaximized ? '100%' : `${window.size.height}px`,
      }}
    >
      <div onClick={handleFocus} className="window-header bg-secondary p-2 cursor-move flex justify-between items-center">
        <span className="font-semibold truncate">{window.name}</span>
        <div className="flex space-x-2">
          <button onClick={onMinimize} className="focus:outline-none hover:bg-white rounded-full hover:bg-opacity-20  p-1">
            <Minus size={10} />
          </button>
          <button onClick={window.isMaximized ? onRestore : onMaximize} className="focus:outline-none rounded-full hover:bg-white hover:bg-opacity-20  p-1">
            {window.isMaximized ? <Minimize2 size={10} /> : <Maximize2 size={10} />}
          </button>
          <button onClick={onClose} className="focus:outline-none hover:bg-red-500 rounded-full p-1">
            <X size={10} />
          </button>
        </div>
      </div>
      <div className="p-4 h-full overflow-auto backdrop-blur-2xl bg-black ">
        {/* Window content goes here */}
        <p className="text-gray-800 dark:text-gray-200">Content for {window.name}</p>
      </div>
    </div>
  );

  return window.isMaximized ? (
    <div className="fixed inset-0">{windowContent}</div>
  ) : (
    <Rnd
    style={{
      zIndex : isActive ? zIndex : 40,
    }}
      size={{ width: window.size.width || 600, height: window.size.height || 600 }}
      position={{ x: window.position.x, y: window.position.y }}
      onDragStop={handleDragStop}
      onResize={handleResize}
      minWidth={500}
      minHeight={500}
      maxWidth={window.innerWidth}
      maxHeight={window.innerHeight}
      resizeHandleClasses={{
        bottomRight: 'w-4 h-4 cursor-se-resize',
      }}
      enableResizing={{ bottomRight: true }}
      dragHandleClassName='window-header'
    >
      {windowContent}
    </Rnd>
  );
};

export default React.memo(Window);
