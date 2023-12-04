import React from 'react';
import { Radio } from 'antd';
import { isFunction } from '@ihccc/utils';

function BaseRadio(props) {
  const { options, labelKey, valueKey, optionType, ...restProps } = props;

  const RadioButton = React.useMemo(() => {
    const types = { default: Radio, button: Radio.Button };
    return types[optionType] || Radio;
  }, [optionType]);

  const optionsNode = React.useMemo(() => {
    return options.map((item) => {
      const label = isFunction(labelKey) ? labelKey(item) : item[labelKey];
      return (
        <RadioButton
          title={label}
          value={item[valueKey] || item.key}
          disabled={item.disabled}
          key={item[valueKey] || item.key}
        >
          <span title={label} style={{ color: item.color }}>
            {item.icon} {label}
          </span>
        </RadioButton>
      );
    });
  }, [options]);

  return <Radio.Group {...restProps}>{optionsNode}</Radio.Group>;
}

BaseRadio.defaultProps = {
  options: [],
  labelKey: 'label',
  valueKey: 'value',
  optionType: 'default',
};

export default BaseRadio;
