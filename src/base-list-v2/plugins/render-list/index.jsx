import React from 'react';
import { UnorderedListOutlined } from '@ant-design/icons';
import { List } from 'antd';

function refreshPlugin({ TYPE }) {
  return {
    key: 'renderList',

    type: TYPE.ELEMENT,

    propName: 'list',

    state: [{ key: 'renderType', value: 'list' }],

    methods: {
      renderList: ({ state, update }) => {
        if (state.renderType !== 'list') {
          state.renderType = 'list';
          update();
        }
      },
    },

    button: {
      key: 'list',
      group: 'list-render',
      tip: '列表',
      props: ({ state }) => ({
        type: state.renderType === 'list' ? 'primary' : 'default',
        icon: <UnorderedListOutlined />,
      }),
      onClick: ({ methods }) => {
        methods.renderList();
      },
    },

    component: (props) => <List {...props} />,
  };
}

export default refreshPlugin;
