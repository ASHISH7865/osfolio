import React, { useEffect, useState } from 'react';

const Calendar: React.FC = () => {
    const [date, setDate] = useState<string>('');

    useEffect(() => {
        const updateDate = () => {
            const now = new Date();
            // Format the date as DD.MM.YYYY
            const day = String(now.getDate()).padStart(2, '0');
            const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
            const year = now.getFullYear();
            setDate(`${day}.${month}.${year}`);
        };

        // Initial date setup
        updateDate();

        // Update date every day at midnight
        const interval = setInterval(updateDate, 24 * 60 * 60 * 1000); // 24 hours

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="text-3xl font-bold">
            {date}
        </div>
    );
};

export default Calendar;
