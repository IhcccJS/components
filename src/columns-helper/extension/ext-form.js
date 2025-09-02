import React from 'react';
import { childrenSetter, childrenPropsSetter } from '../../setter';
import UnknowElement from '../../utils/unknow-element';

function run(item, options) {
  const { enable, getNode } = options;

  // 转换 inputNode
  if (!enable.form) return item;

  if (!item.input && !item.inputNode && !getNode) item.input = 'input';
  const defaultProps = childrenPropsSetter.get(item.input);
  item.inputProps = { ...defaultProps, ...item.inputProps, ...item.inputNodeProps };
  item.input = childrenSetter.get(item.input || item.inputNode);

  if (!item.input) {
    console.warn('unknow form type:' + (item.input || item.inputNode));
    item.input = UnknowElement;
    item.inputProps = { type: item.input || item.inputNode };
  }

  if (!getNode) {
    item.input = React.createElement(item.input, item.inputProps);
  }

  return item;
}

/** 处理表单组件 */
export default { type: 'item', run };
