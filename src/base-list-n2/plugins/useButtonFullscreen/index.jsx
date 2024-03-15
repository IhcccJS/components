import React from 'react';
import { FullscreenExitOutlined, FullscreenOutlined } from '@ant-design/icons';
import { useFullscreen } from 'ahooks';

function useButtonFullscreen(instance, props) {
  const ref = React.useRef();
  const [isFullscreen, { toggleFullscreen }] = useFullscreen(ref);

  return {
    name: 'buttonFullscreen',

    refs: { root: ref },

    button: [
      {
        key: 'fullScreen',
        tip: isFullscreen ? '退出全屏' : '全屏',
        props: {
          type: 'dashed',
          icon: isFullscreen ? (
            <FullscreenExitOutlined />
          ) : (
            <FullscreenOutlined />
          ),
        },
      },
    ],

    event: {
      fullScreen: () => toggleFullscreen(),
    },
  };
}

export default useButtonFullscreen;
