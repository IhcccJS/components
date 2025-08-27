import React from 'react';
import { Pagination } from 'antd';
import definePlugin from '../create-component/definePlugin';

export default definePlugin({
  name: 'listPagination',
  priority: 'CONTENT',
  props: [],
  main(instance, props) {
    const { pagination } = props;

    if (pagination === false) return;

    const { request } = instance.getPlugin('request');

    return {
      footer: (
        <Pagination
          size="small"
          showSizeChanger
          showQuickJumper
          showTotal={(total) => `总计 ${total} 项`}
          {...pagination}
          total={request.data.total}
          current={request.page.pageNumber}
          pageSize={request.page.pageSize}
          onChange={request.goto}
          style={{ marginLeft: 'auto' }}
        />
      ),
    };
  },
});
