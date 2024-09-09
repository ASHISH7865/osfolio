import React, { useState, useRef, useCallback } from 'react';

interface DesktopIconProps {
  icon: string;
  label: string;
  isSelected: boolean;
  onSelect: () => void;
  onOpen: () => void;
}

const DesktopIcon: React.FC<DesktopIconProps> = React.memo(({
  icon,
  label,
  isSelected,
  onSelect,
  onOpen
}) => {
  const [clickTimer, setClickTimer] = useState<NodeJS.Timeout | null>(null);
  const clickCount = useRef(0);

  const handleClick = useCallback((event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();

    clickCount.current += 1;

    if (clickCount.current === 1) {
      const timer = setTimeout(() => {
        if (clickCount.current === 1) {
          onSelect();
        }
        clickCount.current = 0;
      }, 200);  // Adjust this delay as needed
      setClickTimer(timer);
    } else if (clickCount.current === 2) {
      if (clickTimer) clearTimeout(clickTimer);
      clickCount.current = 0;
      onOpen();
    }
  }, [onSelect, onOpen, clickTimer]);

  return (
    <div
      className={`flex flex-col items-center gap-2 cursor-pointer group text-xs p-2 rounded-[5px] select-none ${isSelected ? 'bg-white bg-opacity-20' : 'hover:bg-white hover:bg-opacity-20'
        }`}
      onClick={handleClick}
      tabIndex={0}
      role="button"
      aria-label={`${isSelected ? 'Selected' : 'Select'} ${label}`}
      onKeyPress={(e) => {
        if (e.key === 'Enter') onSelect();
        if (e.key === ' ') onOpen();
      }}
    >
      <div className="flex items-center justify-center">
        <img src={icon} alt='dekstop-icon' />
      </div>
      <span>
        {label}
      </span>
    </div>
  );
});

DesktopIcon.displayName = 'DesktopIcon';

export default DesktopIcon;