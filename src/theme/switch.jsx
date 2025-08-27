import React from 'react';
import { Switch } from 'antd';
import useTheme from './useTheme';

function ThemeSwitch(props) {
  const theme = useTheme();

  return (
    <Switch
      checkedChildren="深色"
      unCheckedChildren="浅色"
      {...props}
      checked={theme.darkMode}
      onChange={(checked, event) => {
        theme.setTheme(theme.toggle[checked ? 1 : 0], event);
      }}
    />
  );
}

export default ThemeSwitch;
