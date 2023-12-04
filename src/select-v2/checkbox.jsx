import React from 'react';
import { Checkbox } from 'antd';
import useOptions from './hooks/useOptions';

function BaseCheckbox(props) {
  const { options, ...restProps } = props;

  const data = useOptions(options, { initialData: [], autoRunWait: 1000 });

  return <Checkbox.Group options={data.data} {...restProps} />;
}

export default BaseCheckbox;
