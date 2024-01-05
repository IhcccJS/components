import React from 'react';
import {
  childrenSetter,
  childrenPropsSetter,
} from '../../../common-form/setter';

function transformFormNode(item, options) {
  const { isForm, getInputNode } = options;

  // 转换 inputNode
  if (isForm) {
    if (!item.inputNode && !getInputNode) item.inputNode = 'input';
    const defaultProps = childrenPropsSetter.get(item.inputNode);
    item.inputNodeProps = { ...defaultProps, ...item.inputNodeProps };
    item.inputNode = childrenSetter.get(item.inputNode);
    if (!getInputNode) {
      item.inputNode = React.createElement(item.inputNode, item.inputNodeProps);
    }
  }

  return item;
}

export default transformFormNode;
