import React from 'react';
import { ModalContext } from '../context';

function useTask({ inClose = false, inNamespace = false }) {
  const { task, toggle, bringToTop, close } = React.useContext(ModalContext);

  const list = React.useMemo(() => {
    if (!inClose && !inNamespace) return task;
    return task.filter((item) => item.namespace === '');
  }, [task, inNamespace, inClose]);

  return { list, toggle, bringToTop, close };
}

export default useTask;
