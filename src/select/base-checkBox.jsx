import React from 'react';
import { Checkbox } from 'antd';
import { isFunction } from '@ihccc/utils';

function BaseCheckBox(props) {
  const { options, labelKey, valueKey, ...restProps } = props;

  const optionsNode = React.useMemo(() => {
    return options.map((item) => {
      const label = isFunction(labelKey) ? labelKey(item) : item[labelKey];
      return (
        <Checkbox
          title={label}
          value={item[valueKey] || item.key}
          disabled={item.disabled}
          key={item[valueKey] || item.key}
        >
          <span title={label} style={{ color: item.color }}>
            {item.icon} {label}
          </span>
        </Checkbox>
      );
    });
  }, [options]);

  return <Checkbox.Group {...restProps}>{optionsNode}</Checkbox.Group>;
}

BaseCheckBox.defaultProps = {
  options: [],
  labelKey: 'label',
  valueKey: 'value',
};

export default BaseCheckBox;
