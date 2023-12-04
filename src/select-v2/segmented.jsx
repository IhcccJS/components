import React from 'react';
import { Segmented } from 'antd';
import useOptions from './hooks/useOptions';

function BaseSegmented(props) {
  const { options, ...restProps } = props;

  const data = useOptions(options, { initialData: [], autoRunWait: 1000 });

  return <Segmented options={data.data} {...restProps} />;
}

export default BaseSegmented;
