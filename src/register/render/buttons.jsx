import React from 'react';
import ButtonList from '../../button-list';

function buttonRender(opts) {
  const { data, ...buttonProps } = opts || {};

  return (value, record, index) => {
    return (
      <ButtonList
        inline
        access="actionButtons"
        {...buttonProps}
        data={{ ...data, value, record, index }}
      />
    );
  };
}

export default buttonRender;
