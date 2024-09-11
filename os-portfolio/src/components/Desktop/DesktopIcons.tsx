import React from "react";
import DesktopIcon from "./DesktopIcon";
import Window from "../Window/Window";
import { App , Window as WindowType } from "@/types/types";
import FileExplorer from "../FileExplorer/FileExplorer";

interface DesktopIconsProps {
  apps: App[];
  selectedAppId: string | null;
  onSelectApp: (appId: string) => void;
  onOpenWindow: (app: App) => void;
}

export const DesktopIcons: React.FC<DesktopIconsProps> = React.memo(({
  apps,
  selectedAppId,
  onSelectApp,
  onOpenWindow,
}) => (
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
        onSelect={() => onSelectApp(app.id)}
        onOpen={() => onOpenWindow(app)}
      />
    ))}
  </div>
));

DesktopIcons.displayName = "DesktopIcons";

interface OpenWindowsProps {
  openWindows: WindowType[]; // Replace 'any' with your actual Window type
  activeWindowId: string | null;
  onCloseWindow: (windowId: string) => void;
  onMinimizeWindow: (windowId: string) => void;
  onMaximizeWindow: (windowId: string) => void;
  onRestoreWindow: (windowId: string) => void;
  onFocusWindow: (windowId: string) => void;
  onUpdatePosition: (windowId: string, position: { x: number; y: number }) => void;
  onUpdateSize: (windowId: string, size: { width: number; height: number }) => void;
}

export const OpenWindows: React.FC<OpenWindowsProps> = React.memo(({
  openWindows,
  activeWindowId,
  onCloseWindow,
  onMinimizeWindow,
  onMaximizeWindow,
  onRestoreWindow,
  onFocusWindow,
  onUpdatePosition,
  onUpdateSize,
}) => (
  <>
    {openWindows.map((window) => (
      <Window
        key={window.id}
        window={window}
        isActive={window.id === activeWindowId}
        onClose={() => onCloseWindow(window.id)}
        onMinimize={() => onMinimizeWindow(window.id)}
        onMaximize={() => onMaximizeWindow(window.id)}
        onRestore={() => onRestoreWindow(window.id)}
        onFocus={() => onFocusWindow(window.id)}
        onUpdatePosition={(position) => onUpdatePosition(window.id, position)}
        onUpdateSize={(size) => onUpdateSize(window.id, size)}
      >
       {
        window.type === 'explorer' && <FileExplorer />
       }
      </Window>
    ))}
  </>
));

OpenWindows.displayName = "OpenWindows";