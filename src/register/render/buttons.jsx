import React from 'react';
import ButtonList from '../../button-list';

function buttonRender(opts) {
  const { data, ...buttonProps } = opts || {};
  return (...args) => {
    return (
      <ButtonList
        inline
        access="actionButtons"
        {...buttonProps}
        data={args[1]}
      />
    );
  };
}

export default buttonRender;
