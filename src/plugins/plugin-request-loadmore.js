import React from 'react';
import { useApi } from '@ihccc/hooks';
// import { useMemoryGet, useMemorySet } from '@/utils/hooks/useMemory';
import definePlugin from '../create-component/definePlugin';
import UnknowPromiseFn from '../utils/promise-fn';

export default definePlugin({
  name: 'request',
  priority: 'TOOL',
  props: ['namespace', 'request'],
  expose: [{ name: 'request', source: 'request' }],
  main(_, props) {
    // const { namespace } = props;

    const { query, pageSize, defaultParams, format, ...requestProps } = props.request || {};

    // const { noData, initialData } = useMemoryGet(namespace, {
    //   data: { list: [], total: 0 },
    //   page: { pageNumber: 1, pageSize: pageSize || 10 },
    // });
    const { noData, initialData } = {
      noData: true,
      initialData: {
        data: { list: [], total: 0 },
        page: { pageNumber: 1, pageSize: pageSize || 10 },
      },
    };
    const [page, setPage] = React.useState(initialData.page);

    const lastDataRef = React.useRef(initialData.data.list);

    const request = useApi(query || UnknowPromiseFn, {
      auto: noData,
      initialData: initialData.data,
      defaultParams: { ...defaultParams, ...page },
      successCode: '0',
      format: (data, params) => {
        const { pageNumber } = params?.[0] || page;
        const { list, total } = format?.(data) || data || initialData.data;
        let result;
        if (pageNumber > page.pageNumber) {
          result = { list: lastDataRef.current.concat(list), total };
        } else {
          result = { list, total };
        }
        result.loadOver = result.list.length >= result.total;
        lastDataRef.current = result.list;
        return result;
      },
      onPass: (_, params) => {
        const { pageNumber, pageSize } = params?.[0] || page;
        setPage({ pageNumber, pageSize });
      },
      ...requestProps,
    });

    const search = (params) => {
      request.run({ ...defaultParams, ...params, pageNumber: 1 });
    };

    const loadMore = () => {
      request.run({ ...request.params[0], pageNumber: page.pageNumber + 1 });
    };

    // useMemorySet(namespace, { data: request.data, page });

    return {
      request: { ...request, page, search, refresh: search, loadMore },
    };
  },
});
