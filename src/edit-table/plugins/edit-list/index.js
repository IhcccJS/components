import React from 'react';
import cloneDeep from 'lodash/cloneDeep';
import { useDynamicList, useMemoizedFn, useControllableValue } from 'ahooks';
import definePlugin from '../../../create-component/definePlugin';

const ROW_INDEX_NAME = '_index';

const EditList = definePlugin({
  name: 'EditList',
  priority: 'TOOL',
  props: ['dataSource', 'formatList', 'onChange', 'onSave'],
  expose: [{ name: 'action', source: 'action' }],
  main(_, props) {
    const { formatList, dataSource = [], onChange, onSave } = props;
    const action = useDynamicList(dataSource);

    React.useEffect(() => {
      action.resetList(dataSource.map((item, index) => ({ ...item, [ROW_INDEX_NAME]: index })));
    }, [dataSource]);

    const [cacheData, setCacheData] = React.useState([]);
    const [editing, setEditing] = useControllableValue(props, {
      defaultValue: false,
      defaultValuePropName: 'defaultEditing',
      valuePropName: 'editing',
      trigger: 'onEditingChange',
    });

    const data = React.useMemo(() => {
      let list = !editing ? action.list : cacheData;
      // if(editing) {
      //   // list =
      // }
      return formatList?.(list) || list;
    }, [editing, action.list, cacheData]);

    const edit = useMemoizedFn((key) => {
      // setCacheData()
      setEditing(key);
    });

    const setFieldValue = useMemoizedFn((record, column, value) => {
      const index = record[ROW_INDEX_NAME];
      if (!cacheRef.current[index]) cacheRef.current[index] = {};
      const dataIndex = column.name || column.dataIndex;
      // TODO 字段是数组时情况处理
      cacheRef.current[index][dataIndex] = value;
    });

    const push = useMemoizedFn((item) => {
      // ? 新增时，可能获取不到最新的 editing 状态
      if (editing) {
        cacheRef.current.push(Object.assign(item, { [ROW_INDEX_NAME]: cacheRef.current.length }));
      } else {
        action.push(Object.assign(item, { [ROW_INDEX_NAME]: action.list.length }));
      }
    });

    const pushAndEdit = useMemoizedFn((item, key) => {
      edit(key);
      cacheRef.current.push(Object.assign(item, { [ROW_INDEX_NAME]: cacheRef.current.length }));
    });

    const unshift = useMemoizedFn((item) => {
      if (editing) {
        cacheRef.current.unshift(Object.assign(item, { [ROW_INDEX_NAME]: 0 }));
      } else {
        action.unshift(Object.assign(item, { [ROW_INDEX_NAME]: 0 }));
      }
    });

    const unshiftAndEdit = useMemoizedFn((item, key) => {
      edit(key);
      cacheRef.current.unshift(Object.assign(item, { [ROW_INDEX_NAME]: 0 }));
    });

    const remove = useMemoizedFn((index) => {
      if (typeof index === 'function') {
        index = action.list.findIndex((item) => index(item));
      }
      if (index > -1) {
        if (editing) {
          cacheRef.current.splice(index, 1);
        } else {
          action.remove(index);
        }
      }
    });

    const cancel = useMemoizedFn(() => {
      if (cacheRef.current.length > 0) cacheRef.current = [];
      setEditing(false);
    });

    const save = useMemoizedFn(async (index) => {
      if (typeof index === 'function') {
        index = cacheRef.current.findIndex((item) => index(item));
      }

      let stopReset = false;

      if (index > -1) {
        index = index < 0 ? cacheRef.current.length + index : index;
        stopReset = await onSave?.(cacheRef.current[index]);
      } else {
        stopReset = await onChange?.(cacheRef.current);
      }

      if (!stopReset) {
        action.resetList(cacheRef.current);
        cancel();
      }
    });

    const tableAction = {
      ...action,
      editing,
      data,
      edit,
      setFieldValue,
      push,
      pushAndEdit,
      unshift,
      unshiftAndEdit,
      remove,
      cancel,
      save,
    };

    return {
      action: tableAction,
    };
  },
});

export default EditList;
