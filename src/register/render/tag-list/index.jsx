import React from 'react';
import { isString, isArray } from '@ihccc/utils';
import TagList from './tag-list';

const defaultConfig = {
  separator: ',',
  max: 3,
  empty: '-',
};

function tagListRender(config) {
  const { separator, format, empty, max, options, popover } = Object.assign(defaultConfig, config);

  return function render(val) {
    const list = (format && format(val)) || (isString(val) && val.split(separator)) || val;

    if (isArray(list) === false || list.length === 0) return empty;

    return <TagList data={list} max={max} options={options} popover={popover} />;
  };
}

export default tagListRender;
