import React from 'react';
import { PopupContext } from '../context';

function useTask({ inClose = false, inNamespace = false }) {
  const { task, toggle, bringToTop, close } = React.useContext(PopupContext);

  const list = React.useMemo(() => {
    if (!inClose && !inNamespace) return task;
    return task.filter((item) => item.namespace === '');
  }, [task, inNamespace, inClose]);

  return { list, toggle, bringToTop, close };
}

export default useTask;
