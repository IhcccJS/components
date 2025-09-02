import React from 'react';
import Text from '../../text';

const rollRender = (props) => {
  return (val) => {
    return (
      <Text label={val}>
        <Text.Roll {...props} />
      </Text>
    );
  };
};

export default rollRender;
