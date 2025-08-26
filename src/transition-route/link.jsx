import React from 'react';
import { TransitionContext } from './context';

/** 路由跳转组件 */
function Link({ to, replace, children, className, style }) {
  const { navigation } = React.useContext(TransitionContext);

  const onClick = React.useCallback(
    (e) => {
      e.preventDefault();
      navigation(replace ? 'replace' : 'push', to);
    },
    [to],
  );

  return (
    <a href={to} onClick={onClick} className={className} style={style}>
      {children}
    </a>
  );
}

export default Link;
