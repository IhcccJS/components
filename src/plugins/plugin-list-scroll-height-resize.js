import React from 'react';
import { definePlugin } from '@/components/@comp/create-component';

export default definePlugin({
  name: 'listScrollHeight',
  priority: 'CONTENT',
  props: [],
  main(_, props) {
    if (props.disableListScroll) return {};
    const [height, setHeight] = React.useState(void 0);

    // 固定的高度参数
    const pageHeight = React.useMemo(
      () => ({
        screen: window.screen.height,
        inner: window.innerHeight,
      }),
      [],
    );

    // 计算滚动列表的滚动高度
    // feat: 判断当前滚动条是否超出，滚动高度减页面高度算出超出的部分高度
    const countHeight = React.useCallback((fsClassName) => {
      // 先设置列表高度为屏幕最大高度
      setHeight(pageHeight.screen);
      // 使屏幕出现滚动条后，计算列表应该设置的滚动高度
      setTimeout(() => {
        let scrollHeight = 0;
        if (typeof fsClassName === 'string') {
          // 列表全屏，传入全屏容器的选择器，使用全屏的容器滚动高度计算
          scrollHeight = document.querySelector('.' + fsClassName).scrollHeight + 16;
        } else {
          // 列表没有全屏，使用页面滚动高度计算
          scrollHeight = document.body.scrollHeight;
        }
        // 超出滚动的高度 = 滚动高度 - 页面高度
        const overflowHeight = scrollHeight - pageHeight.inner;
        // 让页面不出现滚动的列表容器最大滚动高度 = 屏幕高度 - 超出滚动的高度
        setHeight(pageHeight.screen - overflowHeight);
      }, 50);
    }, []);

    React.useEffect(() => {
      countHeight();
      window.addEventListener('resize', countHeight);

      return () => {
        window.removeEventListener('resize', countHeight);
      };
    }, []);

    return {
      height,
      countHeight,
    };
  },
});
