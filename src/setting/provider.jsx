import React from 'react';
import { SettingContext } from './context';

/** 向页面提供用户设置配置 */
function SettingProvider({ submitButton, initailValues, options, onChange, children }) {
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
    <SettingContext.Provider value={{ initailValues, options: allOptions, submitButton, onChange }}>
      {children}
    </SettingContext.Provider>
  );
}

export default SettingProvider;
