import React from 'react';
import { isString, isObject } from '@ihccc/utils';
import { childrenSetter, childrenPropsSetter } from '../../setter';
import getAliasName from '../getAliasName';

function register(formComponents, inputDefaultProps) {
  const componentAlias = formComponents || {};

  // input
  childrenSetter.use(
    getAliasName(componentAlias, 'input'),
    React.lazy(() => import('antd/es/input/Input')),
  );

  // input-number
  childrenSetter.use(
    getAliasName(componentAlias, 'number'),
    React.lazy(() => import('antd/es/input-number')),
  );

  // password
  childrenSetter.use(
    getAliasName(componentAlias, 'password'),
    React.lazy(() => import('antd/es/input/Password')),
  );

  // textarea
  childrenSetter.use(
    getAliasName(componentAlias, 'textarea'),
    React.lazy(() => import('antd/es/input/TextArea')),
  );

  // date-picker
  childrenSetter.use(
    getAliasName(componentAlias, 'date'),
    React.lazy(() => import('antd/es/date-picker')),
  );

  // range-picker
  childrenSetter.use(
    getAliasName(componentAlias, 'range'),
    React.lazy(() =>
      import('antd/es/date-picker/').then((module) => ({
        default: module.RangePicker,
      })),
    ),
  );

  // Rate
  childrenSetter.use(
    getAliasName(componentAlias, 'rate'),
    React.lazy(() => import('antd/es/rate')),
  );

  // slider
  childrenSetter.use(
    getAliasName(componentAlias, 'slider'),
    React.lazy(() => import('antd/es/slider')),
  );

  // switch
  childrenSetter.use(
    getAliasName(componentAlias, 'switch'),
    React.lazy(() => import('antd/es/switch')),
  );

  // time-picker
  childrenSetter.use(
    getAliasName(componentAlias, 'time'),
    React.lazy(() => import('antd/es/time-picker')),
  );

  // transfer
  childrenSetter.use(
    getAliasName(componentAlias, 'transfer'),
    React.lazy(() => import('antd/es/transfer')),
  );

  // mentions
  childrenSetter.use(
    getAliasName(componentAlias, 'mentions'),
    React.lazy(() => import('../../select/mentions')),
  );

  // auto-complete
  childrenSetter.use(
    getAliasName(componentAlias, 'autoComplete'),
    React.lazy(() => import('../../select/auto-complete')),
  );

  // cascader
  childrenSetter.use(
    getAliasName(componentAlias, 'cascader'),
    React.lazy(() => import('../../select/cascader')),
  );

  // checkbox
  childrenSetter.use(
    getAliasName(componentAlias, 'checkbox'),
    React.lazy(() => import('../../select/checkbox')),
  );

  // radio
  childrenSetter.use(
    getAliasName(componentAlias, 'radio'),
    React.lazy(() => import('../../select/radio')),
  );

  // segmented
  childrenSetter.use(
    getAliasName(componentAlias, 'segmented'),
    React.lazy(() => import('../../select/segmented')),
  );

  // select
  childrenSetter.use(
    getAliasName(componentAlias, 'select'),
    React.lazy(() => import('../../select/select')),
  );

  // select-view
  childrenSetter.use(
    getAliasName(componentAlias, 'selectView'),
    React.lazy(() => import('../../select/select-view/base')),
  );

  // tree-select
  childrenSetter.use(
    getAliasName(componentAlias, 'treeSelect'),
    React.lazy(() => import('../../select/tree-select')),
  );

  // upload
  childrenSetter.use(
    getAliasName(componentAlias, 'upload'),
    React.lazy(() => import('../../upload')),
  );

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
