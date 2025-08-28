import React from 'react';
import { isString, isFunction } from '@ihccc/utils';

function Text(props) {
  const { label, render = '-', children } = props;

  const text = React.useMemo(() => {
    const isRenderFn = isFunction(render);
    if ((!label && label !== 0) || (isString(label) && label.trim() === '') || label === 'null' || label === 'undefined') {
      return isRenderFn ? render('') : render;
    }

    return isRenderFn ? render(label) : label;
  }, [label, render]);

  if (React.isValidElement(children)) return React.cloneElement(children, { label: text });

  return text;
}

export default Text;
