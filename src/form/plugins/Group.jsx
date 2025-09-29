import React from 'react';
import { isFunction } from '@ihccc/utils';
import definePlugin from '../../create-component/definePlugin';
import Grid from '../../grid';

const GroupContext = React.createContext({});

function Group({ index, className, style, border, children }) {
  const { column, gap, groupIndex, renderGroup } = React.useContext(GroupContext);

  if (
    (Array.isArray(groupIndex) && groupIndex.indexOf(index) < 0) ||
    ((typeof groupIndex === 'number' || typeof groupIndex === 'string') && groupIndex !== index) ||
    index < 0
  ) {
    return null;
  }

  const items = renderGroup?.(index);

  if (!items) return null;

  const content = (
    <Grid className={className} style={style} transferStyle border={border} column={column} template={items} option={{ gap }} />
  );

  return React.isValidElement(children) ? React.cloneElement(children, { children: content }) : content;
}

function GroupProvider(props) {
  const { instance, column, gap, groupIndex, children } = props;
  const { actionColumn } = instance.getPlugin('ButtonSubmit');
  const { formColumns } = instance.getPlugin('FormTransformColumns');

  const grouped = React.useMemo(() => {
    return formColumns.data.concat(actionColumn).reduce((group, item) => {
      if (!item) return group;
      const groupName = item.group || 'default';
      if (Array.isArray(groupName)) {
        groupName.forEach((gname) => {
          if (!group[gname]) group[gname] = [];
          group[gname].push(item);
        });
      } else {
        if (!group[groupName]) group[groupName] = [];
        group[groupName].push(item);
      }
      return group;
    }, {});
  }, [formColumns.data]);

  const renderGroup = React.useCallback((index) => grouped[index], [grouped]);

  return <GroupContext.Provider value={{ column, gap, groupIndex, renderGroup }}>{children}</GroupContext.Provider>;
}

const FormGroup = definePlugin({
  name: 'FormGroup',
  // priority: 'LAYOUT',
  // required: ['FormView'],
  context: { GroupContext },
  subComponent: { Group },
  props: ['classNames', 'foldConfig', 'actionColumn', 'group', 'groupIndex', 'border', 'gap', 'column'],
  main(instance, props) {
    const { classNames = {}, foldConfig, actionColumn, group, border, gap, column } = props;
    const [foldState, setFoldState] = React.useState(!!foldConfig?.defaultFold);

    if (group !== void 0) return { provider: GroupProvider };

    const ButtonSubmit = instance.getPlugin('ButtonSubmit');
    const { formColumns } = instance.getPlugin('FormTransformColumns');

    const columns = foldState ? formColumns.data.slice(0, foldConfig?.size || column - 1) : formColumns.data;

    const submitColumn = isFunction(actionColumn)
      ? actionColumn({
          foldEnable: !!foldConfig && formColumns.data.length > column - 1,
          columns,
          foldState,
          setFoldState,
          actionColumnColSpan: column - (columns.length % column),
        })
      : actionColumn;

    return {
      content: (
        <Grid
          className={classNames.grid}
          transferStyle
          border={border}
          column={column}
          template={columns.concat(
            actionColumn === null || actionColumn === false
              ? []
              : {
                  ...ButtonSubmit.actionColumn,
                  ...submitColumn,
                },
          )}
          option={{ gap }}
          key="form-items"
        />
      ),
    };
  },
});

export default FormGroup;
