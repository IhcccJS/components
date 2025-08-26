import React from 'react';
import clsx from 'clsx';
import { TransitionContext } from '../context';

function TransitionPage({ className, style, ...restProps }) {
  const { animationClassNames, animationDelay, animationRef, onAnimationEnd } = React.useContext(TransitionContext);

  return (
    <div
      {...restProps}
      ref={animationRef}
      className={clsx(className, animationClassNames)}
      style={animationDelay > 0 ? { ...style, animationDelay: animationDelay + 'ms' } : style}
      onAnimationEnd={onAnimationEnd}
    />
  );
}

export default TransitionPage;
