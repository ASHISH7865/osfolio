import { useEffect, useState } from 'react';

const Clock = ({className}:{className ? : string}) => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date());
        }, 1000); // Update every second

        return () => clearInterval(interval);
    }, []);

    // Formatting the time inside the render to ensure it's up-to-date
    const formattedTime = time.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });

    return (
        <div className={`text-9xl font-bold ${className}`}>
            {formattedTime}
        </div>
    );
};

export default Clock;