import React from 'react';
import ColumnTitle from '../../column-title';
import { isFunction } from '@ihccc/utils';

function transformAction(item, options) {
  const { isList, eventMap, eventData } = options;

  // 如果挂载了事件
  if (!isList || !item.action || item.action.icon === false) {
    return item;
  }

  let event = item.action.event;
  const newItem = { ...item, action: { ...item.action } };

  // 预处理点击事件，用于后续调用，事实上就是包了一层 function
  newItem.action.event = function actionEvent(context, params) {
    if (!isFunction(event)) event = eventMap[event];
    if (!isFunction(event)) return;
    return event.bind(context, { ...params, ...eventData });
  };

  newItem.title = (
    <ColumnTitle
      title={newItem.title}
      tooltip={newItem.action.tooltip}
      type={newItem.action.type}
      icon={newItem.action.icon}
    />
  );

  return newItem;
}

export default transformAction;
