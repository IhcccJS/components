// import React from 'react';
import { useApi } from '@ihccc/hooks';
import definePlugin from '../create-component/definePlugin';
// import { useMemoryGet, useMemorySet } from '@/utils/hooks/useMemory';
import promiseFn from '../utils/promise-fn';

export default definePlugin({
  name: 'request',
  priority: 'TOOL',
  props: ['namespace', 'request'],
  expose: [{ name: 'request', source: 'request' }],
  main(_, props) {
    // const { namespace } = props;

    const { query, defaultParams, ...requestProps } = props.request || {};

    // const { noData, initialData } = useMemoryGet(namespace, {
    //   data: {},
    // });

    const { noData, initialData } = {
      noData: true,
      initialData: {
        data: {},
      },
    };

    const request = useApi(query || promiseFn, {
      auto: noData,
      initialData: initialData.data,
      defaultParams: { ...defaultParams },
      ...requestProps,
    });

    // useMemorySet(namespace, { data: request.data });

    return {
      request: request,
    };
  },
});
