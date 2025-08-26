import React from 'react';
import { ThemeContext } from './context';

function useTheme() {
  return React.useContext(ThemeContext);
}

export default useTheme;
