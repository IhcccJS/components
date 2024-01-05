import { isString, isArray, isObject } from '@ihccc/utils';
import { columnSetter } from '../../setter';

const isSetterKey = (item) => {
  return isString(item) || isArray(item) || isObject(item);
};

function extendColumn(config) {
  if (isSetterKey(config.extend)) {
    const defaultColumn = extendColumn({
      ...(columnSetter.get(config.extend) || {}),
    });
    config = { ...defaultColumn, ...config };
  }
  return config;
}

function transformExtend(item) {
  // 继承默认配置
  return extendColumn({ ...item });
}

export default transformExtend;
