import React from 'react';
import clsx from 'clsx';
import { isArray, isObject, isFunction } from '@ihccc/utils';
// import ClickAble from '../click-able';
// import useStyles from './style';
import './style.less';

const Feature = (props) => {
  const {
    className,
    label,
    mode = 'text',
    icon,
    color,
    round,
    size = 'small',
    status = 'default',
    animation = false,
    disabled = false,
    hoverAble = true,
    style,
    children,
    ...restProps
  } = props;
  // const { styles, cx } = useStyles();

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

  const cssName = clsx('bc-feature', className, {
    [`bc-feature-mode-${mode}`]: !!mode,
    [`bc-feature-status-${status}`]: !customStuts && !!status,
    ['bc-feature-round']: (mode === 'block' || mode === 'tag') && round,
    [`bc-feature-size-${size}`]: !!size,
    ['bc-feature-animation']: !disabled && isAnimation,
    ['bc-feature-disabled']: disabled,
    ['bc-feature-hover-able']: hoverAble,
    ['bc-feature-click-able']: clickAble,
  });

  return (
    <div className={cssName} style={Object.assign({ color: currentColor }, style)} {...restProps}>
      {icon}
      <span className={clsx('bc-feature-text', { 'bc-feature-space': !!icon })}>
        {React.isValidElement(children) ? React.cloneElement(children, { label }) : label}
      </span>
    </div>
  );
};

export default Feature;
