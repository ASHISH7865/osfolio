import { Progress } from "@/components/ui/progress";
import { useEffect, useState } from "react";

const BarLoading = () => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const steps = 8;
        const intervalTime = 500; // Time between each step in milliseconds
        const progressIncrement = 100 / steps; // Calculate increment per step

        const interval = setInterval(() => {
            setProgress((prev) => {
                const nextProgress = prev + progressIncrement;
                if (nextProgress >= 100) {
                    clearInterval(interval); // Stop interval when progress reaches 100%
                    return 100;
                }
                return nextProgress;
            });
        }, intervalTime);

        return () => clearInterval(interval); // Clean up interval on unmount
    }, []);

    return (
        <div id="os-logo" className="flex flex-col items-center gap-3 h-screen w-full justify-center">
            
            <Progress  value={progress} className="w-[10%] h-2" />
            <p className="text-xs">
                Loading Os Portfolio
            </p>
        </div>
    );
};

export default BarLoading;
