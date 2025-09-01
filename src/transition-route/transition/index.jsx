import React from 'react';
import { useUnmountedRef } from 'ahooks';
import { TransitionContext } from '../context';
import { ConfigContext } from '../../config/context';

/** 默认转场样式类名 */
const TRANSITION_CLASSNAMES = {
  into: ['page-into-init', 'page-into-hidden', 'page-into-show'],
  out: ['page-out-hidden', 'page-out-show'],
  // into: ['page-into-init', 'page-into-hidden', 'page-into-step1', 'page-into-step2'],
  // out: ['page-out-hidden', 'page-out-step1', 'page-out-step2'],
};

const isUrl = (path) => /^(\w+?:)*?\/\/.+$/.test(path);

const onPathChange = (type, pathname, history) => {
  if (isUrl(pathname)) {
    window.location[type](pathname);
  } else {
    history[type](pathname);
  }
};

function TransitionRoute({ defaultTransitionClassNames, children }) {
  const unmountedRef = useUnmountedRef();
  const { location, history } = React.useContext(ConfigContext);
  // 页面转场执行元素 ref
  const transitionRef = React.useRef();
  /**
   * 设置当前入场出场动画各状态的类名
   *
   * 第一个是隐藏类名，触发 transitionEnd 事件后逐个添加后续类名，直到添加完毕
   * - into 入场样式类名列表
   * - out 出场样式类名列表
   */
  /** 记录页面出场延迟时间 */
  const configRef = React.useRef({
    ...(defaultTransitionClassNames || TRANSITION_CLASSNAMES),
    enabled: true,
    delay: [0],
  });
  /** 设置页面出场延迟时间 */
  const [pageDelay, setPageDelay] = React.useState(0);
  /** 设置待调整页面路径和类型 */
  const [nextPath, setNextPath] = React.useState({ type: 'replace', pathname: '' });
  /** 设置转场状态 into / out */
  const [changeType, setChangeType] = React.useState('into');
  /** 转场进度 */
  const [transitionProgress, setTransitionProgress] = React.useState(0);

  /** 获取当前转场的类名列表 */
  const transitionClassNames = React.useMemo(() => {
    const classNames = configRef.current[changeType] || [];
    if (changeType === 'into' && transitionProgress === classNames.length) return [];
    if (changeType === 'out' && transitionProgress === -1) return [];
    return classNames.slice(0, transitionProgress + 1);
  }, [changeType, transitionProgress]);

  // console.log(changeType, transitionProgress, transitionClassNames);

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
    const classNames = configRef.current['into'] || [];
    if (classNames.length < 2) return;
    setChangeType('into');
    setTransitionProgress(0);
    setTimeout(() => {
      setTransitionProgress(1);
    }, 20);
  }, []);

  /** 出场 */
  const transitionOut = React.useCallback(() => {
    if (unmountedRef.current || nextPath.pathname === location.pathname) return;
    // console.log('出场开始');
    const { enabled, delay, out } = configRef.current;
    const classNames = out || [];
    if (enabled) setPageDelay(Math.max.apply(null, delay));
    setChangeType('out');
    setTransitionProgress(classNames.length - 1);
    setTimeout(() => {
      setTransitionProgress(classNames.length - 2);
    });
  }, []);

  /** 设定跳转路径和跳转类型 */
  const navigation = React.useCallback((type, pathname) => {
    if (!type || !pathname) return;
    const classNames = configRef.current['out'] || [];
    // 没有状态，执行跳转
    if (classNames.length < 2) {
      onPathChange?.(type, pathname, history);
      return;
    }
    // 重置一个新对象，会导致再次执行入场动画
    // setNextPath({ type, pathname });
    setNextPath((current) => {
      if (current.type === type && current.path === pathname) return current;
      return { type, pathname };
    });
  }, []);

  const onTransitionEnd = React.useCallback(
    (event) => {
      if (unmountedRef.current || event.target !== transitionRef.current) return;

      const classNames = configRef.current[changeType] || [];

      const { type, pathname } = nextPath;

      if (changeType === 'into') {
        if (transitionProgress < classNames.length) {
          // 状态过渡完，进度下一状态
          setTransitionProgress(transitionProgress + 1);
        } else {
          // console.log('入场完毕');
        }
      }

      if (changeType === 'out') {
        if (transitionProgress > 0) {
          // 状态过渡完，进度下一状态
          setTransitionProgress(transitionProgress - 1);
        } else {
          // console.log('出场完毕，执行跳转');
          // 没有状态，执行跳转
          onPathChange?.(type, pathname, history);
        }
      }
    },
    [changeType, nextPath, location.pathname, transitionProgress],
  );

  React.useEffect(() => {
    if (unmountedRef.current) return;
    if (location.pathname === nextPath.pathname) {
      // console.log('入场开始');
      transitionInto();
    } else {
      if (!nextPath.pathname) setNextPath({ type: 'replace', pathname: location.pathname });
      transitionOut();
    }
  }, [location.pathname, nextPath]);

  return (
    <TransitionContext.Provider
      value={{
        pathname: nextPath.pathname,
        /** 执行转场元素的 ref */
        transitionRef,
        onTransitionEnd,
        /** 转场类型 */
        changeType,
        /** 转场进度 */
        progress: transitionProgress,
        /** 转场样式类名列表 */
        transitionClassNames,
        transitionDelay: pageDelay,
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
