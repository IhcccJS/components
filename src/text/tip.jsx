import React from 'react';
import { Tooltip } from 'antd';
import { isString } from '@ihccc/utils';

function Tip(props) {
  const { label, max = 10, ...restProps } = props;

  if (isString(label) && label.length > max) {
    return (
      <Tooltip title={label} {...restProps}>
        {label.substr(0, max) + '...'}
      </Tooltip>
    );
  }

  return label || null;
}

export default Tip;
