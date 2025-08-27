import React from 'react';
import { useUnmountedRef } from 'ahooks';
import { TransitionContext } from '../context';

// console.log(history);
/** 默认转场样式类名 */
const ANIMATION_CLASSNAMES = {
  into: 'page-into',
  out: 'page-out',
};

const isUrl = (path) => /^(\w+?:)*?\/\/.+$/.test(path);

const onPathChange = (type, pathname) => {
  if (isUrl(pathname)) {
    window.location[type](pathname);
  } else {
    // todo 使用 config 组件传递的 history
    // history[type](pathname);
  }
};

let loopTimer = null;

function TransitionRoute({ eventEmitter, enableTransition, defaultAnimationClassNames, children }) {
  const unmountedRef = useUnmountedRef();
  // todo 使用 config 组件传递的 location
  const location = {};
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
    ...(defaultAnimationClassNames || ANIMATION_CLASSNAMES),
    enabled: true,
    delay: [0],
  });
  /** 设置页面出场延迟时间 */
  const [pageDelay, setPageDelay] = React.useState(0);
  /** 设置待调整页面路径和类型 */
  const [nextPath, setNextPath] = React.useState({ type: 'replace', pathname: '' });
  /** 设置转场状态 into / out */
  const [changeType, setChangeType] = React.useState('');
  /** 收集页面访问历史 */
  const [visited, setVisited] = React.useState([]);
  // TODO 待优化，有没有不需要计时器的方法
  const loopRef = React.useRef(0);

  /** 修改当前出场样式类名 */
  const setIntoClassNames = React.useCallback((classNames = []) => {
    Object.assign(configRef.current, { out: classNames });
  }, []);

  /** 修改当前入场样式类名 */
  const setOutClassNames = React.useCallback((classNames = []) => {
    Object.assign(configRef.current, { into: classNames });
  }, []);

  /** 启用/禁用出场延迟时间 */
  const setTransitionDelayEnabled = React.useCallback((enabled = false) => {
    configRef.current.enabled = enabled;
  }, []);

  /** 记录出场延迟时间 */
  const setTransitionDelay = React.useCallback((delay = 0) => {
    configRef.current.delay.push(delay);
    return configRef.current.delay.length;
  }, []);

  /** 删除出场延迟时间 */
  const removeTransitionDelay = React.useCallback((index) => {
    configRef.current.delay.splice(index, 1);
  }, []);

  /** 记录页面元素的播放时间 */
  const setElementTransitionTime = React.useCallback((delay) => {
    const index = setTransitionDelay(delay);
    return () => {
      removeTransitionDelay(index);
    };
  }, []);

  /** 入场 */
  const transitionInto = React.useCallback(() => {
    const classNames = configRef.current['into'];
    if (!classNames) return;
    setChangeType('into');
  }, []);

  /** 出场 */
  const transitionOut = React.useCallback(() => {
    // console.log(type, pathname, location.pathname, pathname);
    // 跳转路径和当前路径一致就忽略操作
    if (nextPath.pathname === location.pathname) return;
    const { enabled, delay } = configRef.current;
    if (enabled) setPageDelay(Math.max.apply(null, delay));
    setChangeType('out');
  }, []);

  /** 设定跳转路径和跳转类型 */
  const navigation = React.useCallback(
    (type, pathname) => {
      if (!type || !pathname) return;

      if (!enableTransition) {
        onPathChange?.(type, pathname);
        return;
      }

      const classNames = configRef.current['out'];

      setVisited((list) => {
        const lastOne = list[list.length - 1];
        if (lastOne !== pathname) return list.concat(pathname);
        return list;
      });

      if (!classNames) {
        // 没有状态，执行跳转
        onPathChange?.(type, pathname);
        return;
      }
      // 重置一个新对象，会导致再次执行入场动画
      // setNextPath({ type, pathname });
      setNextPath((current) => {
        if (current.type === type && current.path === pathname) return current;
        return { type, pathname };
      });
    },
    [enableTransition],
  );

  const onAnimationEnd = React.useCallback(
    (event) => {
      if (event.target !== animationRef.current || unmountedRef.current) return;

      const { type, pathname } = nextPath;

      if (changeType === 'into') {
        // console.log('入场完毕');
        setChangeType('');
        return;
      }

      if (changeType === 'out') {
        // console.log('出场完毕，执行跳转', type, pathname);
        setChangeType('into');
        // 没有状态，执行跳转
        onPathChange?.(type, pathname);
        return;
      }
    },
    [nextPath, location.pathname, changeType],
  );

  React.useEffect(() => {
    if (unmountedRef.current) return;
    if (loopRef.current > 2) {
      if (!loopTimer) {
        loopTimer = setTimeout(() => {
          loopRef.current = 0;
          loopTimer = null;
        }, 500);
      }
      return;
    }
    loopRef.current++;

    // 页面挂载时触发，设置待跳转路径为当前路径，但是不会执行跳转
    if (location.pathname === nextPath.pathname) {
      // console.log('入场开始');
      transitionInto();
    } else {
      if (!nextPath.pathname) {
        setNextPath({ type: 'replace', pathname: location.pathname });
        setVisited([location.pathname]);
      }
      transitionOut();
    }
  }, [location.pathname, nextPath]);

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
        pathname: nextPath.pathname,
        /** 执行转场元素的 ref */
        animationRef,
        onAnimationEnd,
        visited,
        /** 转场类型 */
        changeType,
        /** 转场样式类名列表 */
        animationClassNames: configRef.current[changeType],
        animationDelay: pageDelay,
        setIntoClassNames,
        setOutClassNames,
        setTransitionDelayEnabled,
        setTransitionDelay,
        removeTransitionDelay,
        setElementTransitionTime,
        transitionInto,
        transitionOut,
        navigation,
      }}
    >
      {children}
    </TransitionContext.Provider>
  );
}

export default TransitionRoute;
