import { isObject } from '@ihccc/utils';

function run(list, options) {
  const { enable, actionColumn, actionButtons, eventMap, eventData } = options;

  if (!enable.actionColumn || (!isObject(actionColumn) && !actionButtons)) return list;

  return list.concat({
    title: '操作',
    key: '__actions__',
    fixed: 'right',
    renderType: 'buttons',
    renderProps: { type: 'a', eventMap, eventData, ...actionButtons },
    ...actionColumn,
  });
}

/** 添加按钮操作列 */
export default { type: 'list', run };
