import React from 'react';
import { useCreation } from 'ahooks';
import { BaseListContext } from '../context';
import { eventEmitter } from '@ihccc/utils';

function useEvent(namespace) {
  const { enable, createEvent, eventHandler } =
    React.useContext(BaseListContext);

  if (enable) {
    const ee = useCreation(() => createEvent(namespace), []);
    return { eventEmitter: ee, eventHandler };
  }

  const ee = useCreation(() => eventEmitter(), []);
  return { eventEmitter: ee, eventHandler };
}

export default useEvent;
