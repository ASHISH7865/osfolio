import React, { useCallback } from 'react';
import { useSpring, animated } from 'react-spring';

interface ContextMenuItem {
  label: string;
  action: () => void;
}

interface ContextMenuProps {
  items: ContextMenuItem[];
  position: { x: number; y: number };
  onClose: () => void;
}

const ContextMenu: React.FC<ContextMenuProps> = React.memo(({ items, position, onClose }) => {
  // Define the animation for the context menu
  const [styles, api] = useSpring(() => ({
    opacity: 0,
    transform: 'scale(0)',
  }));

  // Trigger animation on mount and when position changes
  React.useEffect(() => {
    api.start({ opacity: 1, transform: 'scale(1)' });
  }, [api, position]);

  // Prevent context menu from closing when clicking inside it
  const handleClickInside = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
  }, []);

  // Prevent context menu from closing when clicking on an item
  const handleItemClick = useCallback((action: () => void) => {
    action();
    onClose();
  }, [onClose]);

  return (
    <animated.div
      className="absolute border bg-black rounded-[5px] shadow-lg z-50 p-1"
      style={{
        top: position.y,
        left: position.x,
        ...styles,
      }}
      onClick={handleClickInside}
    >
      <ul className="list-none p-0 m-0">
        {items.map((item, index) => (
          <li
            key={index}
            className="px-5 py-2 cursor-pointer text-sm hover:bg-secondary rounded-[5px] min-w-[200px]"
            onClick={() => handleItemClick(item.action)}
          >
            {item.label}
          </li>
        ))}
      </ul>
    </animated.div>
  );
});

ContextMenu.displayName = 'ContextMenu';

export default ContextMenu;
