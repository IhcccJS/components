import React from 'react';
import uniqBy from 'lodash/uniqBy';
import { useControllableValue } from 'ahooks';
import ViewSimple from './render/simple';

// 自定义选择视图
// 提供默认选择模板，小，中，大
// 支持多选、支持清空、反选
function SelectView(props) {
  const { fieldNames, options, multiple, labelInValue, children = <ViewSimple />, ...restProps } = props;
  const [value, setValue] = useControllableValue(props, {
    defaultValue: multiple ? [] : void 0,
  });

  const alias = React.useMemo(
    () =>
      Object.assign(
        {
          label: 'label',
          value: 'value',
          cover: 'cover',
          description: 'description',
          disabled: 'disabled',
        },
        fieldNames,
      ),
    [fieldNames],
  );

  const isActive = React.useCallback(
    (item) => {
      if (multiple && labelInValue) {
        return Boolean((value || []).find((one) => one[alias.value] === item[alias.value]));
      }
      if (multiple) {
        return Boolean((value || []).includes(item[alias.value]));
      }
      if (labelInValue) {
        return value[alias.value] === item[alias.value];
      }
      return value === item[alias.value];
    },
    [value],
  );

  const mergeValue = React.useCallback(
    (item) => {
      const newValue = labelInValue ? item : item[alias.value];
      if (multiple) {
        setValue((value) => {
          if (isActive(item)) {
            return (value || []).filter((item) => {
              if (labelInValue) {
                return item[alias.value] !== newValue[alias.value];
              }
              return item !== newValue;
            });
          } else {
            const mergedValue = (value || []).concat(newValue);
            if (labelInValue) {
              return uniqBy(mergedValue, alias.value);
            }
            return uniqBy(mergedValue);
          }
        });
      } else {
        setValue(newValue);
      }
    },
    [isActive],
  );

  return React.cloneElement(children, {
    ...restProps,
    fieldNames: alias,
    options,
    active: value,
    isActive,
    onClick: (item) => mergeValue(item),
  });
}

SelectView.ViewSimple = ViewSimple;

export default SelectView;
