import React from 'react';
import { isString, isArray, isObject, isFunction } from '@ihccc/utils';
import { renderSetter } from '../../setter';
import UnknowElement from '../../utils/unknow-element';

const getRender = renderSetter.get.bind(renderSetter);

const unknowRender = (type) => React.createElement(UnknowElement, { type });

const isSetterKey = (item) => {
  return isString(item) || isArray(item) || isObject(item);
};

function run(item, options) {
  const { enable, eventData, eventMap } = options;

  if (!enable.render) return item;

  // 转换 render
  if (isString(item.renderType)) {
    item.render = getRender([item.renderType].concat(item.renderProps));
    if (!item.render) item.render = () => unknowRender(item.renderType);
  } else if (isSetterKey(item.render)) {
    item.render = getRender(item.render);
    if (!item.render) item.render = () => unknowRender(JSON.stringify(item.render));
  }

  // 修改渲染方法的 this 指向
  if (!!item.render) {
    const oldRender = item.render;

    item.render = function () {
      const events = {};
      const context = { column: { ...item, event: events }, data: eventData, get: getRender };

      for (const key in item.event) {
        if (key === 'element' || key === 'tip') continue;
        const event = item.event.click;
        if (isString(event) && isFunction(eventMap[event])) {
          // 把 item.event 事件全部绑定参数
          // FIXME 这里绑定的参数和其他方法可能不一致，导致一些问题
          events[key] = eventMap[event].bind(context, ...arguments, event);
        }
      }

      let content = oldRender.call(context, ...arguments);

      if (!!events.click) {
        const onClick = (e) => {
          e.stopPropagation();
          events.click.call(null, e);
        };
        content = React.createElement(item.event.element || 'a', { onClick }, content);
      }

      if (!item.wrappers) return content;

      return item.wrappers.reduce((content, wrapper) => {
        return wrapper.call(context, content, ...arguments);
      }, content);
    };
  }

  return item;
}

/** 实现调用渲染方法 */
export default { type: 'item', run };
