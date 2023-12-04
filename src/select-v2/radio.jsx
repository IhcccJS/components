import React from 'react';
import { Radio } from 'antd';
import useOptions from './hooks/useOptions';

const BaseRadio = React.forwardRef(function BaseRadio(props, ref) {
  const { options, ...restProps } = props;

  const data = useOptions(options, { initialData: [], autoRunWait: 1000 });

  return <Radio.Group ref={ref} options={data.data} {...restProps} />;
});

export default BaseRadio;
