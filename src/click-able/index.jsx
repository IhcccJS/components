import React from 'react';
import { isFunction } from '@ihccc/utils';
import ClickIcon from './click-icon';
import useStyles from './style';

function ClickAble(props) {
  const {
    element,
    title,
    disabled,
    clickAble,
    iconStyle,
    iconPosition,
    onClick,
    children,
    className,
    style,
    ...restProps
  } = props;
  const { styles, cx } = useStyles();

  const [clickStyle, clickIconNode, clickEvent] = React.useMemo(() => {
    const hasEvent = clickAble || isFunction(onClick);
    if (hasEvent) {
      const clickIcon = <ClickIcon title={title} style={iconStyle} />;
      return disabled
        ? [{ cursor: 'not-allowed' }, clickIcon]
        : [{ cursor: 'pointer' }, clickIcon, onClick];
    }
    return [];
  }, [disabled, clickAble, onClick]);

  return React.createElement(
    element,
    {
      ...restProps,
      className: cx(
        styles,
        'bc-click-able',
        `position-${iconPosition}`,
        className,
      ),
      style: Object.assign({}, style, clickStyle),
      onClick: clickEvent,
    },
    children,
    clickIconNode,
  );
}

ClickAble.defaultProps = {
  element: 'span',
  disabled: false,
  clickAble: false,
  iconPosition: 'default',
};

const Div = (props) => {
  return <ClickAble {...props} element="div" />;
};
ClickAble.Div = Div;

export default ClickAble;
