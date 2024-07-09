import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  toggleSidebar: false,
  coludid: "",
  flickId: "",
  spinnerLoader: false,
  currency: "",
};

const NavBarSlice = createSlice({
  name: "navbar",
  initialState,
  reducers: {
    openSidebar: (state, action) => {
      state.toggleSidebar = !state.toggleSidebar;
    },
    sendigCloud: (state, action) => {
      state.coludid = action.payload;
      console.log(action.payload);
    },
    flickId: (state, action) => {
      state.flickId = action.payload;
    },
    loadSpinner: (state, action) => {
      state.spinnerLoader = !state.spinnerLoader;
      // console.log(state.spinnerLoader);
    },
    setCurrencyData: (state, action) => {
      console.log('Action received:', action); // Log the entire action object
      state.currency = action.payload;
      console.log('Payload:', action.payload); // Log the payload specifically
    },
  },
});
export default NavBarSlice.reducer;
export const { openSidebar, sendigCloud, flickId, loadSpinner, setCurrencyData } =
  NavBarSlice.actions;
