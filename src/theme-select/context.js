import React from 'react';

export const ThemeContext = React.createContext({
  selected: '',
  selectedIndex: 0,
  list: [],
  toggle: [],
  setTheme: () => {},
});
