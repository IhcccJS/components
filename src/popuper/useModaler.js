import React from 'react';
import { ModalContext } from './context';

const None = () => {};

const NoEnableRes = {
  modal: {
    open: None,
    hide: None,
    close: None,
    destroy: None,
    setData: None,
  },
};

function useModaler(config) {
  const { namespace, items } = React.useRef(config || {}).current;
  const modalContext = React.useContext(ModalContext);

  React.useEffect(() => {
    if (!namespace || !items) return;
    if (!modalContext.enable) {
      console.error('<Modaler.System /> 组件没有在全局挂载！');
      return;
    }
    modalContext.setNamespace(namespace); // 设置当前的命名空间
  }, []);

  if (!modalContext.enable) return NoEnableRes;

  React.useEffect(() => {
    if (!namespace) return;
    modalContext.register(items);
    return () => modalContext.unregister(namespace);
  }, []);

  return {
    elements: modalContext.elements,
    modal: {
      setProps: modalContext.setProps,
      open: modalContext.open,
      hide: modalContext.hide,
      close: modalContext.close,
      toggle: modalContext.toggle,
      destroy: modalContext.destroy,
      bringToTop: modalContext.bringToTop,
    },
  };
}

export default useModaler;
