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
