import React from 'react';
import { useMemoizedFn, useControllableValue } from 'ahooks';
import definePlugin from '../../create-component/definePlugin';

const defaultCloneData = (data) => data.map((item) => ({ ...item }));

const EditList = definePlugin({
  name: 'EditList',
  priority: 'TOOL',
  props: ['defaultEditing', 'editing', 'onEditingChange', 'defaultDataSource', 'dataSource', 'onChange', 'formatList', 'onSave'],
  expose: [{ name: 'action', source: 'action' }],
  main(_, props) {
    const { formatList, cloneData = defaultCloneData, onSave } = props;

    const [cacheData, setCacheData] = React.useState(() => {
      if (props.defaultEditing || props.editing) {
        return cloneData(props.dataSource || props.defaultDataSource || []);
      }
      return [];
    });
    const [dataSource, setDataSource] = useControllableValue(props, {
      defaultValue: [],
      defaultValuePropName: 'defaultDataSource',
      valuePropName: 'dataSource',
      trigger: 'onChange',
    });

    const [editing, setEditing] = useControllableValue(props, {
      defaultValue: false,
      defaultValuePropName: 'defaultEditing',
      valuePropName: 'editing',
      trigger: 'onEditingChange',
    });

    const cacheEnabledRef = React.useRef(!(props.editing === true && !props.onEditingChange));
    // 保存取消模式，编辑时使用 cacheData 渲染
    // 不带保存按钮的，编辑直接修改 dataSource
    const updateData = cacheEnabledRef.current && editing ? setCacheData : setDataSource;

    // 当前列表显示的数据
    const data = React.useMemo(() => {
      let list = cacheEnabledRef.current && editing ? cacheData : dataSource;
      return formatList?.(list) || list;
    }, [editing, dataSource, cacheData]);

    /** 进入编辑状态 */
    const edit = useMemoizedFn((key = true) => {
      if (cacheEnabledRef.current) setCacheData(cloneData(dataSource));
      setEditing(key);
    });

    /** 取消编辑模式 */
    const cancel = useMemoizedFn(() => {
      if (cacheEnabledRef.current) setCacheData([]);
      setEditing(false);
    });

    /** 修改值 */
    const setValue = useMemoizedFn((index, name, value) => {
      updateData((data) => {
        const newData = [...data];
        // TODO name 是数组时情况处理
        newData[index][name] = value;
        return newData;
      });
    });

    /** 在后面新增一条 */
    const push = useMemoizedFn((item) => {
      updateData((data) => data.concat(Object.assign({}, item)));
    });

    /** 新增并进入编辑模式 */
    const pushAndEdit = useMemoizedFn((item, key) => {
      edit(key);
      setTimeout(() => {
        push(item);
      });
    });

    /** 在前面新增一条 */
    const unshift = useMemoizedFn((item) => {
      updateData((data) => data.reverse().concat(Object.assign({}, item)).reverse());
    });

    /** 新增并进入编辑模式 */
    const unshiftAndEdit = useMemoizedFn((item, key) => {
      edit(key);
      setTimeout(() => {
        unshift(item);
      });
    });

    /** 删除某行 */
    const remove = useMemoizedFn((index) => {
      updateData((data) => {
        let newData = [...data];
        if (typeof index === 'function') {
          newData = index(newData);
        } else if (index > -1) {
          newData.splice(index, 1);
        }
        return newData;
      });
    });

    /** 保存 */
    const save = useMemoizedFn(async () => {
      if (!editing) return;
      if (cacheEnabledRef.current) {
        const execute = await onSave?.(cacheData);
        if (execute === false) return;
        setDataSource(cacheData);
      }
      cancel();
    });

    const tableAction = {
      editing,
      data,
      setData: updateData,
      edit,
      setValue,
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
