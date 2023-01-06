import { createContext, useContext } from 'react';

export type ColorScheme = 'light' | 'dark';

export interface ThemeContextType {
  colorScheme: ColorScheme,
  changeColorScheme: (scheme: ColorScheme) => void;
};

export const ThemeContext = createContext<ThemeContextType>(undefined!);

export const useTheme = () => useContext(ThemeContext);
