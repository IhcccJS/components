import React from 'react';
import { AutoComplete, Segmented } from 'antd';
import { isString, isArray, isObject } from '@ihccc/utils';
import BaseSelect from './base-select';
import BaseFormater from './formater';
import BaseRadio from './base-radio';
import BaseCheckBox from './base-checkBox';

function register(variable = {}) {
  if (isObject(variable) === false) {
    throw new Error('register argument must be a object!');
  }

  const getOptions = (options) => {
    if (isString(options)) {
      return variable[options] || [];
    } else if (isObject(options) || isArray(options)) {
      return options;
    }
    return [];
  };

  function Select(props) {
    const { options, ...restProps } = props;

    const optionGroup = React.useMemo(() => getOptions(options), [options]);

    return <BaseSelect options={optionGroup} {...restProps} />;
  }

  function Input(props) {
    const { options, ...restProps } = props;

    const optionGroup = React.useMemo(() => getOptions(options), [options]);

    return (
      <AutoComplete
        options={optionGroup}
        style={{ width: '100%' }}
        {...restProps}
      />
    );
  }

  function Formater(props) {
    const { options, ...restProps } = props;

    const optionGroup = React.useMemo(() => getOptions(options), [options]);

    return <BaseFormater options={optionGroup} {...restProps} />;
  }

  function Radio(props) {
    const { options, ...restProps } = props;

    const optionGroup = React.useMemo(() => getOptions(options), [options]);

    return <BaseRadio options={optionGroup} {...restProps} />;
  }

  function CheckBox(props) {
    const { options, ...restProps } = props;

    const optionGroup = React.useMemo(() => getOptions(options), [options]);

    return <BaseCheckBox options={optionGroup} {...restProps} />;
  }

  function Segmented2(props) {
    const { options, ...restProps } = props;

    const optionGroup = React.useMemo(() => getOptions(options), [options]);

    return <Segmented options={optionGroup} {...restProps} />;
  }

  return { Select, Input, Formater, Radio, CheckBox, Segmented: Segmented2 };
}

BaseSelect.register = register;
BaseSelect.Formater = BaseFormater;
BaseSelect.Radio = BaseRadio;
BaseSelect.CheckBox = BaseCheckBox;

export default BaseSelect;
