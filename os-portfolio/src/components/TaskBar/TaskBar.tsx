import React, { useMemo } from 'react';
import { Window as WindowType } from '@/types/types';
import { Battery, LayoutGrid, Lock, Wifi } from 'lucide-react';
import { Button } from '../ui/button';
import Clock from '../LoginScreen/Clock';

interface TaskbarProps {
    openWindows: WindowType[];
    activeWindowId: string | null;
    onWindowClick: (windowId: string) => void;
    onLock: () => void;
}

const Taskbar: React.FC<TaskbarProps> = React.memo(({
    openWindows,
    activeWindowId,
    onWindowClick,
    onLock
}) => {
    const taskbarItems = useMemo(() => {
        return openWindows.map(window => ({
            id: window.id,
            name: window.name,
            icon: window.icon,
            isActive: window.id === activeWindowId,
            isMinimized: window.isMinimized
        }));
    }, [openWindows, activeWindowId]);

    return (
        <div className="fixed bottom-0 left-0 right-0 h-12 bg-secondary bg-opacity-80 backdrop-blur-md flex items-center justify-between px-4">
            <div className='flex gap-2'>
                <Button
                    variant="ghost"
                    className="text-white  p-2 rounded-full transition-colors duration-200"
                    title="Start Menu"
                >
                    <LayoutGrid size={20} />
                </Button>
                <div className="flex space-x-2">
                    {taskbarItems.map(item => (
                        <button
                            key={item.id}
                            onClick={() => onWindowClick(item.id)}
                            className={`
                            flex items-center px-2 py-1  gap-1 rounded-[5px] transition-colors duration-200
                            ${item.isActive ? 'bg-gray-600' : 'hover:bg-gray-700'}
                            ${item.isMinimized ? 'opacity-50' : 'opacity-100'}
                        `}
                        >   
                            <img className='w-[20px]' src={item.icon} alt="app-icon" />
                            {/* <span className="text-white text-xs truncate max-w-[120px]">{item.name}</span> */}
                        </button>
                    ))}
                </div>
            </div>
            <div className='flex gap-3 items-center'>
                <Button
                    variant="ghost"
                    onClick={onLock}
                    className="text-white hover:bg-gray-700 p-2 rounded-full transition-colors duration-200"
                    title="Lock Screen"
                >
                    <Lock size={20} />
                </Button>
                <Wifi size={20} />
                <Battery size={20} />
                <Clock className='text-sm' />
            </div>
        </div>
    );
});

Taskbar.displayName = 'Taskbar';

export default Taskbar;