import React from 'react';
import isEqual from 'lodash/isEqual';
import { Form } from 'antd';
import { isArray, isFunction, isString } from '@ihccc/utils';
import CssGrid from '../css-grid';
import Item from './item';
import * as Trigger from './trigger';
import margeNodes from './margeNodes';
import columnsHelper from '../columns-helper';

function collectChangeState(relationRule, formData) {
  const result = {};
  const values = Object.assign({}, formData);

  if (isArray(relationRule)) {
    relationRule.forEach((rule) => {
      if (isFunction(rule.value)) {
        if (!result.formData) result.formData = {};
        result.formData[rule.to] = rule.value(values[rule.from], values);
        Object.assign(values, result.formData);
      }
      if (isFunction(rule.hide)) {
        if (!result.hideData) result.hideData = {};
        result.hideData[rule.to] = Boolean(
          rule.hide(values[rule.from], values),
        );
      }
      if (isFunction(rule.disabled)) {
        if (!result.disabledData) result.disabledData = {};
        result.disabledData[rule.to] = Boolean(
          rule.disabled(values[rule.from], values),
        );
      }
    });
  }

  return result;
}

const CommonForm = React.memo((props) => {
  const {
    access,
    popupType,
    column,
    grid,
    max,
    gap,
    group,
    current,
    relation,
    columns,
    except,
    itemProps,
    allowRules,
    trigger,
    form,
    formRef,
    initialValues,
    children,
    onValuesChange,
    onReset,
    ...restProps
  } = props;
  const [formInstance] = Form.useForm(form);
  const [hideFields, setHideFields] = React.useState({});
  const [disabledFields, setDisabledFields] = React.useState({});

  const gridProps = { column, grid, max, gap };

  const formColumns = columnsHelper.useColumns(columns || [], {
    access: Object.assign(
      { handler: 'form' },
      isString(access) ? { name: access } : access,
    ),
    name: popupType || restProps.name,
    isForm: true,
  });

  const changeRelationState = React.useCallback(
    (values) => {
      const changeState = collectChangeState(relation, values);

      if (Boolean(changeState.hideData)) {
        setHideFields((oldFields) =>
          Object.assign({}, oldFields, changeState.hideData),
        );
      }
      if (Boolean(changeState.disabledData)) {
        setDisabledFields((oldFields) =>
          Object.assign({}, oldFields, changeState.disabledData),
        );
      }
      if (Boolean(changeState.formData)) {
        formInstance.setFieldsValue(changeState.formData);
      }
    },
    [formInstance],
  );

  const initRelationFields = React.useCallback(() => {
    if (isArray(relation) && relation.length > 0) {
      changeRelationState(initialValues);
    }
  }, [changeRelationState]);

  const handleFieldsChange = React.useCallback(
    function (_, allValues) {
      isFunction(onValuesChange) && onValuesChange.apply(nul, arguments);
      if (isArray(relation) && relation.length > 0)
        changeRelationState(allValues);
    },
    [onValuesChange, changeRelationState],
  );

  const childrenNodes = React.useMemo(
    () =>
      margeNodes(formColumns, children, {
        except,
        itemProps,
        allowRules,
      }),
    [formColumns, children, except, itemProps, allowRules],
  );

  const passedchildrenNodes = React.useMemo(() => {
    if (isArray(group) || Object.keys(hideFields).length > 0) {
      let name,
        currentGroup = group?.[current];

      return React.Children.map(childrenNodes, (child) => {
        name = child?.props?.name;
        if (hideFields[name] || currentGroup?.includes(name) === false) {
          return void 0;
        } else if (disabledFields[name]) {
          return React.cloneElement(child, { disabled: disabledFields[name] });
        }
        return child;
      });
    }
    return childrenNodes;
  }, [childrenNodes, group, current, hideFields, disabledFields]);

  const handleReset = React.useCallback(
    (e) => {
      isFunction(onReset) && onReset(e);
      initRelationFields();
    },
    [onReset, initRelationFields],
  );

  React.useEffect(() => {
    initRelationFields();
    if (!!formRef) formRef.current = { initRelationFields };
    return () => {
      if (!!formRef) formRef.current = null;
    };
  }, [initRelationFields]);

  return (
    <Form
      {...restProps}
      form={formInstance}
      initialValues={initialValues}
      onValuesChange={handleFieldsChange}
      onReset={handleReset}
    >
      <CssGrid {...gridProps}>
        {passedchildrenNodes}
        {trigger}
      </CssGrid>
    </Form>
  );
}, isEqual);

CommonForm.defaultProps = {
  gap: '0 24px',
  current: 0,
};

CommonForm.Item = Item;
CommonForm.Trigger = Trigger;
CommonForm.useForm = Form.useForm;

export { CommonForm, Item };

export default CommonForm;
