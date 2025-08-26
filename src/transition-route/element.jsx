import React from 'react';
import clsx from 'clsx';
import { TransitionContext } from './context';

function TransitionElement({
  intoClassNames,
  outClassNames,
  ease = 'linear',
  duration = 1000,
  delay = 0,
  className,
  style,
  ...restProps
}) {
  const { changeType, setElementTransitionTime } = React.useContext(TransitionContext);

  React.useEffect(() => {
    return setElementTransitionTime((duration || 0) + (delay || 0));
  }, [duration, delay]);

  return (
    <div
      {...restProps}
      className={clsx(className, { into: intoClassNames, out: outClassNames }[changeType])}
      style={{
        ...style,
        transitionTimingFunction: ease,
        transitionDuration: duration + 'ms',
        transitionDelay: delay + 'ms',
      }}
    />
  );
}

export default TransitionElement;
