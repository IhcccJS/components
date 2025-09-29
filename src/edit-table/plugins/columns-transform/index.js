import React from 'react';
import get from 'lodash/get';
import { isFunction } from '@ihccc/utils';
import columnsHelper from '../../../columns-helper';
import definePlugin from '../../../create-component/definePlugin';
import getFieldValue from '../../../utils/get-field-value';
import EditCell from './edit-cell';

const transferEditCell = {
  type: 'item',
  run: (column, opts) => {
    if (!column.input) return column;
    const valuePropName = column?.itemProps?.valuePropName || 'value';

    return {
      ...column,
      onCell: (record, rowIndex) => {
        return {
          editing: opts.canEdit(column.editAble, record),
          component: React.createElement(
            column.input,
            Object.assign({}, column.inputProps, {
              [valuePropName]: get(record, column.dataIndex, column.inputProps?.defaultValue),
              onChange: (event) => opts.setFieldValue?.(rowIndex, column.name || column.dataIndex, getFieldValue(valuePropName, event)),
            }),
          ),
        };
      },
    };
  },
};

const ColumnsTransform = definePlugin({
  name: 'ColumnsTransform',
  priority: 'TOOL',
  required: ['EditList'],
  props: ['columns', 'columnsTransformConfig', 'actionColumn', 'eventData', 'eventMap', 'indexColumn', 'table', 'rowKey'],
  collection: () => ({ data: {}, event: {}, actionColumn: {}, actionButtons: {} }),
  main(instance, props) {
    const {
      name,
      columns = [],
      columnsTransformConfig,
      actionColumn,
      actionButtons,
      eventData,
      eventMap,
      indexColumn,
      table: tableProps = {},
      rowKey,
    } = props;

    const { action } = instance.getPlugin('EditList');

    const canEdit = (editAbleFn, record, index) => {
      const key = record[rowKey || tableProps.rowKey];
      const isEditCell = action.editing === true || action.editing === key;
      if (isFunction(editAbleFn)) {
        return editAbleFn(record, index) && isEditCell;
      }
      return isEditCell && editAbleFn !== false;
    };

    const getIndexColumn = React.useCallback(() => {
      if (!indexColumn) return;
      const { type, ...columnConfig } = indexColumn || {};
      if (type === 'order') {
        const requestPlugin = instance.getPlugin('request');
        if (requestPlugin && !columnConfig.page) columnConfig.page = requestPlugin.request?.page;
      }
      return { ...columnConfig, getNode: false };
    }, []);

    const tableColumns = columnsHelper.useColumns(columns, {
      handler: 'baseList',
      afterExtension: [transferEditCell],
      ...columnsTransformConfig,
      name: name || 'list',
      enable: {
        indexColumn: true,
        actionColumn: true,
        cover: true,
        render: true,
        event: true,
        sort: true,
        width: true,
        form: true,
      },
      getNode: true,
      indexColumn: getIndexColumn(),
      actionColumn: { ...instance.collection.actionColumn, ...actionColumn },
      actionButtons: {
        ...instance.collection.actionButtons,
        ...actionButtons,
        buttons: [...(instance.collection.actionButtons.buttons || []), ...(actionButtons?.buttons || [])],
      },
      eventData: { ...instance.collection.data, ...instance.expose, rowKey: rowKey || tableProps.rowKey, ...eventData },
      eventMap: { ...instance.collection.event, ...eventMap },
      setFieldValue: action.setValue,
      canEdit,
    });

    return { cell: EditCell, tableColumns };
  },
});

export default ColumnsTransform;
