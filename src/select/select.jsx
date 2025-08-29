import React from 'react';
import { Select } from 'antd';
import { isString, isNumber } from '@ihccc/utils';
import useOptions from './hooks/useOptions';

const filterOption = (v, item) => isString(item.title) && item.title?.toLowerCase()?.indexOf(v?.toLowerCase()) > -1;

const BaseSelect = React.forwardRef(function BaseSelect(props, ref) {
  const { options = [], showSearch = 5, ...restProps } = props;

  const data = useOptions(options, { initialData: [] });

  if ((showSearch === true || (isNumber(showSearch) && data.data.length > showSearch)) && !restProps.filterOption) {
    restProps.showSearch = true;
    restProps.filterOption = filterOption;
  }

  return (
    <Select
      ref={ref}
      loading={data.loading}
      options={data.data}
      onFocus={data.run}
      placeholder="请选择"
      style={{ width: '100%' }}
      {...restProps}
    />
  );
});

export default BaseSelect;
