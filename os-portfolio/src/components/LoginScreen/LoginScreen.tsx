import { useEffect, useState } from 'react';
import TerminalLoading from './TerminalLoading';
import BarLoading from './BarLoading';
import LockScreen from './LockScreen';
import { terminalMessages } from '@/utils/constant';
import Desktop from '../Desktop/Desktop';

// Define the possible states of the login screen
type OSState = 'initial' | 'osLogo' | 'lockScreen' | 'desktop';

const LoginScreen: React.FC = () => {
    const [currentState, setCurrentState] = useState<OSState>(() => {
        return (localStorage.getItem('osState') as OSState) || 'initial';
    });
    
    const [currentMessageIndex, setCurrentMessageIndex] = useState<number>(0);

    useEffect(() => {
        if (currentState === 'initial') {
            if (currentMessageIndex < terminalMessages.length) {
                const timer = setTimeout(() => {
                    setCurrentMessageIndex((prevIndex) => prevIndex + 1);
                }, 50);
                return () => clearTimeout(timer);
            } else {
                setCurrentState('osLogo');
                localStorage.setItem('osState', 'osLogo');
            }
        } else if (currentState === 'osLogo') {
            const timer = setTimeout(() => {
                setCurrentState('lockScreen');
                localStorage.setItem('osState', 'lockScreen');
            }, 6000);
            return () => clearTimeout(timer);
        }
    }, [currentMessageIndex, currentState]);

    const handleLock = () => {
        setCurrentState('lockScreen');
        localStorage.setItem('osState', 'lockScreen');
    };

    const handleUnlock = () => {
        setCurrentState('desktop');
        localStorage.setItem('osState', 'desktop');
    };

    return (
        <div className="h-full w-full flex">
            {currentState === 'initial' && (
                <TerminalLoading messages={terminalMessages} currentIndex={currentMessageIndex} />
            )}
            {currentState === 'osLogo' && <BarLoading />}
            {currentState === 'lockScreen' && <LockScreen onUnlock={handleUnlock} />}
            {currentState === 'desktop' && <Desktop onLock={handleLock} />}
        </div>
    );
};

export default LoginScreen;
