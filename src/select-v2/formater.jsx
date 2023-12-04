import React from 'react';
import { isObject, isArray, isFunction } from '@ihccc/utils';
import useOptions from './hooks/useOptions';
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
  const { data } = useOptions(options, { initialData: [] });

  const result = React.useMemo(() => {
    let formated = isArray(data)
      ? data.find((item) => item.value == value)
      : data[value];

    if (isFunction(render)) {
      return render(Object.assign({}, formated), value);
    }
    return formated;
  }, [value, render, data]);

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
