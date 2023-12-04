import React from 'react';
import useStyles from './style';

function Roll(props) {
  const { label, width, enable, duration, style, ...restProps } = props;
  const { styles, cx } = useStyles();
  const rollTime = React.useMemo(() => {
    return `${label?.length * (duration >= 0 ? duration : 500)}ms`;
  }, [label, duration]);

  return (
    <span
      className={cx(styles, 'bc-text-roll', {
        ['bc-text-roll-enable']: !!enable,
      })}
      data-label={label}
      style={{
        ...style,
        width,
        '--roll-time': rollTime,
      }}
      {...restProps}
    />
  );
}

Roll.defaultProps = {
  label: '',
  width: 120,
  enable: true,
  duration: 500,
};

export default Roll;
