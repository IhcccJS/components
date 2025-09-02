import React from 'react';
import get from 'lodash/get';
import { isFunction } from '@ihccc/utils';
import columnsHelper from '../../../columns-helper';
import definePlugin from '../../../create-component/definePlugin';
import EditCell from './edit-cell';

export function getValue(valuePropName, event) {
  if (event && event.target && typeof event.target === 'object' && valuePropName in event.target) {
    return event.target[valuePropName];
  }
  return event;
}

const transferEditCell = {
  type: 'item',
  run: (column, opts) => {
    if (!column.inputNode) return column;
    const valuePropName = column?.itemProps?.valuePropName || 'value';

    return {
      ...column,
      onCell: (record) => {
        return {
          editing: opts.canEdit(column.editAble, record),
          component: React.createElement(
            column.input || column.inputNode,
            Object.assign({}, column.inputProps, column.inputNodeProps, {
              [valuePropName]: get(record, column.dataIndex, column.inputProps?.defaultValue || column.inputNodeProps?.defaultValue),
              onChange: (event) => opts.setFieldValue?.(record, column, getValue(valuePropName, event)),
            }),
          ),
        };
      },
    };
  },
};

const ColumnsTransform = definePlugin({
  name: 'ColumnsTransform',
  priority: 'CONTENT',
  props: ['columns', 'columnsTransformConfig', 'actionColumn', 'eventData', 'eventMap', 'showIndex'],
  collection: () => ({ data: {}, event: {} }),
  main(instance, props) {
    const { table: tableProps = {}, name, columns = [], columnsTransformConfig, actionColumn, eventData, eventMap, showIndex } = props;

    const { action } = instance.getPlugin('EditList');
    const actions = actionColumn || instance.getPlugin('TableTreeActionButton').actionColumn;

    const canEdit = (editAbleFn, record, index) => {
      const key = record[tableProps.rowKey];
      const isEditCell = action.editing === true || action.editing === key;
      if (isFunction(editAbleFn)) {
        return editAbleFn(record, index) && isEditCell;
      }
      return isEditCell && editAbleFn !== false;
    };

    const getIndexType = React.useCallback(() => {
      if (showIndex === 'order') {
        const { request } = instance.getPlugin('request');
        return request?.page;
      }
      return showIndex;
    }, []);

    const tableColumns = columnsHelper.useColumns(columns, {
      handler: 'baseList',
      afterExtension: [transferEditCell],
      ...columnsTransformConfig,
      name: name || 'list',
      enable: {
        // indexColumn: true,
        actionColumn: true,
        cover: true,
        render: true,
        event: true,
        sort: true,
        width: true,
        form: true,
      },
      getNode: true,
      indexColumn: getIndexType(),
      actionColumn: actions,
      eventData: { ...instance.collection?.data, ...instance.expose, rowKey: tableProps.rowKey, ...eventData },
      eventMap: { ...instance.collection?.event, ...eventMap },
      setFieldValue: action.setFieldValue,
      canEdit,
    });

    return { cell: EditCell, tableColumns };
  },
});

export default ColumnsTransform;
