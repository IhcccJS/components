import React from 'react';
import Item from './item';
import { isString, isArray } from '@ihccc/utils';

const margeNodes = (list, children, opts = {}) => {
  const { except, itemProps, allowRules = true } = opts;
  const nodeMap = {};
  const sortList = [];

  if (isArray(list)) {
    list.forEach((col) => {
      const name = col.name || col.dataIndex;
      const key = col.key || name;
      const isExcept = isArray(except) && except.includes(key);
      if (isString(key) && !isExcept) {
        nodeMap[key] = React.createElement(Item, {
          ...itemProps,
          ...col.itemProps,
          ...(allowRules ? {} : { rules: undefined }),
          label: col.title,
          inputNode: col.inputNode,
          inputNodeProps: col.inputNodeProps,
          name,
          key,
        });
        sortList.push(key);
      }
    });
  }

  React.Children.map(children, (child) => {
    const key = child.key || child.props.name;
    if (!nodeMap[key]) sortList.push(key);
    nodeMap[key] = React.cloneElement(child, {
      ...itemProps,
      ...child.props,
      key,
    });
  });

  return sortList.map((key) => nodeMap[key]);
};

export default margeNodes;
