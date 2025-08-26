import { isObject } from '@wowon/utils';

function run(list, options) {
  // FIXME eventData、data 在全局有命名冲突的问题
  const { enable, actionColumn, actionButtons, eventMap, eventData } = options;

  if (!enable.actionColumn || (!isObject(actionColumn) && !actionButtons)) return list;

  return list.concat({
    title: '操作',
    key: '__actions__',
    fixed: 'right',
    render: ['buttons', { type: 'a', eventMap, data: eventData, ...actionButtons }],
    ...actionColumn,
  });
}

/** 添加按钮操作列 */
export default { type: 'list', run };
