"use client";

import { configureStore } from "@reduxjs/toolkit";
import registrationReducer from "./registrationSlice";
import themeReducer from "./themeSlice";
import sidebarReducer from "./sidebarSlice";
import cartReducer from "./cartSlice";

export const store = configureStore({
  reducer: {
    registration: registrationReducer,
    theme: themeReducer,
    sidebar: sidebarReducer,
    cart: cartReducer,
  },
});
