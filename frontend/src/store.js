import { configureStore } from "@reduxjs/toolkit";
import navReducer from "./components/slices/NavSlice";

export const store = configureStore({
  reducer: {
    nav: navReducer,
  },
});

export default store;
