import React from 'react';
import Text from '../../text';

function textRender(props) {
  return (val) => <Text label={val} {...props} />;
}

export default textRender;
