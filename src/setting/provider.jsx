import React from 'react';
import { SettingContext } from './context';

// 从缓存内获取设置信息，实现用户修改设置后进行保存
// const { setting, setInitialState } = useModel('@@initialState', (model) => {
//   return {
//     // loading: model.loading,
//     setting: model.initialState?.setting,
//     setInitialState: model.setInitialState,
//   };
// });

// const onChange = React.useCallback((setting) => {
//   setInitialState((state) => {
//     const globalState = {
//       ...state,
//       setting: { ...state.setting, ...(isFunction(setting) ? setting(state.setting) : setting) },
//     };
//     setStorage(STORAGE_NAMES.userSetting, globalState.setting);
//     return globalState;
//   });
// }, []);

/** 向页面提供用户设置配置 */
function SettingProvider({ submitButton, setting, defaultSetting, options, onChange, children }) {
  const allOptions = React.useMemo(() => {
    const [global, ...innerPage] = options.filter((i) => !!i);

    const globalColumns = global?.columns || [];

    const globalGroupLabel = global?.groupLabel || {};

    const globalGroup = globalColumns.reduce((group, column) => {
      const gname = column.group;
      if (!!gname && group.indexOf(gname) === -1) return group.concat(gname);
      return group;
    }, []);

    const innerOptions = innerPage.reduce((list, option) => {
      const columns = option.columns.map((item) => {
        return {
          ...item,
          ...(!item.name ? {} : { name: `${option.prefix}/${item.name}` }),
          ...(!item.dataIndex ? {} : { dataIndex: `${option.prefix}/${item.dataIndex}` }),
        };
      });
      list[option.prefix] = { ...option, columns };
      return list;
    }, {});

    return { global: globalColumns, globalGroupLabel, globalGroup, innerOptions };
  }, []);

  return (
    <SettingContext.Provider value={{ setting, defaultSetting, options: allOptions, submitButton, onChange }}>
      {children}
    </SettingContext.Provider>
  );
}

export default SettingProvider;
