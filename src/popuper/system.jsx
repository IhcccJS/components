import React from 'react';
// TODO 应该改名为 PopupStore
import PopupStore from './modal-store';
// TODO 应该改名为 PopupContext
import { ModalContext as PopupContext } from './context';

function ModalSystem(props) {
  const {
    max = 10,
    container,
    eventEmitter,
    defaultType = 'popup',
    defaultModalProps,
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
      defaultModalProps,
      onOpenOverflow,
      update,
    });

    // useModaler useModal 可以获取到的属性和方法
    return {
      modalStore: popupStore,
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

  const [outerElements, innerElements] = React.useMemo(() => popupInstance.modalStore.getRenderModal(), [updateKey]);

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

export default ModalSystem;
