import React from 'react';
import { TableOutlined } from '@ant-design/icons';
import { Table } from 'antd';

function refreshPlugin({ TYPE, plugins }) {
  const plugin = {
    key: 'renderTable',

    type: TYPE.ELEMENT,

    propName: 'list',

    state: [{ key: 'renderType', value: 'table' }],

    methods: {
      renderTable: ({ state, update }) => {
        if (state.renderType !== 'table') {
          state.renderType = 'table';
          update();
        }
      },
    },

    button: {
      key: 'table',
      group: 'list-render',
      tip: '表格',
      props: ({ state }) => ({
        type: state.renderType === 'table' ? 'primary' : 'default',
        icon: <TableOutlined />,
      }),
      onClick: ({ methods }) => {
        methods.renderTable();
      },
    },

    component: (props) => <Table {...props} />,
  };

  return plugin;
}

export default refreshPlugin;
