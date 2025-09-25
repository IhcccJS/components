import React from 'react';
import PopupStore from './popup-store';
import { PopupContext } from './context';

function PopupSystem(props) {
  const {
    max = 10,
    container,
    eventEmitter,
    defaultType = 'popup',
    defaultPopupProps,
    onOpenOverflow,
    // openPosition,
    // openOffset,
    children,
  } = props;

  const [updateKey, setUpdateKey] = React.useState();

  const update = React.useCallback(() => setUpdateKey({}), []);

  const [popupInstance] = React.useState(() => {
    const popupStore = new PopupStore({
      max,
      container,
      defaultType,
      defaultPopupProps,
      onOpenOverflow,
      update,
    });

    // usePopuper usePopup 可以获取到的属性和方法
    return {
      popupStore,
      namespace: popupStore.namespace,
      setNamespace: popupStore.setNamespace.bind(popupStore),
      getTask: popupStore.getTask.bind(popupStore),
      register: popupStore.register.bind(popupStore),
      unregister: popupStore.unregister.bind(popupStore),
      setProps: popupStore.setProps.bind(popupStore),
      open: popupStore.open.bind(popupStore),
      hide: popupStore.hide.bind(popupStore),
      close: popupStore.close.bind(popupStore),
      toggle: popupStore.toggle.bind(popupStore),
      destroy: popupStore.destroy.bind(popupStore),
      bringToTop: popupStore.bringToTop.bind(popupStore),
    };
  });

  const [outerElements, innerElements] = React.useMemo(() => popupInstance.popupStore.getRenderPopup(), [updateKey]);

  React.useEffect(() => {
    if (!eventEmitter) return;

    eventEmitter.on('popen', popupInstance.open);
    eventEmitter.on('phide', popupInstance.hide);
    eventEmitter.on('pclose', popupInstance.close);
    eventEmitter.on('pdestroy', popupInstance.destroy);
    eventEmitter.on('psetprops', popupInstance.setProps);
    eventEmitter.on('pbringtotop', popupInstance.bringToTop);

    return () => {
      eventEmitter.off('popen', popupInstance.open);
      eventEmitter.off('phide', popupInstance.hide);
      eventEmitter.off('pclose', popupInstance.close);
      eventEmitter.off('pdestroy', popupInstance.destroy);
      eventEmitter.off('psetprops', popupInstance.setProps);
      eventEmitter.off('pbringtotop', popupInstance.bringToTop);
    };
  }, []);

  return (
    <PopupContext.Provider
      value={{
        enable: true,
        innerElements,
        task: popupInstance.getTask(),
        ...popupInstance,
      }}
    >
      {children}
      {outerElements}
    </PopupContext.Provider>
  );
}

export default PopupSystem;
