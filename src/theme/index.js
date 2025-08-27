import ThemeSwitch from './switch';
import ThemeProvider from './provider';
import useTheme from './useTheme';

export { ThemeProvider, ThemeSwitch, useTheme };

const Theme = {
  Provider: ThemeProvider,
  Switch: ThemeSwitch,
  useTheme,
};

export default Theme;
