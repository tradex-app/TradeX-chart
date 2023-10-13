import { useTheme as useThemeLib } from "next-themes";

import { THEMES } from "../theme";


const useTheme = (): {
  theme: string;
  setTheme: (newTheme: string) => void;
  isLightTheme: boolean;
  switchTheme: () => void;
} => {
  const { theme: libTheme, setTheme } = useThemeLib();
  const theme = libTheme || THEMES.DARK;
  
  const switchTheme = () => {
    const newTheme = theme === THEMES.LIGHT ? THEMES.DARK : THEMES.LIGHT;
    setTheme(newTheme);
  };

  return { theme, setTheme, isLightTheme: theme === THEMES.LIGHT, switchTheme };
};

export default useTheme;
