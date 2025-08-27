import { isFunction, isString, isArray } from '@ihccc/utils';

const filterOfVisible = (type) => (item) => {
  if (isFunction(item.visible)) return item.visible(type);
  if (isArray(item.visible)) return item.visible.includes(type);
  if (isString(item.visible)) return item.visible === type;
  return true;
};

export default filterOfVisible;
