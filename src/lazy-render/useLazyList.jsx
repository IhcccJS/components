import React from 'react';
import { isNumber } from '@ihccc/utils';
import LazyRender from './lazy-render';

function useLazyList(list, opts) {
  const { start, step, ...restProps } = Object.assign(
    { start: 0, step: 1 },
    opts,
  );
  const [count, setCount] = React.useState(start);

  const renderList = !isNumber(list);

  return {
    data: renderList ? list.slice(0, count) : count,
    lazyFooter: count <= (renderList ? list.length : list) && (
      <LazyRender {...restProps} onEnter={() => setCount(count + step)} />
    ),
  };
}

export default useLazyList;
