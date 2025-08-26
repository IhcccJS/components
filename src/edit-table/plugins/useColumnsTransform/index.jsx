import React from 'react';
import get from 'lodash/get';
import { isFunction } from '@ihccc/utils';
import columnsHelper from '@/components/@dev/columns-helper';
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
            column.inputNode,
            Object.assign({}, column.inputNodeProps, {
              [valuePropName]: get(record, column.dataIndex, column.inputNodeProps?.defaultValue),
              onChange: (event) => opts.setFieldValue?.(record, column, getValue(valuePropName, event)),
            }),
          ),
        };
      },
    };
  },
};

function useColumnsTransform(instance, props) {
  const {
    table: tableProps = {},
    name,
    columns = [],
    columnsTransformConfig,
    actionColumn,
    eventData,
    eventMap,
    showIndex,
  } = props;

  const { action } = instance.getPlugin('editList');
  const actions = actionColumn || instance.getPlugin('actionButton').actionColumn;

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
    eventData: { ...instance.elements.data, ...instance.expose, rowKey: tableProps.rowKey, ...eventData },
    eventMap: { ...instance.elements.event, ...eventMap },
    setFieldValue: action.setFieldValue,
    canEdit,
  });

  return { name: 'columnsTransform', cell: EditCell, tableColumns };
}

useColumnsTransform.initialStore = () => {
  return { data: {}, event: {} };
};

export default useColumnsTransform;
