import definePlugin from '../../create-component/definePlugin';

const actionColumn = {
  width: 'lg',
  fixed: 'right',
  getNode: false,
};

const actionButtons = {
  type: 'a',
  buttons: [
    {
      key: 'update',
      hidden: ({ action, record, rowKey }) => action.editing === record[rowKey],
      props: { children: '编辑' },
    },
    {
      key: 'remove',
      hidden: ({ action, record, rowKey }) => action.editing === record[rowKey] || !!record.children,
      props: { children: '删除' },
      confirm: { title: '确定要删除吗？' },
    },
    {
      key: 'save',
      hidden: ({ action, record, rowKey }) => action.editing !== record[rowKey],
      props: { children: '保存' },
    },
    {
      key: 'cancel',
      hidden: ({ action, record, rowKey }) => action.editing !== record[rowKey],
      props: { children: '取消' },
      confirm: { title: '确定要取消吗？' },
    },
  ],
};

const ColumnActionEdit = definePlugin({
  name: 'ColumnActionEdit',
  priority: 'TOOL',
  before() {
    return {
      event: {
        update: ({ action, record, rowKey }) => action.edit(record[rowKey]),
        save: ({ action }) => action.save(),
        cancel: ({ action }) => action.cancel(),
        remove: ({ action, record }) => action.remove((data) => data.filter((item) => item !== record)),
      },
      actionColumn,
      actionButtons,
    };
  },
});

export default ColumnActionEdit;
