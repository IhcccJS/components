import React from 'react';
import { useApi } from '@ihccc/hooks';

const cacheData = {};

function useRequestHandle(instance, props) {
  const initialData = cacheData[props.namespace] || { list: [], total: 0 };

  const request = useApi(props.query, {
    auto: cacheData[props.namespace] === void 0,
    initialData,
  });

  React.useEffect(() => {
    return () => {
      cacheData[props.namespace] = request.data;
    };
  }, []);

  return {
    name: 'request',
    request,
  };
}

export default useRequestHandle;
