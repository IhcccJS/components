import React from 'react';
import { loadCss } from '@ihccc/utils';
import getSetting from '@/components/setting/getSetting';
import { ThemeContext } from './context';

export const changeTheme = (theme) => {
  try {
    if (theme === void 0) {
      const setting = getSetting();
      if (!setting.THEMES || setting.THEMES.length === 0 || !setting['Theme']) return;
      theme = setting.THEMES.find((item) => item.value === setting['Theme']);
      if (!theme) return;
    }
    // 加载主题变量
    loadCss(theme.path + '/index.css');
    document.documentElement.setAttribute('data-theme', theme.value);
  } catch (error) {
    console.error('🎨 主题样式加载失败！！！');
    throw error;
  }
};

const updateTheme = async (theme, event = null) => {
  //在不支持的浏览器里不做动画
  if (event === null) event = { clientX: window.innerWidth / 2, clientY: window.innerHeight / 2 };
  if (!document.startViewTransition || !event) {
    changeTheme(theme);
    return;
  }
  // 开始一次视图过渡：
  const transition = document.startViewTransition(() => changeTheme(theme));

  await transition.ready;

  const x = event.clientX;
  const y = event.clientY;
  //计算按钮到最远点的距离用作裁剪圆形的半径
  const endRadius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));
  const keyframes = [
    { clipPath: `circle(0px at ${x}px ${y}px)` },
    { clipPath: `circle(${endRadius}px at ${x}px ${y}px)` },
  ];
  //开始动画
  document.documentElement.animate(keyframes, {
    duration: 400,
    easing: 'ease',
    pseudoElement: '::view-transition-new(root)',
  });
};

function ThemeProvider({ theme, list, toggle, onChange, children }) {
  const mouseEventRef = React.useRef(false);

  const changeTheme = React.useCallback((themeKey, event) => {
    if ((!themeKey && themeKey !== 0) || !onChange) return;
    const theme = typeof themeKey === 'number' ? list[themeKey] : list.find((item) => item.value === themeKey);
    if (!theme) return;
    updateTheme(theme, event);
  }, []);

  const setTheme = React.useCallback((themeKey, event) => {
    if (!onChange) return;
    onChange(themeKey);
    mouseEventRef.current = event;
  }, []);

  React.useEffect(() => {
    changeTheme(theme, mouseEventRef.current);
    mouseEventRef.current = null;
  }, [theme]);

  const selectedIndex = React.useMemo(() => (list || []).findIndex((item) => item.value === theme), [theme]);

  const darkMode = React.useMemo(() => (theme || '').indexOf('dark') > 0, [theme]);

  return (
    <ThemeContext.Provider value={{ selected: theme, selectedIndex, darkMode, list, toggle, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export default ThemeProvider;
