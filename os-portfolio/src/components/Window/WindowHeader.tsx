import React from 'react';
import { X, Minus, Maximize2, Minimize2 } from 'lucide-react';

interface WindowHeaderProps {
  name: string;
  isMaximized: boolean;
  onMinimize: () => void;
  onMaximize: () => void;
  onRestore: () => void;
  onClose: () => void;
}

const WindowButton: React.FC<{
  onClick: () => void;
  icon: React.ReactNode;
  additionalClasses?: string;
}> = React.memo(({ onClick, icon, additionalClasses = 'hover:bg-white hover:bg-opacity-20' }) => (
  <button 
    onClick={onClick} 
    className={`focus:outline-none rounded-full p-1 ${additionalClasses}`}
  >
    {icon}
  </button>
));

export const WindowHeader: React.FC<WindowHeaderProps> = React.memo(({
  name,
  isMaximized,
  onMinimize,
  onMaximize,
  onRestore,
  onClose
}) => (
  <div className="window-header bg-secondary p-2 cursor-move flex justify-between items-center">
    <span className="font-semibold truncate">{name}</span>
    <div className="flex space-x-2">
      <WindowButton onClick={onMinimize} icon={<Minus size={10} />} />
      <WindowButton 
        onClick={isMaximized ? onRestore : onMaximize}
        icon={isMaximized ? <Minimize2 size={10} /> : <Maximize2 size={10} />}
      />
      <WindowButton onClick={onClose} icon={<X size={10} />} additionalClasses="hover:bg-red-500" />
    </div>
  </div>
));