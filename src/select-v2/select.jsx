import React from 'react';
import { Select } from 'antd';
import { isString } from '@ihccc/utils';
import useOptions from './hooks/useOptions';

const filterOption = (v, item) =>
  isString(item.title) &&
  item.title?.toLowerCase()?.indexOf(v?.toLowerCase()) > -1;

const BaseSelect = React.forwardRef(function BaseSelect(props, ref) {
  const { options, ...restProps } = props;

  const data = useOptions(options, { initialData: [] });

  if (restProps.showSearch && !restProps.filterOption) {
    restProps.filterOption = filterOption;
  }

  return (
    <Select
      ref={ref}
      allowClear
      loading={data.loading}
      options={data.data}
      onFocus={data.run}
      placeholder="请选择"
      style={{ width: '100%' }}
      {...restProps}
    />
  );
});

BaseSelect.defaultProps = {
  options: [],
  showSearch: true,
};

export default BaseSelect;
