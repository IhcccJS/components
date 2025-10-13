import React from 'react';
import { useUnmountedRef } from 'ahooks';
import { delay } from '@ihccc/utils';
import { ConfigContext } from '../../config/context';
import { TransitionContext } from '../context';

/** 默认转场样式类名 */
const ANIMATION_CLASSNAMES = {
  into: 'page-into',
  out: 'page-out',
};

const isUrl = (path) => /^(\w+?:)*?\/\/.+$/.test(path);

const pathChange = (type, pathname, history) => {
  if (isUrl(pathname)) {
    window.location[type](pathname);
  } else {
    history[type](pathname);
  }
};

const TAG_PAGE_LOADED = {};
const TRANSITION_EVENT_KEY = '__page_transition_end__';
let __animationType, __currentPath;

function TransitionRoute({
  disabled,
  preLoadPages,
  transitionClassNames,
  changeDelay = 0,
  eventEmitter,
  onPreNavigation,
  onLoadStart,
  onLoadError,
  onloadComplete,
  children,
}) {
  const unmountedRef = useUnmountedRef();
  const { location, history } = React.useContext(ConfigContext);
  __currentPath = location.pathname;
  // 页面转场执行元素 ref
  const animationRef = React.useRef();
  /**
   * 设置当前入场出场动画各状态的类名
   *
   * 第一个是隐藏类名，触发 transitionEnd 事件后逐个添加后续类名，直到添加完毕
   * - into 入场样式类名列表
   * - out 出场样式类名列表
   */
  /** 记录页面出场延迟时间 */
  const configRef = React.useRef({
    ...(transitionClassNames || ANIMATION_CLASSNAMES),
    enabled: true,
    delay: [0],
  });
  /** 设置转场状态 into / out */
  const [changeType, setChangeType] = React.useState('into');

  const changeAnimationType = (type) => {
    setChangeType(type);
    __animationType = type;
  };

  /** 入场 */
  const transitionInto = React.useCallback(() => {
    return new Promise((resolve) => {
      const classNames = configRef.current['into'];
      if (!classNames) return;
      changeAnimationType('into');
      eventEmitter.on(TRANSITION_EVENT_KEY, resolve);
    });
  }, []);

  /** 出场 */
  const transitionOut = React.useCallback(() => {
    return new Promise((resolve) => {
      // const { enabled, delay } = configRef.current;
      // if (enabled) setPageDelay(Math.max.apply(null, delay));
      changeAnimationType('out');
      eventEmitter.on(TRANSITION_EVENT_KEY, resolve);
    });
  }, []);

  const onAnimationEnd = React.useCallback((event) => {
    if (event.target !== animationRef.current || unmountedRef.current) return;
    changeAnimationType();
    eventEmitter.emit(TRANSITION_EVENT_KEY);
  }, []);

  /** 设定跳转路径和跳转类型 */
  const navigation = React.useCallback(
    async (type, pathname) => {
      if (!!__animationType || __currentPath === pathname) return;
      // 跳转前回调，可阻止跳转
      const exec = await onPreNavigation?.();
      if (exec === false) return;
      // 加载路由
      const pageLoader = (preLoadPages || {})[pathname];
      if (!!pageLoader && !TAG_PAGE_LOADED[pathname]) {
        // 开始回调
        onLoadStart?.();
        try {
          await pageLoader();
          // 加载成功回调
          TAG_PAGE_LOADED[pathname] = true;
        } catch (error) {
          // 加载失败回调
          onLoadError?.();
        }
        // 结束回调
        onloadComplete?.();
      }
      // 执行页面退场动画
      if (!disabled) await transitionOut();
      // 延迟跳转
      if (changeDelay > 0) await delay(changeDelay);
      // 跳转路径
      pathChange(type, pathname, history);
      // 执行页面进场动画
      if (!disabled) await transitionInto();
    },
    [disabled],
  );

  React.useEffect(() => {
    if (!eventEmitter) return;
    eventEmitter.on('navigation', navigation);
    return () => {
      eventEmitter.off('navigation', navigation);
    };
  }, []);

  return (
    <TransitionContext.Provider
      value={{
        pathname: location.pathname,
        visited: {},
        /** 执行转场元素的 ref */
        animationRef,
        onAnimationEnd,
        /** 转场类型 */
        changeType,
        /** 转场样式类名列表 */
        animationClassNames: configRef.current[changeType],
        navigation,
      }}
    >
      {children}
    </TransitionContext.Provider>
  );
}

export default TransitionRoute;
