import React from 'react';
import { isFunction } from '@ihccc/utils';
import AccessContext from './context';
import accessHandler from './access-handler';

const defaultGetAccessKey = (el) => {
  const pathname = window.location?.pathname || '';
  return [el.key, `${el.name || ''}:${el.key || ''}`.replace('::', ':'), `${pathname}:${el.name || ''}:${el.key || ''}`.replace('::', ':')];
};

const System = (props) => {
  const { getAccessKey = defaultGetAccessKey, data, handlers, children } = props;

  const handleFilterEvents = React.useRef(Object.assign(accessHandler, handlers)).current;
  const [locked, setLocked] = React.useState({});

  const accessMap = React.useMemo(() => Object.assign({}, data, locked), [data, locked]);

  const addLockedAccess = React.useCallback((lockedAccess) => {
    setLocked((current) => Object.assign({}, current, lockedAccess));
  }, []);

  const removeLockedAccess = React.useCallback((lockedAccess) => {
    setLocked((current) => {
      const newLocked = Object.assign({}, current);
      for (const key in lockedAccess) {
        delete newLocked[key];
      }
      return newLocked;
    });
  }, []);

  const checkAccessData = React.useCallback(
    (el) => {
      const fullKey = getAccessKey?.(el);

      if (Array.isArray(fullKey)) {
        for (let index = 0; index < fullKey.length; index++) {
          const authority = accessMap[fullKey[index]];
          if (!!authority) return authority;
        }
        return {};
      }
      return accessMap[fullKey] || {};
    },
    [accessMap],
  );

  // 用于处理多个
  const getHitManyFilter = React.useCallback(
    (config) => {
      const filterHandler = isFunction(config.handler) ? config.handler : handleFilterEvents[config.handler];
      if (!filterHandler) {
        console.warn(`<Access.System /> handlers 参数没有配置名称是 {${config.handler}} 的处理方法！更多参考：`, config);
        return (columns) => columns || [];
      }
      const filterCallback = (el) => {
        const key = el.key || el[config.keyName];
        const authority = checkAccessData({ name: config.name, key });
        return filterHandler(authority, Object.assign({}, el));
      };
      return (columns) => (columns || []).map(filterCallback).filter(Boolean) || [];
    },
    [checkAccessData],
  );

  return (
    <AccessContext.Provider
      value={{
        enable: true,
        addLockedAccess,
        removeLockedAccess,
        getHitOneFilter: checkAccessData,
        getHitManyFilter,
      }}
    >
      {children}
    </AccessContext.Provider>
  );
};

export default System;
