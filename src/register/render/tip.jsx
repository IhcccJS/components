import React from 'react';
import Text from '../../text';

const tipRender = (props) => {
  return (val) => {
    return (
      <Text label={val}>
        <Text.Tip {...props} />
      </Text>
    );
  };
};

export default tipRender;
