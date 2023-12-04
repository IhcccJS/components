import React from 'react';
import useStyles from './style';

const Space = ({ type }) => {
  const { styles, cx } = useStyles();
  return (
    <span
      className={cx(styles, {
        'bc-action-buttons-space-divider': type === 'divider',
        'bc-action-buttons-space-empty': type === 'empty',
        'bc-action-buttons-space-full': type === 'full',
      })}
    />
  );
};

export default Space;
