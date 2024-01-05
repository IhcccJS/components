import React from 'react';
import { useUpdate, useCreation } from 'ahooks';
import { BaseListContext } from './context';
import { isFunction, eventEmitter } from '@ihccc/utils';

function StateCenter(props) {
  const { eventEmitter: ee, eventHandler, children } = props;

  const stateRef = React.useRef({});
  const _eventEmitter = useCreation(() => ee || eventEmitter(), []);

  const update = useUpdate();

  const setState = React.useCallback((namespace, initialData, state) => {
    const name = namespace || 'default';
    if (isFunction(state)) {
      stateRef.current[name] = state({
        ...initialData,
        ...stateRef.current[name],
      });
    } else {
      stateRef.current[name] = {
        ...initialData,
        ...stateRef.current[name],
        ...state,
      };
    }
    update();
  }, []);

  const createEvent = React.useCallback((namespace) => {
    // 事件名称
    const getEventName = (name) => {
      if (/.+@.+/.test(name)) return name;
      return !namespace ? name : namespace + '@' + name;
    };

    return {
      __eventEmitter: _eventEmitter,
      getEventName: getEventName,
      names: () => _eventEmitter.names(),
      on: (key, callback, context) => {
        const name = getEventName(key);
        _eventEmitter.on(name, callback, context);
      },
      once: (key, ...args) => {
        const name = getEventName(key);
        _eventEmitter.once(name, ...args);
      },
      emit: (key, ...args) => {
        const name = getEventName(key);
        _eventEmitter.emit(name, ...args);
      },
      off: (key) => {
        const name = getEventName(key);
        _eventEmitter.off(name);
      },
      offAll: () => {
        _eventEmitter.offAll();
      },
    };
  }, []);

  return (
    <BaseListContext.Provider
      value={{
        enable: true,
        state: stateRef.current,
        setState,
        createEvent,
        eventHandler,
      }}
    >
      {children}
    </BaseListContext.Provider>
  );
}

export default StateCenter;
