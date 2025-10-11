import React from 'react';
import { Form } from 'antd';
import { isString } from '@ihccc/utils';
import columnsHelper from '../../columns-helper';
import definePlugin from '../../create-component/definePlugin';
import { DEFAULT_COLUMNS } from './utils';

const defaultStatus = ['disabled', 'readonly'];

function ReadValue({ value, render }) {
  return render?.(value) || value;
}

const FormatColumns = {
  type: 'item',
  run(item) {
    return {
      ...item,
      key: item.key || item.name || item.dataIndex,
      name: item.name || item.dataIndex,
    };
  },
};

const GetFormItems = {
  type: 'item',
  run(item, options) {
    const { name, viewType, formItemState } = options;

    // 表单关联事件产生的状态数据
    const itemState = formItemState[item.name] || {};

    const itemViewType = itemState.viewType || defaultStatus.includes(viewType) ? viewType : item.viewType?.[name] || item.viewType;

    if (itemViewType === 'hidden' || itemState.hidden === true) return null;

    const readonly = itemViewType === 'readonly' || itemState.readonly === true;

    return {
      ...item,
      colSpan: itemState.colSpan || item.colSpan,
      rowSpan: itemState.rowSpan || item.rowSpan,
      element: (
        <Form.Item
          label={item.title}
          {...item.itemProps}
          name={item.name}
          {...itemState.itemProps}
          {...(readonly ? { rules: [] } : {})}
          key={item.key}
        >
          {readonly ? (
            <ReadValue render={item.render} />
          ) : (
            React.cloneElement(
              item.inputRender || item.input,
              Object.assign(
                {},
                item.inputProps,
                itemState.inputProps,
                itemViewType === 'disabled' || itemState.disabled === true ? { disabled: true } : {},
              ),
            )
          )}
        </Form.Item>
      ),
    };
  },
};

const FormTransformColumns = definePlugin({
  name: 'FormTransformColumns',
  priority: 'TOOL',
  collection: () => ({ afterTransformExtension: [], formItemState: {} }),
  props: ['column', 'columns', 'viewType', 'columnsTransformConfig'],
  main(instance, props) {
    const { type, labelCol, wrapperCol, column, columns = DEFAULT_COLUMNS, viewType, columnsTransformConfig = {} } = props;
    // const { type, labelCol, wrapperCol } = instance.getSourceProps();

    const { access } = columnsTransformConfig;

    const formColumns = columnsHelper.useColumns(columns, {
      // eventMap: {},
      ...columnsTransformConfig,
      access: Object.assign({ handler: 'form', keyName: 'name' }, isString(access) ? { name: access } : access),
      name: type,
      enable: {
        sort: true,
        cover: true,
        form: true,
        formRules: true,
        format: true,
        render: true,
      },
      formState: {},
      column,
      labelCol,
      wrapperCol,
      viewType,
      formItemState: instance.collection.formItemState,
      afterExtension: [
        FormatColumns,
        ...(columnsTransformConfig.afterExtension || []),
        ...instance.collection.afterTransformExtension,
        GetFormItems,
      ],
    });

    return { formColumns };
  },
});

export default FormTransformColumns;
