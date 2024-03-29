import React from 'react';
import { isArray, isObject, isFunction } from '@ihccc/utils';
import ClickAble from '../click-able';
import useStyles from './style';

const Feature = (props) => {
  const {
    className,
    label,
    mode,
    icon,
    color,
    round,
    size,
    status,
    animation,
    disabled,
    hoverAble,
    style,
    children,
    ...restProps
  } = props;
  const { styles, cx } = useStyles();

  const clickAble = isFunction(restProps.onClick);

  const customStuts = isObject(color);

  const currentColor = React.useMemo(() => {
    if (customStuts) {
      return color[status];
    }
    return color;
  }, [status, color]);

  const isAnimation = React.useMemo(() => {
    if (isArray(animation)) {
      return animation.includes(status);
    }
    return Boolean(animation);
  }, [status, animation]);

  const cssName = cx(styles, 'bc-feature', className, {
    [`status-${status}`]: !customStuts && !!status,
    [`size-${size}`]: !!size,
    [`mode-${mode}`]: !!mode,
    animation: !disabled && isAnimation,
    disabled,
    hoverAble,
    clickAble,
    round: (mode === 'block' || mode === 'tag') && round,
  });

  return (
    <ClickAble.Div
      disabled={disabled}
      className={cssName}
      style={Object.assign({ color: currentColor }, style)}
      {...restProps}
    >
      {icon}
      <span className={cx('text', { space: !!icon })}>
        {React.isValidElement(children)
          ? React.cloneElement(children, { label })
          : label}
      </span>
    </ClickAble.Div>
  );
};

Feature.defaultProps = {
  mode: 'text',
  round: false,
  size: 'small',
  status: 'default',
  animation: false,
  disabled: false,
  hoverAble: true,
};

export default Feature;
