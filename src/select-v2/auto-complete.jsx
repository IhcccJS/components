import React from 'react';
import { AutoComplete } from 'antd';
import useOptions from './hooks/useOptions';

function BaseAutoComplete(props) {
  const { options, ...restProps } = props;

  const data = useOptions(options, { initialData: [] });

  return <AutoComplete options={data.data} onFocus={data.run} {...restProps} />;
}

export default BaseAutoComplete;
