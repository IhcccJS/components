import React from 'react';
import ButtonList from '../../button-list';

function buttonRender(opts) {
  const { eventData, ...buttonProps } = opts || {};

  return (value, record, index) => {
    return <ButtonList inline access="actionButtons" {...buttonProps} eventData={{ ...eventData, value, record, index }} />;
  };
}

export default buttonRender;
