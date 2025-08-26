// import React from 'react';
// import ColumnTitle from '../column-title';
import { isString, isFunction } from '@wowon/utils';

function run(item, options) {
  const { enable, eventMap } = options;

  if (!enable.event || !item.event) return item;

  // 预处理点击事件，用于后续调用，事实上就是包了一层 function
  const events = item.event;

  for (const key in events) {
    if (key === 'tip') continue;
    const event = events[key];
    if (isString(event) && isFunction(eventMap[event])) events[key] = eventMap[event];
  }

  const newItem = { ...item, event: events };

  // newItem.title = React.createElement(ColumnTitle, {
  //   title: item.title,
  //   tooltip: item.event.tip,
  //   events,
  // });

  return newItem;
}

/** 实现事件绑定 */
export default { type: 'item', run };
