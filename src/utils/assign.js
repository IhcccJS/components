import { isObject } from '@ihccc/utils';

function assign(source, target) {
  if (!target) return source;

  const result = { ...source };
  for (const key in target) {
    if (isObject(target[key]) && isObject(source[key])) {
      result[key] = assign(source[key], target[key]);
    } else {
      result[key] = target[key];
    }
  }

  return result;
}

export default assign;
