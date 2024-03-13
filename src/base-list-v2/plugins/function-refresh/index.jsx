import React from 'react';
import { ReloadOutlined } from '@ant-design/icons';

function refreshPlugin({ TYPE }) {
  return {
    key: 'buttonRefresh',

    type: TYPE.BUTTON,

    button: {
      key: 'refresh',
      tip: '刷新',
      props: { type: 'dashed', icon: <ReloadOutlined /> },
      onClick: ({ methods }) => {
        methods.refresh();
      },
    },
  };
}

export default refreshPlugin;
