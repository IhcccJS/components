import React from 'react';
import clsx from 'clsx';
import './space.less';

const Space = ({ type }) => {
  return (
    <span
      className={clsx({
        ['bc-action-buttons-space-divider']: type === 'divider',
        ['bc-action-buttons-space-empty']: type === 'empty',
        ['bc-action-buttons-space-full']: type === 'full',
      })}
    />
  );
};

export default Space;
