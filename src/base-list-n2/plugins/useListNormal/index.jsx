import React from 'react';
import { List } from 'antd';
import { useMemoizedFn } from 'ahooks';

function useListNormal(instance) {
  const content = React.memo((props) => {
    const { renderItem } = props;
    const { request } = instance.getPlugin('request');

    return (
      <List
        loading={request.loading}
        itemLayout="horizontal"
        dataSource={request.data.list}
        renderItem={useMemoizedFn(renderItem)}
        pagination={{
          size: 'small',
          defaultCurrent: 1,
          total: request.data.total,
        }}
      />
    );
  });

  return { name: 'listNormal', content, props: ['renderItem'] };
}

export default useListNormal;
