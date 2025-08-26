import React from 'react';
import clsx from 'clsx';
import { TransitionContext } from '../context';

function TransitionPage({ className, style, ...restProps }) {
  const {
    transitionClassNames,
    // transitionDelay,
    transitionRef,
    onTransitionEnd,
  } = React.useContext(TransitionContext);

  return (
    <div
      {...restProps}
      ref={transitionRef}
      className={clsx(className, transitionClassNames)}
      // style={transitionDelay > 0 ? { ...style, transitionDelay: transitionDelay + 'ms' } : style}
      onTransitionEnd={onTransitionEnd}
    />
  );
}

export default TransitionPage;
