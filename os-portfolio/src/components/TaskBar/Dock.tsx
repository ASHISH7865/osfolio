import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Window as WindowType } from '@/types/types';
import { Lock } from 'lucide-react';

interface DockProps {
  apps: { id: string; name: string; icon: string }[];
  openWindows: WindowType[];
  activeWindowId: string | null;
  onAppClick: (appId: string) => void;
  onWindowClick: (windowId: string) => void;
  onLock: () => void;
}

const Dock: React.FC<DockProps> = React.memo(({
  apps,
  openWindows,
  activeWindowId,
  onAppClick,
  onWindowClick,
  onLock
}) => {
  const [hoveredApp, setHoveredApp] = useState<string | null>(null);

  const handleMouseEnter = useCallback((appId: string) => {
    setHoveredApp(appId);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setHoveredApp(null);
  }, []);

  return (
    <motion.div 
      className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-white bg-opacity-20 backdrop-blur-lg rounded-2xl p-2 flex items-end space-x-2"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      {apps.map((app) => {
        const isOpen = openWindows.some(window => window.id === app.id);
        const isActive = activeWindowId === app.id;

        return (
          <motion.div
            key={app.id}
            className="relative group"
            onMouseEnter={() => handleMouseEnter(app.id)}
            onMouseLeave={handleMouseLeave}
            onClick={() => isOpen ? onWindowClick(app.id) : onAppClick(app.id)}
          >
            <motion.img
              src={app.icon}
              alt={app.name}
              className={`w-12 h-12 rounded-xl transition-all duration-200 ${isActive ? 'border-2 border-blue-400' : ''}`}
              whileHover={{ y: -10, scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            />
            {isOpen && (
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-white rounded-full" />
            )}
            <AnimatePresence>
              {hoveredApp === app.id && (
                <motion.div
                  className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded whitespace-nowrap"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                >
                  {app.name}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
      <div className="border-l border-white border-opacity-30 h-10 mx-2" />
      <motion.button
        onClick={onLock}
        className="text-white p-2 rounded-xl transition-colors duration-200 hover:bg-white hover:bg-opacity-10"
        whileHover={{ y: -5, scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        title="Lock Screen"
      >
        <Lock size={24} />
      </motion.button>
    </motion.div>
  );
});

Dock.displayName = 'Dock';

export default Dock;