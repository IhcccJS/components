import React from 'react';
import { PopupContext } from './context';

const None = () => {};

const NoEnableRes = {
  elements: [],
  popup: {
    open: None,
    hide: None,
    close: None,
    destroy: None,
    setData: None,
  },
};

function usePopuper(config) {
  const { namespace, items } = React.useRef(config || {}).current;
  const popupContext = React.useContext(PopupContext);

  React.useEffect(() => {
    if (!namespace || !items) return;
    if (!popupContext.enable) {
      console.warn('<Popuper.System /> 组件没有在全局挂载！');
      return;
    }
    popupContext.setNamespace(namespace); // 设置当前的命名空间
  }, []);

  if (!popupContext.enable) return NoEnableRes;

  React.useEffect(() => {
    if (!namespace) return;
    popupContext.register(items);
    return () => popupContext.unregister(namespace);
  }, []);

  return {
    elements: popupContext.elements,
    popup: {
      setProps: popupContext.setProps,
      open: popupContext.open,
      hide: popupContext.hide,
      close: popupContext.close,
      toggle: popupContext.toggle,
      destroy: popupContext.destroy,
      bringToTop: popupContext.bringToTop,
    },
  };
}

export default usePopuper;
