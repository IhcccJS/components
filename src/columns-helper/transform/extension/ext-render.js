import { isString, isArray, isObject } from '@ihccc/utils';
import { renderSetter } from '../../../base-list/setter';

const getRender = renderSetter.get.bind(renderSetter);

const isSetterKey = (item) => {
  return isString(item) || isArray(item) || isObject(item);
};

function transformRender(item, options) {
  const { isList, isProfile, eventData } = options;

  // 转换 render
  if ((isList || isProfile) && isSetterKey(item.render)) {
    item.render = getRender(item.render);
  }

  // 转换 profileRender
  if (isProfile && isSetterKey(item.profileRender)) {
    item.profileRender = getRender(item.profileRender);
  }

  // 修改渲染方法的 this 指向
  if ((isList || isProfile) && item.render) {
    item.render = item.render.bind({ ...item, get: getRender });
  }

  if (isProfile && item.profileRender) {
    item.profileRender = item.profileRender.bind({ ...item, get: getRender });
  }

  return item;
}

export default transformRender;
