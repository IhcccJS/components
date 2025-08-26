import React from 'react';
import { Mentions } from 'antd';
import useOptions from './hooks/useOptions';

function BaseMentions(props) {
  const { options, ...restProps } = props;

  const data = useOptions(options, { initialData: [] });

  return <Mentions options={data.data} onFocus={data.run} {...restProps} />;
}

export default BaseMentions;
