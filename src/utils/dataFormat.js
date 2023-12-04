import pick from 'lodash/pick';
import omit from 'lodash/omit';
import { isString, isObject, isFunction } from '@ihccc/utils';

function dataFormat(transforms) {
  if (isObject(transforms) === false) {
    throw new Error('arguments is not object!');
  }

  return function (changeValues) {
    if (isObject(changeValues) === false) {
      throw new Error('arguments is not object!');
    }

    return async function (formValues) {
      if (isObject(formValues) === false) {
        throw new Error('arguments is not object!');
      }

      let values = Object.assign({}, formValues);

      let changeItem, isSignleKey, formatFn, fValue, fResult;

      for (let key in changeValues) {
        // 转换配置
        changeItem = Object.assign(
          {
            remove: true,
          },
          isString(changeValues[key])
            ? { type: changeValues[key] }
            : changeValues[key],
        );
        // 是否是多值
        isSignleKey = key.match(',') === null;
        // 格式化方法
        formatFn = transforms[changeItem.type];

        if (isFunction(formatFn) === false) {
          console.error(
            `dataFormat has not configured function of ${changeItem.type}!`,
          );
          continue;
        }

        if (isSignleKey) {
          // 处理单个值
          fValue = formValues[key];
          fResult = await formatFn(fValue, formValues, changeItem.params);
          if (isObject(fResult)) {
            values = Object.assign(values, fResult);
            if (changeItem.remove) delete values[key];
          } else {
            values[changeItem.rename || key] = fResult;
            if (changeItem.rename && changeItem.remove) delete values[key];
          }
        } else {
          // 处理多值
          const fKey = key.replace(/\s+/g, '').split(',');
          fValue = pick(formValues, fKey);
          fResult = await formatFn(fValue, formValues, changeItem.params);
          if (isObject(fResult)) {
            values = Object.assign(values, fResult);
            if (changeItem.remove) values = omit(values, fKey);
          } else {
            values[changeItem.rename || fKey[0]] = fResult;
            if (changeItem.rename && changeItem.remove) {
              values = omit(values, fKey);
            }
          }
        }
      }

      return values;
    };
  };
}

export default dataFormat;
