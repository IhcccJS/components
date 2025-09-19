import React from 'react';
import { Typography } from 'antd';
import template from 'lodash/template';
import { isString } from '@ihccc/utils';

const { Text } = Typography;

function run(item, options) {
  const { enable } = options;

  if (!enable.copy || !item.copy) return item;

  if (!item.wrappers) item.wrappers = [];

  let compiled, get;
  if (item.copy === true) {
    compiled = null;
  } else if (isString(item.copy)) {
    compiled = template(item.copy);
  } else {
    get = item.copy.get;
    const text = item.copy.text;
    compiled = !text ? null : template(text || '');
  }

  item.wrappers.push(function copyableWrapper(children, value, record, index) {
    let copyContent = value;
    if (!!compiled) {
      copyContent = compiled({ value, record, index });
    } else if (!!get) {
      copyContent = get.call(this, value, record, index);
    }
    return (
      <div style={{ display: 'flex', gap: 8 }}>
        {children}
        <Text copyable={{ text: copyContent }} />
      </div>
    );
  });

  return item;
}

/** 实现拷贝功能 */
export default { type: 'item', run };
