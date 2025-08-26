import React from 'react';
import { TreeSelect } from 'antd';
import useOptions from './hooks/useOptions';

function BaseTreeSelect(props) {
  const { options, ...restProps } = props;

  const data = useOptions(options, { initialData: [] });

  return (
    <TreeSelect
      // loading={data.loading}
      treeData={data.data}
      onFocus={data.run}
      {...restProps}
    />
  );
}

export default BaseTreeSelect;
