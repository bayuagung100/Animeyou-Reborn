import React from 'react';
let theme = localStorage.getItem('dark-mode');
if (theme === null) {
    theme = false;
} else {
    theme = true;
}
export const DarkMode = theme;

export const themes = {
    light: {
      foreground: '#000000',
      background: '#eeeeee',
    },
    dark: {
      foreground: '#ffffff',
      background: '#222222',
    },
  };

export const ThemeContext = React.createContext({
    theme: themes.dark,
    toggleTheme: () => {},
    DarkMode: DarkMode,
    gelapClick: () => {},
    terangClick: () => {},
});