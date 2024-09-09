/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useMemo, useState } from "react";
import { useAppSelector, useAppDispatch } from "@/redux/hook";
import {
  openWindow,
  closeWindow,
  minimizeWindow,
  maximizeWindow,
  restoreWindow,
  setActiveWindow,
  updateWindowPosition,
  updateWindowSize,
} from "@/redux/slices/desktopSlice";
import DesktopIcon from "./DesktopIcon";
import Window from "./Window";
import { App } from "@/types/types";
import ContextMenu from "./ContextMenu";
import { animated, useSpring } from "react-spring";
import Taskbar from "../TaskBar/TaskBar";


interface DesktopProps {
  onLock: () => void;
}

const Desktop: React.FC<DesktopProps> = React.memo(({ onLock }) => {
  const dispatch = useAppDispatch();
  const apps = useAppSelector((state) => state.desktop.apps);
  const openWindows = useAppSelector((state) => state.desktop.openWindows);
  const activeWindowId = useAppSelector(
    (state) => state.desktop.activeWindowId
  );
  const desktopWallpaper = useAppSelector((state) => state.settings.wallpaper);

  const [selectedAppId, setSelectedAppId] = useState<string | null>(null);

  const handleSelectApp = useCallback((appId: string) => {
    setSelectedAppId((prevId) => (prevId === appId ? null : appId));
    handleCloseContextMenu();
  }, []);

  const handleOpenWindow = useCallback(
    (app: App) => {
      dispatch(openWindow(app));
      setSelectedAppId(null);
    },
    [dispatch]
  );

  const handleCloseWindow = useCallback(
    (appId: string) => {
      dispatch(closeWindow(appId));
    },
    [dispatch]
  );

  const handleMinimizeWindow = useCallback(
    (windowId: string) => {
      dispatch(minimizeWindow(windowId));
    },
    [dispatch]
  );

  const handleFocusWindow = useCallback(
    (appId: string) => {
      dispatch(setActiveWindow(appId));
    },
    [dispatch]
  );

  const handleRestoreWindow = useCallback(
    (windowId: string) => {
      dispatch(restoreWindow(windowId));
    },
    [dispatch]
  );

  const handleUpdatePosition = useCallback(
    (windowId: string, position: { x: number; y: number }) => {
      dispatch(updateWindowPosition({ id: windowId, position }));
    },
    [dispatch]
  );

  const handleMaximizeWindow = useCallback(
    (windowId: string) => {
      dispatch(maximizeWindow(windowId));
    },
    [dispatch]
  );

  const handleUpdateSize = useCallback(
    (windowId: string, size: { width: number; height: number }) => {
      dispatch(updateWindowSize({ id: windowId, size }));
    },
    [dispatch]
  );

  const [contextMenu, setContextMenu] = React.useState<{
    x: number;
    y: number;
  } | null>(null);

  const handleContextMenu = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setContextMenu({ x: e.clientX, y: e.clientY });
  }, []);

  const handleCloseContextMenu = useCallback(() => {
    setContextMenu(null);
  }, []);

  const handleTaskbarWindowClick = useCallback(
    (windowId: string) => {
      const clickedWindow = openWindows.find((w) => w.id === windowId);
      if (clickedWindow) {
        if (clickedWindow.isMinimized) {
          dispatch(restoreWindow(windowId));
        }
        dispatch(setActiveWindow(windowId));
      }
    },
    [dispatch, openWindows]
  );

  const desktopSpring = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
  });

  const contextMenuItems = useMemo(
    () => [
      { label: "New Folder", action: () => console.log("New Folder") },
      {
        label: "Change Wallpaper",
        action: () => console.log("Change Wallpaper"),
      },
      { label: "Lock Screen", action: onLock },
    ],
    [onLock]
  );

  return (
    <animated.div
      className="w-full h-screen bg-cover bg-center relative overflow-hidden"
      onContextMenu={handleContextMenu}
      style={desktopSpring}
      onClick={() => {
        setSelectedAppId(null);
        handleCloseContextMenu();
      }}
    >
      <img
        className="absolute w-full h-full object-cover"
        src={`wallpapers/light/${desktopWallpaper}`}
        alt="lockscreen-wallpaper"
      />
      <div
        className={"absolute top-0 left-0 w-full h-full bg-black bg-opacity-50"}
      />
      <div
        className="absolute top-4 left-4 flex flex-col flex-wrap h-screen"
        onClick={(e) => e.stopPropagation()}
      >
        {apps.map((app) => (
          <DesktopIcon
            key={app.id}
            icon={app.icon}
            label={app.name}
            isSelected={app.id === selectedAppId}
            onSelect={() => handleSelectApp(app.id)}
            onOpen={() => handleOpenWindow(app)}
          />
        ))}
      </div>

      {openWindows.map((window) => (
        <Window
          key={window.id}
          window={window}
          isActive={window.id === activeWindowId}
          onClose={() => handleCloseWindow(window.id)}
          onMinimize={() => handleMinimizeWindow(window.id)}
          onMaximize={() => handleMaximizeWindow(window.id)}
          onRestore={() => handleRestoreWindow(window.id)}
          onFocus={() => handleFocusWindow(window.id)}
          onUpdatePosition={(position) =>
            handleUpdatePosition(window.id, position)
          }
          onUpdateSize={(size) => handleUpdateSize(window.id, size)}
        >
        </Window>
      ))}

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
