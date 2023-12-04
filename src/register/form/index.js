// import React from 'react';
import {
  Input,
  InputNumber,
  DatePicker,
  Rate,
  Slider,
  Switch,
  TimePicker,
  Transfer,
} from 'antd';
import { isString, isObject } from '@ihccc/utils';
import { childrenSetter, childrenPropsSetter } from '../../common-form/setter';
import {
  AutoComplete,
  Cascader,
  Checkbox,
  Mentions,
  Radio,
  Segmented,
  Select,
  SelectView,
  TreeSelect,
} from '../../select-v2';
import Upload from '../../upload';
import getAliasName from '../getAliasName';

function register(inputComponents, inputDefaultProps) {
  const componentAlias = inputComponents || {};

  // input
  childrenSetter.use(getAliasName(componentAlias, 'input'), Input);

  // input-number
  childrenSetter.use(getAliasName(componentAlias, 'number'), InputNumber);

  // password
  childrenSetter.use(getAliasName(componentAlias, 'password'), Input.Password);

  // textarea
  childrenSetter.use(getAliasName(componentAlias, 'textarea'), Input.TextArea);

  // date-picker
  childrenSetter.use(getAliasName(componentAlias, 'date'), DatePicker);

  // range-picker
  childrenSetter.use(
    getAliasName(componentAlias, 'range'),
    DatePicker.RangePicker,
  );

  // Rate
  childrenSetter.use(getAliasName(componentAlias, 'rate'), Rate);

  // slider
  childrenSetter.use(getAliasName(componentAlias, 'slider'), Slider);

  // switch
  childrenSetter.use(getAliasName(componentAlias, 'switch'), Switch);

  // time-picker
  childrenSetter.use(getAliasName(componentAlias, 'time'), TimePicker);

  // transfer
  childrenSetter.use(getAliasName(componentAlias, 'transfer'), Transfer);

  // mentions
  childrenSetter.use(getAliasName(componentAlias, 'mentions'), Mentions);

  // auto-complete
  childrenSetter.use(
    getAliasName(componentAlias, 'autoComplete'),
    AutoComplete,
  );

  // cascader
  childrenSetter.use(getAliasName(componentAlias, 'cascader'), Cascader);

  // checkbox
  childrenSetter.use(getAliasName(componentAlias, 'checkbox'), Checkbox);

  // radio
  childrenSetter.use(getAliasName(componentAlias, 'radio'), Radio);

  // segmented
  childrenSetter.use(getAliasName(componentAlias, 'segmented'), Segmented);

  // select
  childrenSetter.use(getAliasName(componentAlias, 'select'), Select);

  // select-view
  childrenSetter.use(getAliasName(componentAlias, 'selectView'), SelectView);

  // tree-select
  childrenSetter.use(getAliasName(componentAlias, 'treeSelect'), TreeSelect);

  // upload
  childrenSetter.use(getAliasName(componentAlias, 'upload'), Upload);

  for (let key in componentAlias) {
    if (!isString(componentAlias[key])) {
      childrenSetter.use(key, componentAlias[key]);
    }
  }

  for (let key in inputDefaultProps) {
    if (isObject(inputDefaultProps[key])) {
      childrenPropsSetter.use(key, inputDefaultProps[key]);
    }
  }
}

export default register;
