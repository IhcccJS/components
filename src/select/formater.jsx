import React from 'react';
import { isObject, isArray, isFunction } from '@ihccc/utils';
import useOptions from './hooks/useOptions';
import Feature from '../feature';
import Text from '../text';

let MAP_CACHE = {};

function Formater({ value = '', labelKey = 'label', render, color, options = [], style, children, ...restProps }) {
  const { data } = useOptions(options, { initialData: [] });

  const optionMap = React.useMemo(() => {
    if (!!MAP_CACHE[options]) return MAP_CACHE[options];
    const optionMapping = data.reduce((s, i) => ((s[i.value] = i), s), {});
    if (isArray(options) || Object.keys(optionMapping).length === 0) return optionMapping;
    if (Object.keys(MAP_CACHE).length > 2) {
      MAP_CACHE = {};
    } else {
      MAP_CACHE[options] = optionMapping;
    }
    return optionMapping;
  }, [data]);

  const result = React.useMemo(() => {
    let formated = optionMap[value];
    if (isFunction(render)) return render(Object.assign({}, formated), value) || {};
    return formated || {};
  }, [value, render, optionMap]);

  const currentColor = React.useMemo(() => {
    if (isObject(color)) return color[value];
    return color || result.color;
  }, [color, result.color, value]);

  if (React.isValidElement(children)) {
    const { color: childColor, animation } = children.props;
    return React.cloneElement(children, {
      ...result,
      color: childColor || currentColor,
      animation: animation || result.animation,
    });
  }

  if (result.hasOwnProperty('mode') || !!restProps.mode) {
    return React.createElement(Feature, Object.assign({}, result, restProps));
  }

  return result ? (
    <span className={result.className} style={{ color: currentColor, ...style }} {...restProps}>
      {result.icon} {result[labelKey]}
    </span>
  ) : (
    <Text label={value} />
  );
}

export default Formater;
