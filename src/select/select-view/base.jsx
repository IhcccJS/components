import React from 'react';
import View from './index';
import useOptions from '../hooks/useOptions';

function BaseView(props) {
  const { options, ...restProps } = props;

  const data = useOptions(options, { initialData: [], autoRunWait: 1000 });

  return <View options={data.data} loading={data.loading} {...restProps} />;
}

export default BaseView;
