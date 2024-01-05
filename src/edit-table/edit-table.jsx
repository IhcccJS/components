import React from 'react';
import { Table } from 'antd';
import { useControllableValue } from 'ahooks';
import get from 'lodash/get';
import set from 'lodash/set';
import cloneDeep from 'lodash/cloneDeep';
import { uuid, isString, isArray, isFunction } from '@ihccc/utils';
import columnsHelper from '../columns-helper';

import EditCell from './edit-cell';
import mergeData from './merge-data';

export function getValue(valuePropName, event) {
  if (
    event &&
    event.target &&
    typeof event.target === 'object' &&
    valuePropName in event.target
  ) {
    return event.target[valuePropName];
  }
  return event;
}

const EditTable = React.forwardRef(
  (
    {
      access,
      name,
      showIndex,
      eventData,
      eventMap,
      actionColumn,
      components,
      columns,
      renderDom,
      rowKey,
      ...restProps
    },
    ref,
  ) => {
    const [dataSource, setDataSource] = useControllableValue(restProps, {
      defaultValue: [],
      defaultValuePropName: 'defaultDataSource',
      valuePropName: 'dataSource',
    });
    const [isEdit, setIsEdit] = useControllableValue(restProps, {
      defaultValue: false,
      defaultValuePropName: 'defaultEditing',
      valuePropName: 'editing',
      trigger: 'onEditingChange',
    });
    const storeRef = React.useRef(null);
    const tableRef = React.useRef(null);
    const [rowUpdate, setRowUpdate] = React.useState();
    let initValue = null;

    const addRowData = (index, data, updateKey) => {
      storeRef.current = { ...storeRef.current, [index]: data };
      setRowUpdate(updateKey || {});
    };

    // 手动修改某行某字段的值，字段参数支持数组
    const setValue = (index, dataIndex, value) => {
      if (!storeRef.current) storeRef.current = {};
      const idx = storeRef.current.hasOwnProperty('-1') ? index - 1 : index;
      if (!storeRef.current[idx]) {
        storeRef.current = {
          ...storeRef.current,
          [idx]: cloneDeep(dataSource[idx] || {}),
        };
      }
      set(storeRef.current, [idx].concat(dataIndex), value);
      setRowUpdate({});
    };

    const fullDataSource = React.useMemo(
      () => mergeData(dataSource, storeRef.current),
      [dataSource, rowUpdate],
    );

    const getCellValue = (record, dataIndex, defaultValue) => {
      return get(record, dataIndex, defaultValue);
    };

    const handleCellChange = (index, dataIndex, valuePropName) => {
      return (event) =>
        setValue(index, dataIndex, getValue(valuePropName, event));
    };

    // 保存用户输入数据
    const saveValue = () => {
      setDataSource((dataSource) => mergeData(dataSource, storeRef.current));
    };

    // 保存数据
    const save = () => {
      saveValue();
      storeRef.current = null;
    };

    // 获取编辑数据
    const getInput = (index) => {
      const inputValues = storeRef.current[index];
      if (index > -1) {
        return Object.assign({}, dataSource[index], inputValues);
      }
    };

    // 添加到开头
    const addToStart = (rowData) => {
      const key = uuid('edit_table');
      const newRowData = { ...initValue, ...rowData, [rowKey]: key };
      addRowData(-1, newRowData, { start: true });
      setIsEdit((editKey) => (editKey === true ? true : key));
    };

    // 添加到末尾
    const addToEnd = (rowData) => {
      const key = uuid('edit_table');
      const newRowData = { ...initValue, ...rowData, [rowKey]: key };
      addRowData(dataSource.length, newRowData, { end: true });
      setIsEdit((editKey) => (editKey === true ? true : key));
    };

    // 拷贝到开头
    const copyToStart = (rowData) => {
      const key = uuid('edit_table');
      const newRowData = { ...rowData, [rowKey]: key };
      addRowData(-1, newRowData);
      setIsEdit((editKey) => (editKey === true ? true : key));
    };

    // 拷贝到末尾
    const copyToEnd = (rowData) => {
      const key = uuid('edit_table');
      const newRowData = { ...rowData, [rowKey]: key };
      addRowData(dataSource.length, newRowData);
      setIsEdit((editKey) => (editKey === true ? true : key));
    };

    // 开启编辑
    const edit = (key) => {
      setIsEdit(key);
    };

    // 编辑全部
    const editAll = () => {
      setIsEdit(true);
    };

    // 取消编辑
    const cancel = () => {
      setIsEdit(false);
      storeRef.current = null;
      setRowUpdate({});
    };

    // 删除行
    const remove = (index) => {
      const idx = storeRef.current?.hasOwnProperty('-1') ? index - 1 : index;
      // 如果是正在编辑的行，删除暂存的行数据
      if (storeRef.current?.hasOwnProperty(idx)) {
        delete storeRef.current[idx];
        if (idx === -1) setRowUpdate({});
      }
      if (idx > -1) {
        setDataSource((dataSource) => {
          const newData = [...dataSource];
          newData.splice(idx, 1);
          return newData;
        });
      }
    };

    // 清空
    const clear = () => {
      setDataSource([]);
    };

    const action = {
      addToStart,
      addToEnd,
      copyToStart,
      copyToEnd,
      edit,
      editAll,
      setValue,
      cancel,
      save,
      getInput,
      remove,
      clear,
    };

    React.useImperativeHandle(ref, () => action);

    React.useEffect(() => {
      if (!rowUpdate || (!rowUpdate.start && !rowUpdate.end)) return;
      if (tableRef.current?.scrollTo) {
        if (rowUpdate.start) tableRef.current?.scrollTo({ top: 0 });
        if (rowUpdate.end) tableRef.current?.scrollTo({ index: 100 });
        return;
      }
      const nativeElement = tableRef.current?.nativeElement || tableRef.current;
      const tbody = nativeElement.querySelector('.ant-table-tbody');
      // 新的行被添加到顶部，滚动到顶部
      if (rowUpdate.start) {
        tbody.scrollTo({ top: 0, behavior: 'smooth' });
      }
      // 新的行被添加到最后，滚动到底部
      if (rowUpdate.end) {
        const addRow = nativeElement.querySelector(
          '.ant-table-tbody tr:last-of-type',
        );
        const scrollTop = tbody.scrollHeight + addRow.offsetHeight;
        tbody.scrollTo({ top: scrollTop, behavior: 'smooth' });
      }
    }, [rowUpdate]);

    const _eventData = {
      ...eventData,
      editing: isEdit,
      action,
      rowKey,
    };

    const editColumns = columnsHelper.useColumns(columns, {
      access: Object.assign(
        { handler: 'baseList' },
        isString(access) ? { name: access } : access,
      ),
      name: name || 'list',
      isList: true,
      isForm: true,
      getInputNode: true,
      showIndex: showIndex,
      actions: actionColumn,
      eventData: _eventData,
      eventMap: eventMap,
    });

    initValue = React.useMemo(() => {
      const newValue = {};
      editColumns.forEach((item) => {
        if (!item.name && !item.dataIndex) return;
        set(
          newValue,
          item.name || item.dataIndex,
          item.inputNodeProps?.defaultValue || null,
        );
      });
      return newValue;
    }, []);

    const canEdit = (editAbleFn, record, index) => {
      const key = record[rowKey];
      const isEditCell = isEdit === true || isEdit === key;
      if (isFunction(editAbleFn)) {
        return editAbleFn(record, index) && isEditCell;
      }
      return editAbleFn !== false && isEditCell;
    };

    const margeColumns = React.useMemo(() => {
      function formatColItem(columns) {
        if (!isArray(columns)) return [];
        return columns.map((item) => {
          if (isArray(item.children)) {
            return { ...item, children: formatColItem(item.children) };
          }
          if (!item.inputNode) return item;
          const valuePropName = item?.itemProps?.valuePropName || 'value';
          return {
            ...item,
            onCell: (record, index) => ({
              value: getCellValue(
                record,
                item.dataIndex,
                item.inputNodeProps?.defaultValue,
              ),
              inputNode: item.inputNode,
              inputNodeProps: item.inputNodeProps,
              valuePropName: valuePropName,
              dataIndex: item.dataIndex,
              onChange: handleCellChange(index, item.dataIndex, valuePropName),
              editing: canEdit(item.editAble, record, index),
            }),
          };
        });
      }
      return formatColItem(editColumns);
    }, [getCellValue, handleCellChange, canEdit, editColumns]);

    const tableDom = (
      <Table
        ref={tableRef}
        pagination={{
          onChange: cancel,
        }}
        {...restProps}
        rowKey={rowKey}
        components={{
          ...components,
          body: {
            ...components?.body,
            cell: EditCell,
          },
        }}
        dataSource={fullDataSource}
        columns={margeColumns}
      />
    );

    return !renderDom ? tableDom : renderDom(tableDom, _eventData);
  },
);

EditTable.defaultProps = {
  columns: [],
  defaultValue: [],
  // sort: null, // 如果设置了排序的字段，可以进行拖拽排序
  rowKey: 'id',
};

export default EditTable;
