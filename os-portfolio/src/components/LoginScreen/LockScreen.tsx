import { BatteryCharging, Mail, MoveLeft, User, Volume1, Wifi } from "lucide-react";
import { Button } from "../ui/button";
import { animated, useSpring } from "react-spring";
import { useState, useCallback } from "react";
import Clock from "./Clock";
import Calendar from "./Calender";
import { useAppSelector } from "@/redux/hook";

const LockScreen = ({ onUnlock }: { onUnlock: () => void }) => {
    const [interacted, setInteracted] = useState(false);
    const wallpaper = useAppSelector((state)=>state.settings.lockScreenWallpaper);

    const lockSpring = useSpring({
        from:{opacity : 0},
        to :{opacity : 1}
    })

    const overlaySpring = useSpring({
        opacity: interacted ? 1 : 0.8,
        config: { duration: 500 },
    });

    const contentSpring = useSpring({
        opacity: interacted ? 1 : 0,
        transform: interacted ? "translateY(0)" : "translateY(-20px)",
        config: { duration: 500 },
    });

    const handleUnlock = useCallback(() => {
        // Logic for any validation
        onUnlock();
    }, [onUnlock]);

    const handleInteraction = useCallback((event: React.MouseEvent | React.KeyboardEvent) => {
        if (!interacted && (event.type === "click" || event.type === "keydown")) {
            setInteracted(true);
        }
    }, [interacted]);

    const handleBack = useCallback(() => {
        setInteracted(false);
    }, []);

    return (
        <animated.div
            onClick={handleInteraction}
            onKeyDown={handleInteraction}
            style={lockSpring}
            tabIndex={0} // Make the div focusable
            className="h-screen  w-full flex items-center justify-center bg-cover bg-center relative"
        >
            <img
                className="absolute w-full h-full object-cover"
                src={`public/wallpapers/light/${wallpaper}`}
                alt="lockscreen-wallpaper"
            />
            <animated.div
                style={overlaySpring}
                className={`absolute top-0 left-0 w-full h-full ${interacted
                    ? "bg-black bg-opacity-80 backdrop-blur-2xl"
                    : "bg-black bg-opacity-80"
                    }`}
            />
            {!interacted ? (
                <div className="relative z-1 flex flex-col items-center self-start mt-40">
                    <Clock />
                    <Calendar />
                </div>
            ) : (
                <>
                    <Button variant={"ghost"} onClick={handleBack} className="absolute top-10 left-10 z-1 cursor-pointer flex gap-2 bg-opacity-20">
                        <MoveLeft /> Back
                    </Button>
                    <animated.div
                        style={contentSpring}
                        className="content relative z-10 flex flex-col items-center gap-3"
                    >
                        <div className="bg-black bg-opacity-25 p-5 rounded-full">
                            <User size={50} />
                        </div>
                        <span>Ashish Chaudhary</span>
                        <Button
                            className="bg-opacity-30 bg-white w-[100px] h-[30px]"
                            onClick={handleUnlock}
                        >
                            Enter
                        </Button>
                    </animated.div>
                </>
            )}
            <div className="absolute flex gap-5 bottom-10 right-10">
                <BatteryCharging size={"20"} className="hover:bg-white hover:bg-opacity-40 cursor-pointer rounded-full w-[30px] h-[30px] p-1" />
                <Volume1 size={"20"} className="hover:bg-white hover:bg-opacity-40 cursor-pointer rounded-full w-[30px] h-[30px] p-1" />
                <Wifi size={"20"} className="hover:bg-white hover:bg-opacity-40 cursor-pointer rounded-full w-[30px] h-[30px] p-1" />
                <Mail size={"20"} className="hover:bg-white hover:bg-opacity-40 cursor-pointer rounded-full w-[30px] h-[30px] p-1" />
            </div>
        </animated.div>
    );
};

export default LockScreen;
