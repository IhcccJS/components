import React from 'react';
import { childrenSetter, childrenPropsSetter } from '@/components/@setter';

function run(item, options) {
  const { enable, getNode } = options;

  // 转换 inputNode
  if (!enable.form) return item;

  if (!item.inputNode && !getNode) item.inputNode = 'input';
  const defaultProps = childrenPropsSetter.get(item.inputNode);
  item.inputNodeProps = { ...defaultProps, ...item.inputNodeProps };
  item.inputNode = childrenSetter.get(item.inputNode);
  if (!getNode) {
    item.inputNode = React.createElement(item.inputNode, item.inputNodeProps);
  }

  return item;
}

/** 处理表单组件 */
export default { type: 'item', run };
