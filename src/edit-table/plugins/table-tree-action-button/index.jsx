import definePlugin from '../../../create-component/definePlugin';

const actionColumn = {
  width: 'lg',
  fixed: 'right',
  getNode: false,
};

const actionButtons = {
  type: 'a',
  buttons: [
    {
      key: 'insert',
      hidden: ({ action, record, rowKey }) => action.editing === record[rowKey],
      props: { children: '新增' },
    },
    {
      key: 'update',
      hidden: ({ action, record, rowKey }) => action.editing === record[rowKey],
      props: { children: '编辑' },
    },
    {
      key: 'submit',
      hidden: ({ action, record, rowKey }) => action.editing !== record[rowKey],
      props: { children: '提交' },
    },
    {
      key: 'cancel',
      hidden: ({ action, record, rowKey }) => action.editing !== record[rowKey],
      props: { children: '取消' },
      confirm: { title: '确定要取消吗？' },
    },
    {
      key: 'remove',
      hidden: ({ action, record, rowKey }) => action.editing === record[rowKey] || !!record.children,
      props: { children: '删除' },
      confirm: { title: '确定要删除吗？' },
    },
  ],
};

const TableTreeActionButton = definePlugin({
  name: 'TableTreeActionButton',
  priority: 'TOOL',
  collection: () => ({ data: {}, event: {} }),
  before() {
    return {
      event: {
        // row event
        insert: ({ getInitialRow, action, record, rowKey }) => {
          const rowData = getInitialRow?.(record) || {};
          action.pushAndEdit(rowData, rowData[rowKey]);
        },
        update: ({ action, record, rowKey }) => action.edit(record[rowKey]),
        submit: ({ action, record, rowKey }) => action.save((item) => item[rowKey] === record[rowKey]),
        cancel: ({ action }) => action.cancel(),
        remove: ({ action, record, rowKey }) => action.remove((item) => item[rowKey] === record[rowKey]),
      },
    };
  },
  main() {
    return {
      actionColumn,
      actionButtons,
    };
  },
});

export default TableTreeActionButton;
