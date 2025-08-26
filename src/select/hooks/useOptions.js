import React from 'react';
import isEqual from 'lodash/isEqual';
import { useDebounceEffect } from 'ahooks';
import { useApi } from '@ihccc/hooks';
import { isObject, isArray } from '@ihccc/utils';
import store from '../store';

// 处理请求选项
function useQueryOptions(config, defaultConfig) {
  const { autoRunWait, query, params, initialData, ...restOption } = {
    autoRunWait: -1,
    initialData: [],
    ...defaultConfig,
    ...config,
    auto: false,
  };
  const initData = React.useRef(initialData).current;

  const request = useApi(query, {
    initialData: initData,
    ...restOption,
  });

  const run = React.useCallback(() => {
    if (request.data === initData) return request.run(params);
  }, [request.data, params]);

  useDebounceEffect(
    () => {
      if (autoRunWait > 0 && request.data === initData) {
        request.run(params);
      }
    },
    [request.data, params, autoRunWait],
    { wait: autoRunWait },
  );

  React.useEffect(() => {
    const changed = !isEqual(request.params, {
      ...restOption.defaultParams,
      ...params,
    });
    if (changed) request.mutate(initData);
  }, [restOption.defaultParams, params, request.run]);

  return { ...request, run };
}

// 处理缓存选项
function useStoreOptions(name, defaultConfig) {
  const [data, setData] = React.useState(defaultConfig.initialData);

  const changeData = React.useCallback(() => {
    setData(store.get(name, defaultConfig.initialData));
  }, [name]);

  React.useEffect(() => {
    // 设置缓存内的选项数据
    changeData();

    // 监听缓存数据变化，更新选项数据
    store.on('change/' + name, changeData);

    return () => {
      store.off('change/' + name, changeData);
    };
  }, [name, changeData]);

  return { data };
}

function useOptions(config, defaultConfig) {
  // 把 config 设置到 ref 防止变量类型变动
  const option = React.useRef(config);

  // 只允许相同类型的变动
  if (typeof config === typeof option.current) option.current = config;

  // 如果 option 是 数组数据，就直接返回
  if (isArray(option.current)) return { data: option.current };

  if (isObject(option.current)) {
    // 如果 option 是 对象，就执行调用请求，缓存数据
    return useQueryOptions(option.current, defaultConfig);
  }

  // 如果 option 是 字符串，就索引缓存数据
  return useStoreOptions(option.current, defaultConfig);
}

export default useOptions;
