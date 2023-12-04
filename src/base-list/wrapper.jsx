import React from 'react';
import useStyles from './style/wrapper';

function Wrapper(props) {
  const { className, style, children } = props;
  const { styles, cx } = useStyles();

  return (
    <div
      className={cx(styles, 'bc-base-list-wrapper', className)}
      style={style}
    >
      {children}
    </div>
  );
}

export default Wrapper;
