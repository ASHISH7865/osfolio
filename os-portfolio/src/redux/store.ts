import { configureStore } from '@reduxjs/toolkit';
import systemReducer from './slices/systemSlice';
import windowsReducer from './slices/windowSlice';
import filesReducer from './slices/fileSlice';
import settingsReducer from './slices/settingSlice';
import desktopReducer from './slices/desktopSlice';


export const store = configureStore({
    reducer: {
      desktop : desktopReducer,
        system: systemReducer,
        windows: windowsReducer,
        files: filesReducer,
        settings: settingsReducer,
      },
  })



export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch