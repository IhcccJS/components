import React from 'react';
import definePlugin from '../create-component/definePlugin';

export default definePlugin({
  name: 'request',
  priority: 'TOOL',
  props: ['table'],
  expose: [{ name: 'request', source: 'request' }],
  main(_, props) {
    const { table: tableProps = {} } = props;

    const [page, setPage] = React.useState({
      pageNumber: tableProps.pagination?.current || 1,
      pageSize: tableProps.pagination?.pageSize || 10,
    });

    const search = (params) => {
      setPage((page) => ({ ...page, pageNumber: 1 }));
    };

    const goto = (pageNumber, pageSize) => {
      setPage({ pageNumber, pageSize });
    };

    return {
      request: {
        loading: tableProps.loading || false,
        data: {
          list: tableProps.dataSource || [],
          total: (tableProps.dataSource || []).length,
        },
        page,
        search,
        goto,
      },
    };
  },
});
