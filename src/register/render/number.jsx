import React from 'react';
import Text from '../../text';

const NumberRender = function (opts) {
  const { count, ...restProps } = opts || {};
  return function (val) {
    return (
      <Text label={!count ? val : count.apply(null, arguments)}>
        <Text.Number {...restProps} />
      </Text>
    );
  };
};

export default NumberRender;
