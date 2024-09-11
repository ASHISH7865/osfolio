import React from "react";
import { animated } from "react-spring";
import { useAppSelector } from "@/redux/hook";
import {DesktopIcons , OpenWindows} from "./DesktopIcons";
import Taskbar from "../TaskBar/TaskBar";
import ContextMenu from "./ContextMenu";
import { useDesktopHandlers, useDesktopStyles } from "@/hooks/desktopHooks";

interface DesktopProps {
  onLock: () => void;
}

const Desktop: React.FC<DesktopProps> = React.memo(({ onLock }) => {
  const apps = useAppSelector((state) => state.desktop.apps);
  const openWindows = useAppSelector((state) => state.desktop.openWindows);
  const activeWindowId = useAppSelector((state) => state.desktop.activeWindowId);
  const desktopWallpaper = useAppSelector((state) => state.settings.wallpaper);

  const {
    selectedAppId,
    contextMenu,
    handleSelectApp,
    handleOpenWindow,
    handleCloseWindow,
    handleMinimizeWindow,
    handleFocusWindow,
    handleRestoreWindow,
    handleUpdatePosition,
    handleMaximizeWindow,
    handleUpdateSize,
    handleContextMenu,
    handleCloseContextMenu,
    handleTaskbarWindowClick,
    contextMenuItems,
  } = useDesktopHandlers(onLock);

  const { desktopSpring } = useDesktopStyles();

  return (
    <animated.div
      className="w-full h-screen bg-cover bg-center relative overflow-hidden"
      onContextMenu={handleContextMenu}
      style={desktopSpring}
      onClick={() => {
        handleSelectApp(null);
        handleCloseContextMenu();
      }}
    >
      <img
        className="absolute w-full h-full object-cover"
        src={`wallpapers/light/${desktopWallpaper}`}
        alt="lockscreen-wallpaper"
      />
      <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50" />
      
      <DesktopIcons
        apps={apps}
        selectedAppId={selectedAppId}
        onSelectApp={handleSelectApp}
        onOpenWindow={handleOpenWindow}
      />

      <OpenWindows
        openWindows={openWindows}
        activeWindowId={activeWindowId}
        onCloseWindow={handleCloseWindow}
        onMinimizeWindow={handleMinimizeWindow}
        onMaximizeWindow={handleMaximizeWindow}
        onRestoreWindow={handleRestoreWindow}
        onFocusWindow={handleFocusWindow}
        onUpdatePosition={handleUpdatePosition}
        onUpdateSize={handleUpdateSize}
      />

      <Taskbar
        openWindows={openWindows}
        activeWindowId={activeWindowId}
        onWindowClick={handleTaskbarWindowClick}
        onLock={onLock}
      />

      {contextMenu && (
        <ContextMenu
          items={contextMenuItems}
          position={contextMenu}
          onClose={handleCloseContextMenu}
        />
      )}
    </animated.div>
  );
});

Desktop.displayName = "Desktop";

export default Desktop;