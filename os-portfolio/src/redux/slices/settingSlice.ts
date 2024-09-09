import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the initial state type
interface SettingsState {
  theme: 'light' | 'dark';
  wallpaper: string;
  lockScreenWallpaper :string;
  fontSize: 'small' | 'medium' | 'large';
}

// Define the initial state
const initialState: SettingsState = {
  theme: 'light',
  lockScreenWallpaper : 'wall-1.png',
  wallpaper: 'default.jpg',
  fontSize: 'medium',
};

// Define the slice with proper types
const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.theme = action.payload;
    },
    setWallpaper: (state, action: PayloadAction<string>) => {
      state.wallpaper = action.payload;
    },
    setLockScreenWallpaper : (state, action: PayloadAction<string>) => {
      state.lockScreenWallpaper = action.payload;
    },
    setFontSize: (state, action: PayloadAction<'small' | 'medium' | 'large'>) => {
      state.fontSize = action.payload;
    },
  },
});

export const { setTheme, setWallpaper, setFontSize } = settingsSlice.actions;
export default settingsSlice.reducer;