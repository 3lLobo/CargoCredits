import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import googleReducer from "./GoogleSlice";

export const store = configureStore({
  reducer: {
    googleslice: googleReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
