import React from 'react';
import Text from '../../text';

const tipRender = (max) => {
  return (val) => {
    return (
      <Text label={val}>
        <Text.Tip max={max} />
      </Text>
    )
  }
};

export default tipRender;
