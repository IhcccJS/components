import React from 'react';
import { useApi } from '@ihccc/hooks';
import definePlugin from '../create-component/definePlugin';
// import { useMemoryGet, useMemorySet } from '@/utils/hooks/useMemory';

// 刷新，当前分页，当前查询参数
// 查询，重置分页，新的查询参数
// 翻页，新的分页，当前查询参数

export default definePlugin({
  name: 'request',
  priority: 'TOOL',
  props: ['namespace', 'query'],
  expose: [{ name: 'request', source: 'request' }],
  main(_, props) {
    const { namespace, query } = props;

    const { pageSize, defaultParams, format, ...requestProps } = props.request || {};

    // const { noData, initialData } = useMemoryGet(namespace, {
    //   data: { list: [], total: 0 },
    //   page: { pageNumber: 1, pageSize: requestProps.pageSize || 10 },
    // });

    const { noData, initialData } = {
      noData: true,
      initialData: {
        data: { list: [], total: 0 },
        page: { pageNumber: 1, pageSize: pageSize || 10 },
      },
    };
    const [page, setPage] = React.useState(initialData.page);

    const request = useApi(query || (() => ({})), {
      auto: noData,
      initialData: initialData.data,
      // #FIXME: 重新打开页面，refresh 不会携带任何参数
      defaultParams: { ...defaultParams, ...page },
      format: (data) => {
        return format?.(data) || data || initialData.data;
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

    const goto = (pageNumber, pageSize) => {
      request.run({ ...request.params[0], pageNumber, pageSize });
    };

    // useMemorySet(namespace, { data: request.data, page });

    return {
      request: {
        ...request,
        page,
        search,
        goto,
      },
    };
  },
});
