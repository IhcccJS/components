import React from 'react';
import { Table } from 'antd';
import { useUpdate, useControllableValue } from 'ahooks';
import omit from 'lodash/omit';
import { uuid, isString } from '@ihccc/utils';
import columnsHelper from '../columns-helper';

import EditCell from './edit-cell';
import mergeData from './merge-data';

const AllEditCountName = '__all__';

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

// 新增方法（顶部、底部），拷贝方法（顶部、底部），保存方法，取消方法，删除方法，清空
const EditTable = React.forwardRef(
  (
    { access, name, showIndex, components, columns, rowKey, ...restProps },
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
    const [newRow, setNewRow] = React.useState(null);
    const editCountRef = React.useRef({});
    const inputValueRef = React.useRef({});
    const valueUpdate = useUpdate();

    const initValue = React.useMemo(() => {
      const newValue = {};
      columns.map((item) => {
        newValue[item.dataIndex] = item.inputNodeProps?.defaultValue || null;
      });
      return newValue;
    }, []);

    const fullDataSource = React.useMemo(() => {
      if (!newRow) return dataSource;
      const { start, value } = newRow;
      return start ? [value, ...dataSource] : [...dataSource, value];
    }, [dataSource, newRow]);

    const getCellValue = (index, dataIndex) => {
      const inValue = inputValueRef.current[index]?.[dataIndex];
      if (inValue !== void 0) return inValue;
      return fullDataSource[index][dataIndex];
    };

    const handleCellChange = (index, dataIndex, valuePropName) => {
      return (event) => {
        if (!inputValueRef.current[index]) inputValueRef.current[index] = {};
        inputValueRef.current[index][dataIndex] = getValue(
          valuePropName,
          event,
        );
        valueUpdate();
      };
    };

    // 保存用户输入数据
    const saveValue = () => {
      setDataSource((dataSource) => {
        let data = dataSource;
        if (!!newRow) {
          const { start, value } = newRow;
          data = start ? [value, ...data] : [...data, value];
        }
        setNewRow(null);
        return mergeData(fullDataSource, inputValueRef.current);
      });
    };

    // 更新修改次数
    const _editCellCountUpdate = (key) => {
      if (!editCountRef.current[key]) editCountRef.current[key] = 0;
      editCountRef.current[key] += 1;
    };

    // 保存数据
    const save = () => {
      setIsEdit(false);
      saveValue();
      inputValueRef.current = {};
    };

    // 获取编辑数据
    const getInput = (index) => {
      const inputValues = inputValueRef.current[index];
      if (!!newRow) {
        return Object.assign(omit(newRow.value, [rowKey]), inputValues);
      }
      if (index > -1) {
        return Object.assign({}, dataSource[index], inputValues);
      }
    };

    // 添加到开头
    const addToStart = () => {
      if (!!newRow) return;
      const key = uuid('edit_table');
      const newRowData = { ...initValue, [rowKey]: key };
      setNewRow({ value: newRowData, start: true });
      setIsEdit(key);
      _editCellCountUpdate(key);
    };

    // 添加到末尾
    const addToEnd = () => {
      if (!!newRow) return;
      const key = uuid('edit_table');
      const newRowData = { ...initValue, [rowKey]: key };
      setNewRow({ value: newRowData, start: false });
      setIsEdit(key);
      _editCellCountUpdate(key);
    };

    // 拷贝到开头
    const copyToStart = (rowData) => {
      const key = uuid('edit_table');
      const newRowData = { ...rowData, [rowKey]: key };
      setNewRow({ value: newRowData, start: true });
      setIsEdit(key);
      _editCellCountUpdate(key);
    };

    // 拷贝到末尾
    const copyToEnd = (rowData) => {
      const key = uuid('edit_table');
      const newRowData = { ...rowData, [rowKey]: key };
      setNewRow({ value: newRowData, start: false });
      setIsEdit(key);
      _editCellCountUpdate(key);
    };

    // 开启编辑
    const edit = (key) => {
      setIsEdit(key);
      _editCellCountUpdate(key);
    };

    // 编辑全部
    const editAll = () => {
      setIsEdit(true);
      _editCellCountUpdate(AllEditCountName);
    };

    // 取消编辑
    const cancel = () => {
      setNewRow(null);
      setIsEdit(false);
      inputValueRef.current = {};
    };

    // 删除行
    const remove = (index) => {
      if (index > -1) {
        setDataSource((dataSource) => {
          const newData = [...dataSource];
          newData.splice(index, 1);
          return newData;
        });
      }
    };

    // 清空
    const clear = () => {
      setDataSource([]);
    };

    React.useImperativeHandle(ref, () => ({
      addToStart,
      addToEnd,
      copyToStart,
      copyToEnd,
      edit,
      editAll,
      cancel,
      save,
      getInput,
      remove,
      clear,
    }));

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
    });

    // const editColumns = React.useMemo(() => {
    //   return columnsHelper.transform(columns, {
    //     name: 'list',
    //     isList: true,
    //     isForm: true,
    //     getInputNode: true,
    //     showIndex: showIndex,
    //   });
    // }, [columns]);

    const canEdit = (editAbleFn, record, index) => {
      const key = record[rowKey];
      const isEditCell = isEdit === true || isEdit === key;
      if (editAbleFn) {
        return (
          editAbleFn(
            record,
            index,
            editCountRef.current[key] ||
              editCountRef.current[AllEditCountName] ||
              0,
          ) && isEditCell
        );
      }
      return editAbleFn !== false && isEditCell;
    };

    const margeColumns = editColumns.map((col) => {
      if (!col.inputNode) return col;
      const valuePropName = col?.itemProps?.valuePropName || 'value';
      return {
        ...col,
        onCell: (record, index) => ({
          value: getCellValue(index, col.dataIndex),
          inputNode: col.inputNode,
          inputNodeProps: col.inputNodeProps,
          valuePropName: valuePropName,
          dataIndex: col.dataIndex,
          onChange: handleCellChange(index, col.dataIndex, valuePropName),
          editing: canEdit(col.editAble, record, index),
        }),
      };
    });

    return (
      <Table
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
  },
);

EditTable.defaultProps = {
  editing: false,
  columns: [],
  defaultValue: [],
  // sort: null, // 如果设置了排序的字段，可以进行拖拽排序
  rowKey: 'id',
};

export default EditTable;
