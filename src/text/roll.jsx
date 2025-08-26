import React from 'react';
import clsx from 'clsx';
// import useStyles from './style';
import './style/index.less';

function Roll(props) {
  const { label, width = 120, enable = true, duration = 500, style, ...restProps } = props;
  // const { styles, cx } = useStyles();
  const rollTime = React.useMemo(() => {
    return `${(label || '').length * (duration >= 0 ? duration : 500)}ms`;
  }, [label, duration]);

  return (
    <span
      className={clsx('bc-text-roll', { ['bc-text-roll-enable']: !!enable })}
      data-label={label}
      style={{ ...style, width, '--roll-time': rollTime }}
      {...restProps}
    />
  );
}

export default Roll;
