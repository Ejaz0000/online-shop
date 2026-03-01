import { createSlice } from "@reduxjs/toolkit";

const loadCollapsed = () => {
  if (typeof window === "undefined") return false;
  try {
    return localStorage.getItem("sidebarCollapsed") === "true";
  } catch { return false; }
};

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState: { collapsed: loadCollapsed() },
  reducers: {
    toggleSidebar(state) {
      state.collapsed = !state.collapsed;
      if (typeof window !== "undefined") {
        localStorage.setItem("sidebarCollapsed", state.collapsed);
      }
    },
  },
});

export const { toggleSidebar } = sidebarSlice.actions;
export default sidebarSlice.reducer;
