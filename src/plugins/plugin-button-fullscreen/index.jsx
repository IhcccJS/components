import React from 'react';
import { FullscreenExitOutlined, FullscreenOutlined } from '@ant-design/icons';
import { useFullscreen } from 'ahooks';
import definePlugin from '../../create-component/definePlugin';

export default definePlugin({
  name: 'buttonFullscreen',
  priority: 'CONTENT',
  props: ['buttonEnabled', 'fullScreenClassName'],
  before(_, props) {
    const { buttonEnabled = {}, fullScreenClassName } = props;

    if (buttonEnabled.fullScreen === false) return;

    // const listScroll = instance.getPlugin('listScrollHeight');

    const fsClassName = fullScreenClassName || 'bc-system-default-page-fullscreen';

    const ref = React.useRef();
    const [isFullscreen, { toggleFullscreen }] = useFullscreen(ref, {
      pageFullscreen: { className: fsClassName, zIndex: 400 },
      // ...(!listScroll
      //   ? {}
      //   : {
      //       onEnter: () => listScroll.countHeight(fsClassName),
      //       onExit: () => listScroll.countHeight(),
      //     }),
    });

    return {
      refs: { root: ref },

      button: {
        key: 'fullScreen',
        props: ({ isFullscreen }) => ({
          title: isFullscreen ? '退出全屏' : '全屏',
          type: 'dashed',
          icon: isFullscreen ? <FullscreenExitOutlined /> : <FullscreenOutlined />,
        }),
        sort: 160,
      },

      data: { fullScreenClassName: fsClassName, isFullscreen },

      event: {
        fullScreen: () => toggleFullscreen(),
      },
    };
  },
});
