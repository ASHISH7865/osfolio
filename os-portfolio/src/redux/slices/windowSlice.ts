import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Window {
  id: number;
  app: string;
  zIndex: number;
}

interface WindowsState {
  openWindows: Window[];
  activeWindow: string | null;
  nextZIndex: number;
}

const initialState: WindowsState = {
  openWindows: [],
  activeWindow: null,
  nextZIndex: 1,
};

const windowsSlice = createSlice({
  name: 'windows',
  initialState,
  reducers: {
    openWindow: (state, action: PayloadAction<string>) => {
      state.openWindows.push({
        id: Date.now(),
        app: action.payload,
        zIndex: state.nextZIndex,
      });
      state.activeWindow = action.payload;
      state.nextZIndex += 1;
    },
    closeWindow: (state, action: PayloadAction<number>) => {
      state.openWindows = state.openWindows.filter(w => w.id !== action.payload);
      if (state.openWindows.length > 0) {
        state.activeWindow = state.openWindows[state.openWindows.length - 1].app;
      } else {
        state.activeWindow = null;
      }
    },
    setActiveWindow: (state, action: PayloadAction<string>) => {
      state.activeWindow = action.payload;
      const window = state.openWindows.find(w => w.app === action.payload);
      if (window) {
        window.zIndex = state.nextZIndex;
        state.nextZIndex += 1;
      }
    },
  },
});

export const { openWindow, closeWindow, setActiveWindow } = windowsSlice.actions;
export default windowsSlice.reducer;