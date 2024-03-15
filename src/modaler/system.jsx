import React from 'react';
import { useCreation } from 'ahooks';
import ModalStore from './modal-store';
import { ModalContext } from './context';

function ModalSystem(props) {
  const {
    max = 10,
    container,
    defaultType = 'modal',
    defaultModalProps,
    onOpenOverflow,
    // openPosition,
    // openOffset,
    children,
  } = props;

  const [updateKey, setUpdateKey] = React.useState();

  const update = React.useCallback(() => setUpdateKey({}), []);

  const modalStore = useCreation(
    () =>
      new ModalStore({
        max,
        container,
        defaultType,
        defaultModalProps,
        onOpenOverflow,
        update,
      }),
    [],
  );

  const [outerElements, innerElements] = React.useMemo(
    () => modalStore.getRenderModal(),
    [updateKey],
  );

  // useModaler useModal 可以获取到的属性和方法
  return (
    <ModalContext.Provider
      value={{
        enable: true,
        modalStore,
        namespace: modalStore.namespace,
        setNamespace: modalStore.setNamespace.bind(modalStore),
        elements: innerElements,
        task: modalStore.getTask(),
        register: modalStore.register.bind(modalStore),
        unregister: modalStore.unregister.bind(modalStore),
        setProps: modalStore.setProps.bind(modalStore),
        open: modalStore.open.bind(modalStore),
        hide: modalStore.hide.bind(modalStore),
        close: modalStore.close.bind(modalStore),
        toggle: modalStore.toggle.bind(modalStore),
        destroy: modalStore.destroy.bind(modalStore),
        bringToTop: modalStore.bringToTop.bind(modalStore),
      }}
    >
      {children}
      {outerElements}
    </ModalContext.Provider>
  );
}

export default ModalSystem;
