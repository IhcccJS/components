/** 在其他组件调用设置数据和修改设置 */
import React from 'react';
import { useModel } from 'umi';
import { isFunction, setStorage } from '@ihccc/utils';
import { STORAGE_NAMES } from '@/common/constant';
import defaultSetting from '@/common/default-setting';
import { SettingContext } from './context';

function useSetting() {
  const { options } = React.useContext(SettingContext);

  const { setting, setInitialState } = useModel('@@initialState', (model) => {
    return {
      // loading: model.loading,
      setting: model.initialState?.setting,
      setInitialState: model.setInitialState,
    };
  });

  const setData = React.useCallback((setting) => {
    setInitialState((state) => {
      const globalState = {
        ...state,
        setting: { ...state.setting, ...(isFunction(setting) ? setting(state.setting) : setting) },
      };
      setStorage(STORAGE_NAMES.userSetting, globalState.setting);
      return globalState;
    });
  }, []);

  return {
    data: setting || defaultSetting,
    setData,
    options,
  };
}

export default useSetting;
