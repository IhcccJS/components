// 根据 columns 中配置的 colSpan 自动计算 labelCol 和 wrapperCol 的值
// import React from 'react';
import definePlugin from '../../create-component/definePlugin';

const transformExtension = (item, options) => {
  const { column, labelCol = { span: 6 }, wrapperCol = { span: 12 } } = options;

  if (column > 1) {
    const colSpan = item.colSpan || 1;

    if ((labelCol || wrapperCol) && !item.itemProps) item.itemProps = {};

    if (labelCol && !item.itemProps.labelCol) {
      const labelColSpan = labelCol.span;
      item.itemProps.labelCol = { span: (labelColSpan / (24 * colSpan)) * 24 };
    }

    if (wrapperCol && !item.itemProps.wrapperCol) {
      const wrapperColSpan =
        wrapperCol.span * colSpan + labelCol.span * (colSpan - 1) + (24 - labelCol.span - wrapperCol.span) * (colSpan - 1);
      item.itemProps.wrapperCol = {
        span: Math.min((wrapperColSpan / (24 * colSpan)) * 24, 24 - item.itemProps.labelCol.span),
      };
      if (!item.title) {
        item.itemProps.wrapperCol.push = item.itemProps.labelCol.span;
      }
    }
  }

  return item;
};

const AutoAlignment = definePlugin({
  name: 'AutoAlignment',
  priority: 'TOOL',
  before() {
    return { transformExtension };
  },
});

export default AutoAlignment;
