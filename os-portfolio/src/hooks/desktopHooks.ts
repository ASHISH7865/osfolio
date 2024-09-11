import { useCallback, useMemo, useState } from "react";
import { useAppDispatch } from "@/redux/hook";
import { useSpring } from "react-spring";
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
import { App } from "@/types/types";

export const useDesktopHandlers = (onLock: () => void) => {
  const dispatch = useAppDispatch();
  const [selectedAppId, setSelectedAppId] = useState<string | null>(null);
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number } | null>(null);

  const handleSelectApp = useCallback((appId: string | null) => {
    setSelectedAppId(appId);
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

  const handleContextMenu = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setContextMenu({ x: e.clientX, y: e.clientY });
  }, []);

  const handleCloseContextMenu = useCallback(() => {
    setContextMenu(null);
  }, []);

  const handleTaskbarWindowClick = useCallback(
    (windowId: string) => {
      dispatch(restoreWindow(windowId));
      dispatch(setActiveWindow(windowId));
    },
    [dispatch]
  );

  const contextMenuItems = useMemo(
    () => [
      { label: "New Folder", action: () => console.log("New Folder") },
      { label: "Change Wallpaper", action: () => console.log("Change Wallpaper") },
      { label: "Lock Screen", action: onLock },
    ],
    [onLock]
  );

  return {
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
  };
};

export const useDesktopStyles = () => {
  const desktopSpring = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
  });

  return { desktopSpring };
};