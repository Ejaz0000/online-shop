"use client";

import { useSelector } from "react-redux";
import { useEffect } from "react";

export default function ThemeProvider({ children }) {
  const mode = useSelector((s) => s.theme.mode);

  useEffect(() => {
    const root = document.documentElement;
    if (mode === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [mode]);

  return <>{children}</>;
}
