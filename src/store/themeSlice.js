import { createSlice } from "@reduxjs/toolkit";

const loadTheme = () => {
  if (typeof window === "undefined") return "light";
  try {
    return localStorage.getItem("theme") || "light";
  } catch { return "light"; }
};

const themeSlice = createSlice({
  name: "theme",
  initialState: { mode: loadTheme() },
  reducers: {
    toggleTheme(state) {
      state.mode = state.mode === "light" ? "dark" : "light";
      if (typeof window !== "undefined") {
        localStorage.setItem("theme", state.mode);
      }
    },
    setTheme(state, action) {
      state.mode = action.payload;
      if (typeof window !== "undefined") {
        localStorage.setItem("theme", state.mode);
      }
    },
  },
});

export const { toggleTheme, setTheme } = themeSlice.actions;
export default themeSlice.reducer;
