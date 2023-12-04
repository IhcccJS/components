import React from 'react';
import { isFunction } from '@ihccc/utils';

/**
 * 根据限定条件拷贝子元素
 * @param {ReactNode} children
 * @param {object} props
 * @param {function} filter
 * @returns
 */
const cloneSomeChildren = (children, props, filter) => {
  function cloneChild(child) {
    if (isFunction(filter) && filter(child) && React.isValidElement(child)) {
      return React.cloneElement(child, props);
    }
    return child;
  }

  if (React.Children.count(children) > 1) {
    return React.Children.map(children, cloneChild);
  }
  return cloneChild(children);
};

export default cloneSomeChildren;
