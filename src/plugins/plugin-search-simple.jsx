import React from 'react';
import ButtonList from '../button-list';
import Form from '../form';
import definePlugin from '../create-component/definePlugin';

export default definePlugin({
  name: 'search',
  priority: 'CONTENT',
  required: ['layout', 'request'],
  props: ['columns', 'search'],
  main(instance, props) {
    const { columns, search = {} } = props;

    const { request } = instance.getPlugin('request');

    const buttonBar = (
      <Form
        type="search"
        layout="inline"
        column={5}
        columns={columns}
        {...search}
        // 默认设置 100% 宽度；当搜索栏和按钮栏中一行时，保证搜索栏要撑满左侧空间；有更好方案可替换此操作
        style={{ width: '100%', ...search.style }}
        onFinish={(values) => request.search(values)}
        actionColumn={({ actionColumnColSpan }) => {
          return {
            key: '$$search',
            colSpan: actionColumnColSpan,
            style: { alignItems: 'flex-start' },
            element: (
              <ButtonList
                layout="end"
                buttons={[
                  { key: 'reset', group: 'search', props: { htmlType: 'reset', children: '重置' } },
                  { key: 'submit', group: 'search', props: { htmlType: 'submit', type: 'primary', children: '查询' } },
                ]}
              />
            ),
          };
        }}
      />
    );

    return { buttonBar };
  },
});
