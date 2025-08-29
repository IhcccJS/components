/** 在其他组件调用设置数据和修改设置 */
import React from 'react';
import { SettingContext } from './context';

function useSetting() {
  const { enable, setting, onChange, options } = React.useContext(SettingContext);

  return { enable, data: setting, setData: onChange, options };
}

export default useSetting;
