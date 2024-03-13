import React from 'react';
import { FullscreenExitOutlined, FullscreenOutlined } from '@ant-design/icons';

function fullscreen({ TYPE }) {
  return {
    key: 'buttonFullscreen',

    type: TYPE.BUTTON,

    state: [{ key: 'fullscreen', value: false }],

    methods: {
      toggleFullscreen: ({ state, update }) => {
        state.fullscreen = !state.fullscreen;
        update();
      },
    },

    button: {
      key: 'fullscreen',
      tip: ({ state }) => (state.fullscreen ? '退出全屏' : '全屏'),
      props: ({ state }) => ({
        type: state.fullscreen ? 'primary' : 'dashed',
        icon: state.fullscreen ? (
          <FullscreenExitOutlined />
        ) : (
          <FullscreenOutlined />
        ),
      }),
      onClick: ({ methods }) => {
        methods.toggleFullscreen();
      },
    },

    // 需要有方法操作 layout 内的元素或者样式
    // root: (dom) => dom,
  };
}

export default fullscreen;
