import React from 'react';
import { isString } from '@ihccc/utils';
import useStyles from './style';

const CssMotion = function (props) {
  const {
    className,
    enable,
    motion,
    duration,
    delay,
    easing,
    style,
    ...restProps
  } = props;
  const { styles, cx } = useStyles();
  const [ready, setReady] = React.useState(false);

  const motionName = React.useMemo(() => {
    if (isString(motion)) {
      return motion
        .split(' ')
        .map((n) => `motion-${n}`)
        .join(' ');
    }
    return '';
  }, [motion]);

  React.useEffect(() => {
    setReady(true);
  }, []);

  return (
    <div
      className={cx(styles, 'bc-motion', className, motionName, {
        'motion-ready': enable ? ready : enable,
      })}
      {...restProps}
      style={{
        ...style,
        transitionDuration: `${duration}ms`,
        transitionTimingFunction: easing,
        transitionDelay: `${delay}ms`,
      }}
    />
  );
};

CssMotion.defaultProps = {
  enable: true,
  motion: 'fade',
  easing: 'ease',
  duration: 1000,
  delay: 0,
};

export default CssMotion;
