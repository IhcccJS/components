import React from 'react';
import { Typography } from 'antd';
import template from 'lodash/template';

const { Text } = Typography;

function run(item, options) {
  const { enable } = options;

  if (!enable.copy || !item.copy) return item;

  if (!item.wrappers) item.wrappers = [];

  const { text, get } = item.copy;
  const compiled = !text ? null : template(text || '');

  item.wrappers.push(function copyableWrapper(children, value, record, index) {
    const textContent = compiled?.({ value, record, index }) || get?.call(this, value, record, index) || value;
    return (
      <div style={{ display: 'flex', gap: 8 }}>
        {children}
        <Text copyable={{ text: textContent }} />
      </div>
    );
  });

  return item;
}

/** 实现拷贝功能 */
export default { type: 'item', run };
