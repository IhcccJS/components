import React from 'react';
import unionBy from 'lodash/unionBy';
import { useSetState } from 'ahooks';
import { isString, isObject, isFunction, isUndefined } from '@ihccc/utils';

// 默认页面
const _defaultPage = { pageNumber: 1, pageSize: 10 };

// 默认的请求接口前参数处理
const _defaultParamsFilter = {
  remove: ({ id }) => ({ id }),
};

// 默认的请求接口是否成功的依据
const _defaultValidator = (result) => result?.code === '0';

// 默认的请求接口反馈提示信息
const _defaultMessage = (pass) => (pass ? false : '请求失败！');

const _defaultAction = [
  {
    type: 'query',
    params: 'params',
    message: (pass) => (pass ? false : '查询失败'),
    save: (res) => res?.data,
  },
  {
    type: 'create',
    params: 'formData',
    message: (pass) => '新增' + (pass ? '成功' : '失败'),
    refresh: true,
  },
  {
    type: 'update',
    params: 'formData',
    message: (pass) => '更新' + (pass ? '成功' : '失败'),
    refresh: true,
  },
  {
    type: 'remove',
    params: 'arguments',
    message: (pass) => '删除' + (pass ? '成功' : '失败'),
    refresh: true,
  },
];

/**
 * 执行对象中的方法
 * @param {object|function} object 包含一组函数的对象，或者是函数
 * @param {string} name object中对应的名称
 * @param {any} defaultResult 如果是方法就执行，否则直接返回该值
 * @param {array} args 参数数组
 * @returns
 */
const objectCall = function (object, name, defaultResult, args) {
  if (isFunction(object)) {
    return object.apply(null, args);
  } else if (isObject(object) && isFunction(object[name])) {
    return object[name].apply(null, args);
  } else if (isFunction(defaultResult)) {
    return defaultResult.apply(null, args);
  }
  return defaultResult;
};

function useList({
  services = {},
  defaultPage,
  defaultParams: userDefaultParams,
  paramsFilter,
  validator,
  onComplete,
  onMessage,
  defineAction,
}) {
  const [params, setParams] = React.useState({});
  const [formData, setFormData] = React.useState({});
  const [loading, setLoading] = useSetState({});
  const [defaultParams, setDefaultParams] = useSetState(userDefaultParams);
  const [data, setData] = useSetState({
    page: Object.assign({}, _defaultPage, defaultPage),
    list: [],
    total: 0,
  });
  const actionMap = React.useRef({});

  const defaultParamsFilter = React.useMemo(
    () =>
      isFunction(paramsFilter)
        ? paramsFilter
        : Object.assign({}, _defaultParamsFilter, paramsFilter),
    [],
  );

  const defaultAction = React.useMemo(
    () => unionBy(_defaultAction, defineAction),
    [],
  );

  defaultAction.forEach((func) => {
    if (isFunction(services[func.type]) === false) return;

    actionMap.current[func.type] = async (payload) => {
      let newParams, result;
      if (func.params === 'params') {
        if (isUndefined(payload)) {
          newParams = { ...data.page, ...defaultParams, ...params };
        } else {
          newParams = { ...data.page, ...defaultParams, ...params, ...payload };
          setParams(newParams);
        }
      } else if (func.params === 'formData') {
        if (isUndefined(payload)) {
          newParams = { ...formData };
        } else {
          newParams = { ...formData, ...payload };
          setFormData(newParams);
        }
      } else {
        newParams = { ...payload };
      }

      setLoading({ [func.type]: true });

      const transformedParams = await objectCall(
        defaultParamsFilter,
        func.type,
        newParams,
        [{ ...newParams }],
      );

      if (transformedParams === false) {
        setLoading({ [func.type]: false });
        return;
      }

      try {
        result = await services[func.type](transformedParams);
      } catch (e) {
        console.error(e);
        result = {};
      }
      setLoading({ [func.type]: false });

      const pass = objectCall(validator, func.type, _defaultValidator, [
        result,
      ]);

      if (pass && func.refresh === true) objectCall(actionMap.current, 'query');

      if (pass && isFunction(func.save)) {
        const { pageNumber, pageSize } = transformedParams;
        const formated = func.save(result);
        setData({
          page: {
            pageNumber: formated.pageNumber || pageNumber,
            pageSize: formated.pageSize || pageSize,
          },
          list: formated.list,
          total: formated.total,
        });
      }

      // 提示信息
      const tips = objectCall(func, 'message', _defaultMessage, [
        pass,
        result,
        newParams,
      ]);

      if (tips !== false && onMessage)
        onMessage(tips, pass ? 'success' : 'error');

      const actionName = objectCall(onComplete, func.type, null, [
        pass,
        result,
        newParams,
      ]);

      if (isString(actionName)) await objectCall(actionMap, actionName);
    };
  });

  return {
    state: {
      loading,
      setLoading,
      defaultParams,
      setDefaultParams,
      params,
      setParams,
      formData,
      setFormData,
      data,
      setData,
    },
    action: actionMap.current,
  };
}

export default useList;
