import React from 'react';
import { useApi } from '@wowon/hooks';
// import { useMemoryGet, useMemorySet } from '@/utils/hooks/useMemory';
import { definePlugin } from '@/components/@comp/create-component';

export default definePlugin({
  name: 'request',
  priority: 'TOOL',
  props: ['namespace', 'query', 'request'],
  expose: [{ name: 'request', source: 'request' }],
  main(_, props) {
    const { namespace, query, request: requestProps = {} } = props;

    // const { noData, initialData } = useMemoryGet(namespace, {
    //   data: { list: [], total: 0 },
    //   page: { pageNumber: 1, pageSize: requestProps.pageSize || 10 },
    // });
    const { noData, initialData } = {
      noData: true,
      initialData: {
        data: { list: [], total: 0 },
        page: { pageNumber: 1, pageSize: requestProps.pageSize || 10 },
      },
    };
    const [page, setPage] = React.useState(initialData.page);

    const lastDataRef = React.useRef(initialData.data.list);

    // #FIXME: useApi 暴露了多余的 runNext 方法
    const request = useApi(query, {
      auto: noData,
      initialData: initialData.data,
      defaultParams: { ...requestProps.defaultParams, ...page },
      successCode: '0',
      format: (data, params) => {
        const { pageNumber } = params?.[0] || page;
        const { list, total } = requestProps.format?.(data) || data || initialData.data;
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
    });

    const search = (params) => {
      request.run({ ...requestProps.defaultParams, ...params, pageNumber: 1 });
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
