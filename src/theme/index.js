import ThemeSwitch from './switch';
import ThemeProvider, { getChangeTheme } from './provider';
import useTheme from './useTheme';

export { ThemeProvider, ThemeSwitch, useTheme };

const Theme = {
  Provider: ThemeProvider,
  Switch: ThemeSwitch,
  useTheme,
  getChangeTheme,
};

export default Theme;
