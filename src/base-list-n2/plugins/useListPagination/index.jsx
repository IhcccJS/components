import React from 'react';
import { Pagination } from 'antd';

function useListPagination(instance, props) {
  const [current, setCurrent] = React.useState(1);

  const { request } = instance.getPlugin('request');

  const onChange = (page) => {
    setCurrent(page);
  };

  return {
    name: 'listPagination',
    content: (
      <Pagination
        size="small"
        total={request.data.total}
        current={current}
        onChange={onChange}
      />
    ),
  };
}

export default useListPagination;
