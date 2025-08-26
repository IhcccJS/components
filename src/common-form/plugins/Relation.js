import React from 'react';
import { useUnmountedRef } from 'ahooks';
import { definePlugin } from '@/components/@comp/create-component';

const FormRelation = definePlugin({
  name: 'FormRelation',
  priority: 'TOOL',
  // required: [],
  props: ['columns', 'relationEvents'],
  before(instance, props) {
    const { columns, relationEvents } = props;
    const { initialValues } = instance.getSourceProps();

    const unmountedRef = useUnmountedRef();
    const [relationState, setRelationState] = React.useState({});

    // 获取配置中的关联操作
    const relations = React.useMemo(() => {
      return columns.reduce((list, item) => {
        if (Array.isArray(item.trigger)) {
          const name = item.name || item.dataIndex;
          list[name] = item.trigger.map((item) => ({ ...item, from: name }));
        }
        return list;
      }, {});
    }, [columns]);

    // 表单修改触发事件
    const onFormValuesChange = React.useCallback((changeValues, allValues) => {
      if (unmountedRef.current || !relationEvents) return;

      let changeState = {};

      Object.entries(relations).forEach(([name, relationList]) => {
        if (!relationList) return;

        // 如果没有第二个参数，就是初始化执行，取消判断 changeValues 存在 name 属性
        if (!!allValues && !(name in changeValues)) return;

        const value = changeValues[name];

        relationList.forEach((relation) => {
          const target = relation.target;
          const eventName = relation.event;
          if (!target || !eventName) return;
          const event = relationEvents[eventName];
          const itemStatus = event?.(value, allValues || changeValues);

          if (!itemStatus) {
            changeState[target] = null;
            return;
          }

          if (!changeState[target]) changeState[target] = {};

          if ('value' in itemStatus) {
            const { formInstance } = instance.expose;
            const changeValue = { [target]: itemStatus.value };
            formInstance.setFieldsValue(changeValue);
            // changeState[target].value = itemStatus.value;
          }
          if (typeof itemStatus.hidden === 'boolean') {
            changeState[target].hidden = itemStatus.hidden;
          }
          if (typeof itemStatus.disabled === 'boolean') {
            changeState[target].disabled = itemStatus.disabled;
          }
          if (typeof itemStatus.readonly === 'boolean') {
            changeState[target].readonly = itemStatus.readonly;
          }
          if (typeof itemStatus.viewType === 'string') {
            changeState[target].viewType = itemStatus.viewType;
          }
          if (itemStatus.colSpan > 0) {
            changeState[target].colSpan = itemStatus.colSpan;
          }
          if (itemStatus.rowSpan > 0) {
            changeState[target].rowSpan = itemStatus.rowSpan;
          }
          if (!!itemStatus.inputProps) {
            changeState[target].inputProps = itemStatus.inputProps;
          }
          if (!!itemStatus.itemProps) {
            changeState[target].itemProps = itemStatus.itemProps;
          }
        });
      });

      if (Object.keys(changeState).length > 0) {
        setRelationState((state) => Object.assign({}, state, changeState));
      }
    }, []);

    React.useEffect(() => {
      onFormValuesChange(initialValues);
    }, [initialValues]);

    if (!relationEvents) return;

    return { formItemState: relationState, onFormValuesChange };
  },
});

export default FormRelation;
