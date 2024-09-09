import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Notification {
  id: string;
  // Add other notification properties here
}

interface SystemState {
  status: 'initial' | 'loading' | 'lockScreen' | 'desktop';
  isAuthenticated: boolean;
  notifications: Notification[];
}

const initialState: SystemState = {
  status: "initial",
  isAuthenticated: false,
  notifications: [],
};

const systemSlice = createSlice({
  name: "system",
  initialState,
  reducers: {
    setStatus: (state, action: PayloadAction<SystemState['status']>) => {
      state.status = action.payload;
    },
    setAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },
    addNotification: (state, action: PayloadAction<Notification>) => {
      state.notifications.push(action.payload);
    },
    removeNotification: (state, action: PayloadAction<string>) => {
      state.notifications = state.notifications.filter(
        (n) => n.id !== action.payload
      );
    },
  },
});

export const {
  setStatus,
  setAuthenticated,
  addNotification,
  removeNotification,
} = systemSlice.actions;

export default systemSlice.reducer;