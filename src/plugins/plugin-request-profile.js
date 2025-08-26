// import React from 'react';
import { useApi } from '@wowon/hooks';
import { definePlugin } from '@/components/@comp/create-component';
// import { useMemoryGet, useMemorySet } from '@/utils/hooks/useMemory';

export default definePlugin({
  name: 'request',
  priority: 'TOOL',
  props: ['namespace', 'query', 'request'],
  expose: [{ name: 'request', source: 'request' }],
  main(_, props) {
    const { namespace, query, request: requestProps = {} } = props;

    // const { noData, initialData } = useMemoryGet(namespace, {
    //   data: {},
    // });

    const { noData, initialData } = {
      noData: true,
      initialData: {
        data: {},
      },
    };

    const request = useApi(query || (() => ({})), {
      auto: noData,
      initialData: initialData.data,
      defaultParams: { ...requestProps.defaultParams },
    });

    // useMemorySet(namespace, { data: request.data });

    return {
      request: request,
    };
  },
});
