import React from 'react';
import { useUnmountedRef } from 'ahooks';
import { isFunction } from '@ihccc/utils';
import AccessContext from './context';
import accessHandler from './access-handler';

const System = (props) => {
  const { getPathname, data: accessData, handlers, children } = props;

  const handleFilterEvents = React.useRef(
    Object.assign(accessHandler, handlers),
  ).current;
  const [accessUpdate, setAccessUpdate] = React.useState({});
  const accessMapRef = React.useRef({});
  const unmountedRef = useUnmountedRef();

  const getSeedKey = React.useCallback(
    (access) =>
      (access.path || '') +
      ':' +
      (access.name || '') +
      ':' +
      (access.key || ''),
    [],
  );

  React.useEffect(() => {
    if (unmountedRef.current) return;
    for (let index = 0; index < accessData.length; index++) {
      const auth = accessData[index];
      const seed = getSeedKey(auth);
      if (!accessMapRef.current[seed]) accessMapRef.current[seed] = auth;
    }
    setAccessUpdate({});
  }, [accessData]);

  const addLockedAccess = React.useCallback((name, status) => {
    if (unmountedRef.current) return;
    for (const key in status) {
      const auth = { name, key, ...status[key] };
      const seed = getSeedKey(auth);
      accessMapRef.current[seed] = auth;
    }
    setAccessUpdate({});
  }, []);

  const removeLockedAccess = React.useCallback((name, status) => {
    if (unmountedRef.current) return;
    for (const key in status) {
      const seed = getSeedKey({ name, key, ...status[key] });
      delete accessMapRef.current[seed];
    }
    setAccessUpdate({});
  }, []);

  const checkAccessData = React.useCallback((data, element) => {
    seed = getSeedKey({ ...element, name: '' });
    if (data[seed]) return data[seed];

    seed = getSeedKey({ ...element, path: '' });
    if (data[seed]) return data[seed];

    seed = getSeedKey({ ...element, path: '', name: '' });
    if (data[seed]) return data[seed];

    let seed = getSeedKey(element);
    if (data[seed]) return data[seed];
  }, []);

  // 用于处理单个
  const getHitOneFilter = React.useCallback(
    (element) => checkAccessData(accessMapRef.current, element),
    [accessUpdate],
  );

  // 用于处理多个
  const getHitManyFilter = React.useCallback(
    (element, config) => {
      const filterHandler = isFunction(config.handler)
        ? config.handler
        : handleFilterEvents[config.handler];
      if (!filterHandler) {
        console.warn(
          `<Access.System /> handlers 参数没有配置名称是 {${config.handler}} 的处理方法！更多参考：`,
          element,
          config,
        );
        return (data) => data;
      }
      const filterCallback = (item) => {
        const authority = checkAccessData(accessMapRef.current, {
          ...element,
          key: item.key || item[config.keyName],
        });
        return filterHandler(authority, item);
      };
      return (data) => data?.filter(filterCallback) || [];
    },
    [accessUpdate],
  );

  return (
    <AccessContext.Provider
      value={{
        enable: true,
        addLockedAccess,
        removeLockedAccess,
        getPathname,
        getHitOneFilter,
        getHitManyFilter,
      }}
    >
      {children}
    </AccessContext.Provider>
  );
};

export default System;
