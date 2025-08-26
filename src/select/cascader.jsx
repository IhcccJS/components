import React from 'react';
import { Cascader } from 'antd';
import useOptions from './hooks/useOptions';

function BaseCascader(props) {
  const { options, ...restProps } = props;

  const data = useOptions(options, { initialData: [] });

  return (
    <Cascader
      // loading={data.loading}
      options={data.data}
      onFocus={data.run}
      {...restProps}
    />
  );
}

export default BaseCascader;
