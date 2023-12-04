import React from 'react';
import { isString, isArray, isObject, isFunction } from '@ihccc/utils';
import { renderSetter } from '../base-list/setter';
import { childrenSetter, childrenPropsSetter } from '../common-form/setter';
import { columnSetter } from './setter';
import filterOfVisible from './filterOfVisible';

const columnWidth = {
  min: 50,
  xs: 60,
  sm: 80,
  md: 120,
  lg: 180,
  xl: 260,
  xxl: 360,
  max: 480,
  e4: '4em',
  e8: '8em',
  e12: '12em',
  e16: '16em',
  e20: '20em',
  e24: '24em',
  e28: '28em',
  e32: '32em',
};

const getListOrderNumber = (page = {}, n = 0) => {
  const { pageNumber = 1, pageSize = 10 } = page;
  return pageSize * (pageNumber - 1) + n + 1;
};

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

function transform(columnsSource, opts) {
  if (isObject(opts) === false) return columnsSource || [];

  let columns;

  if (isFunction(columnsSource)) {
    columns = columnsSource.apply(null, opts.putData);
  }

  if (isArray(columnsSource) === false) return [];

  columns = [...columnsSource];

  const { name, showIndex, isList, isProfile, isForm, getInputNode, actions } =
    opts;

  if (isList && !!showIndex) {
    columns.unshift({
      extend: 'indexNumber',
      render: [
        'number',
        {
          count: (_, __, n) => getListOrderNumber(showIndex, n),
          style: { fontSize: 16, fontFamily: 'inherit' },
        },
      ],
    });
  }

  if (isList && isObject(actions)) {
    const { buttonConfig, ...rest } = actions;
    columns.push({
      title: '操作',
      key: 'actions',
      render: ['buttons', buttonConfig],
      ...rest,
    });
  }

  const newColumns = (
    isString(name) ? columns.filter(filterOfVisible(name)) : columns
  ).map((column) => {
    // 继承默认配置
    let item = extendColumn({ ...column });

    // 转换预设 width
    if (isList && columnWidth.hasOwnProperty(item.width)) {
      item.width = columnWidth[item.width];
    }

    // 转换 render
    if ((isList || isProfile) && isSetterKey(item.render)) {
      item.render = renderSetter.get(item.render);
    }

    // 转换 profileRender
    if (isProfile && isSetterKey(item.profileRender)) {
      item.profileRender = renderSetter.get(item.profileRender);
    }

    // 转换 inputNode
    if (isForm) {
      if (!item.inputNode && !getInputNode) item.inputNode = 'input';
      const defaultProps = childrenPropsSetter.get(item.inputNode);
      item.inputNodeProps = { ...defaultProps, ...item.inputNodeProps };
      item.inputNode = childrenSetter.get(item.inputNode);
      if (!getInputNode) {
        item.inputNode = React.createElement(
          item.inputNode,
          item.inputNodeProps,
        );
      }
    }

    return item;
  });

  return newColumns;
}

export default transform;
