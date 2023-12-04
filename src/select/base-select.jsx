import React from 'react';
import { Select } from 'antd';
import { isString, isArray, isFunction } from '@ihccc/utils';

const filterOption = (v, item) =>
  isString(item.title) &&
  item.title?.toLowerCase()?.indexOf(v?.toLowerCase()) > -1;

function BaseSelect(props) {
  const { options, labelKey, valueKey, ...restProps } = props;

  const getOptionsArray = React.useCallback((options = []) => {
    return options.map((item) => {
      const label = isFunction(labelKey) ? labelKey(item) : item[labelKey];
      return (
        <Select.Option
          title={label}
          value={item[valueKey] || item.key}
          disabled={item.disabled}
          key={item[valueKey] || item.key}
        >
          <span title={label} style={{ color: item.color }}>
            {item.icon} {label}
          </span>
        </Select.Option>
      );
    });
  }, []);

  const optionsNode = React.useMemo(() => {
    if (isArray(options)) return getOptionsArray(options);
    return Object.keys(options).map((group) =>
      group === '' ? (
        getOptionsArray(options[group])
      ) : (
        <Select.OptGroup label={group} key={group}>
          {getOptionsArray(options[group])}
        </Select.OptGroup>
      ),
    );
  }, [options]);

  return (
    <Select
      allowClear
      showSearch
      filterOption={filterOption}
      placeholder="请选择"
      style={{ width: '100%' }}
      {...restProps}
    >
      {optionsNode}
    </Select>
  );
}

BaseSelect.defaultProps = {
  options: [],
  labelKey: 'label',
  valueKey: 'value',
};

export default BaseSelect;
