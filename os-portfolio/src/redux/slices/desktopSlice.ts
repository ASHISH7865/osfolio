import { App, Window as WindowType } from "@/types/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DesktopState {
  apps: App[];
  openWindows: WindowType[];
  activeWindowId: string | null;
}

const initialState: DesktopState = {
  apps: [{ id: "file-explorer", name: "Explorer", icon: "/public/icons/folder-icon.svg" , type:"explorer" }],
  openWindows: [],
  activeWindowId: null,
};

const desktopSlice = createSlice({
  name: "desktop",
  initialState,
  reducers: {
    setApps: (state, action: PayloadAction<App[]>) => {
      state.apps = action.payload;
    },
    openWindow: (state, action: PayloadAction<App>) => {
      const existingWindow = state.openWindows.find(
        (w) => w.id === action.payload.id
      );
      if (existingWindow) {
        existingWindow.isMinimized = false;
        state.activeWindowId = existingWindow.id;
      } else {
        const newWindow: WindowType = {
          ...action.payload,
          isMinimized: false,
          isMaximized: false,
          position: {
            x: 50 + state.openWindows.length * 20,
            y: 50 + state.openWindows.length * 20,
          },
          size: { width: 1000, height: 600 },
          zIndex:
            Math.max(0, ...state.openWindows.map((w) => w.zIndex || 0)) + 1,
        };
        state.openWindows.push(newWindow);
        state.activeWindowId = newWindow.id;
      }
    },
    closeWindow: (state, action: PayloadAction<string>) => {
      state.openWindows = state.openWindows.filter(
        (window) => window.id !== action.payload
      );
      if (state.activeWindowId === action.payload) {
        state.activeWindowId =
          state.openWindows[state.openWindows.length - 1]?.id || null;
      }
    },
    minimizeWindow: (state, action: PayloadAction<string>) => {
      const window = state.openWindows.find((w) => w.id === action.payload);
      if (window) {
        window.isMinimized = true;
        window.isMaximized = false;
      }
      if (state.activeWindowId === action.payload) {
        state.activeWindowId =
          state.openWindows.find((w) => !w.isMinimized)?.id || null;
      }
    },
    maximizeWindow: (state, action: PayloadAction<string>) => {
      const window = state.openWindows.find((w) => w.id === action.payload);
      if (window) {
        window.isMaximized = !window.isMaximized;
        window.isMinimized = false;
        if (window.isMaximized) {
          window.prevPosition = { ...window.position };
          window.prevSize = { ...window.size };
          window.position = { x: 0, y: 0 };
          window.size = {
            width: window.innerWidth || 1024,
            height: window.innerHeight || 768,
          };
        } else if (window.prevPosition && window.prevSize) {
          window.position = { ...window.prevPosition };
          window.size = { ...window.prevSize };
        }
      }
      state.activeWindowId = action.payload;
    },
    restoreWindow: (state, action: PayloadAction<string>) => {
      const window = state.openWindows.find((w) => w.id === action.payload);
      if (window) {
        window.isMinimized = false;
        window.isMaximized = false;
        if (window.prevPosition && window.prevSize) {
          window.position = { ...window.prevPosition };
          window.size = { ...window.prevSize };
        }
        state.activeWindowId = window.id;
      }
    },
    setActiveWindow: (state, action: PayloadAction<string>) => {
      const window = state.openWindows.find((w) => w.id === action.payload);
      if (window) {
        state.activeWindowId = window.id;
        window.zIndex =
          Math.max(0, ...state.openWindows.map((w) => w.zIndex || 0)) + 1;
      }
    },
    updateWindowPosition: (
      state,
      action: PayloadAction<{ id: string; position: { x: number; y: number } }>
    ) => {
      const window = state.openWindows.find((w) => w.id === action.payload.id);
      if (window && !window.isMaximized) {
        window.position = action.payload.position;
        window.prevPosition = action.payload.position;
      }
    },
    updateWindowSize: (
      state,
      action: PayloadAction<{
        id: string;
        size: { width: number; height: number };
      }>
    ) => {
      const window = state.openWindows.find((w) => w.id === action.payload.id);
      if (window && !window.isMaximized) {
        window.size = action.payload.size;
        window.prevSize = action.payload.size;
      }
    },
  },
});

export const {
  setApps,
  openWindow,
  closeWindow,
  minimizeWindow,
  maximizeWindow,
  restoreWindow,
  setActiveWindow,
  updateWindowPosition,
  updateWindowSize,
} = desktopSlice.actions;

export default desktopSlice.reducer;
