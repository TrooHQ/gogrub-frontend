import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ToggleState {
  isToggled: boolean;
  isDoMoreToggled: boolean;
  isSubscription: boolean;
}

const initialState: ToggleState = {
  isToggled: false,
  isDoMoreToggled: false,
  isSubscription: false,
};

const setupSlice = createSlice({
  name: "setup",
  initialState,
  reducers: {
    toggle: (state) => {
      state.isToggled = true;
    },
    setToggle: (state, action: PayloadAction<boolean>) => {
      state.isToggled = action.payload;
    },
    doMoreToggle: (state) => {
      state.isDoMoreToggled = true;
    },
    setSubscription: (state, action: PayloadAction<boolean>) => {
      state.isSubscription = action.payload;
    },
    setDoMoreToggle: (state, action: PayloadAction<boolean>) => {
      state.isDoMoreToggled = action.payload;
    },
  },
});

export const {
  toggle,
  setToggle,
  doMoreToggle,
  setSubscription,
  setDoMoreToggle,
} = setupSlice.actions;

export const selectToggleState = (state: any) => state.setup?.isToggled;
export const selectIsDoMoreToggleState = (state: any) =>
  state.setup?.isDoMoreToggled;
export const selectSubscriptionToggleState = (state: any) =>
  state.setup?.isSubscription;
export default setupSlice.reducer;
