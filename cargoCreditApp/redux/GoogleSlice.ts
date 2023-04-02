import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "./store";

export interface GoogleState {
  userData: any;
  profileData: any;
  isLoggenIn: boolean;
  redeemedMonths: string[];
}

const initialState: GoogleState = {
  userData: {},
  profileData: {},
  isLoggenIn: false,
  redeemedMonths: [],
};

export const googleSlice = createSlice({
  name: "googleslice",
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<any>) => {
      const newData = action.payload;
      if (newData?.access_token) {
        state.isLoggenIn = true;
        state.userData = action.payload;
      }
    },
    setProfileData: (state, action: PayloadAction<any>) => {
      const newData = action.payload;
      if (newData?.id) {
        // state.isLoggenIn = true;
        state.profileData = action.payload;
      }
    },
    setRedeemedMonths: (state, action: PayloadAction<string>) => {
      const newMonth = action.payload;
      if (newMonth) {
        state.redeemedMonths.push(newMonth);
      }
    },
    resetGoogleData: (state) => {
      state.userData = {};
      state.profileData = {};
      state.isLoggenIn = false;
    },
  },
});

export const {
  setUserData,
  setProfileData,
  resetGoogleData,
  setRedeemedMonths,
} = googleSlice.actions;

export const selectUserData = (state: RootState) => state.googleslice.userData;
export const selectProfileData = (state: RootState) =>
  state.googleslice.profileData;
export const selectIsLoggedIn = (state: RootState) =>
  state.googleslice.isLoggenIn;
export const selectRedeemedMonths = (state: RootState) =>
  state.googleslice.redeemedMonths;

export default googleSlice.reducer;
