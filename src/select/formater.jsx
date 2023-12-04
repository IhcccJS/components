import React from 'react';
import { isObject, isArray, isFunction } from '@ihccc/utils';
import Feature from '../feature';
import Text from '../text';

function Formater({
  value,
  labelKey,
  render,
  color,
  options,
  style,
  children,
  ...restProps
}) {
  const result = React.useMemo(() => {
    let formated = isArray(options)
      ? options.find((item) => item.value == value)
      : options[value];

    if (isFunction(render)) {
      return render(Object.assign({}, formated), value);
    }
    return formated;
  }, [value, render, options]);

  const currentColor = React.useMemo(() => {
    if (isObject(color)) return color[value];
    return color || result?.color;
  }, [color, result?.color, value]);

  if (React.isValidElement(children)) {
    const { color: childColor, animation } = children.props;
    return React.cloneElement(children, {
      ...result,
      color: childColor || currentColor,
      animation: animation || result?.animation,
    });
  }

  if (result?.hasOwnProperty('mode')) {
    return React.createElement(Feature, Object.assign({}, result, restProps));
  }

  return result ? (
    <span
      className={result.className}
      style={{ color: currentColor, ...style }}
      {...restProps}
    >
      {result.icon} {result[labelKey]}
    </span>
  ) : (
    <Text label={value} />
  );
}

Formater.defaultProps = {
  value: '',
  labelKey: 'label',
  options: [],
};

export default Formater;
