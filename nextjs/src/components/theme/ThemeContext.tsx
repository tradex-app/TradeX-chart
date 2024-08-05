import { ThemeProvider } from "next-themes";

import { THEME_PROPERTY, THEMES } from "./properties";
import React from "react";

const ThemeContextProvider = ({ children }) => {
  return (
    <ThemeProvider
      storageKey={THEME_PROPERTY}
      defaultTheme={THEMES.DARK}
      attribute="class"
    >
      {children}
    </ThemeProvider>
  );
};

export default ThemeContextProvider;
