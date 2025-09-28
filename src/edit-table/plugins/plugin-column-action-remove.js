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
      key: 'remove',
      hidden: ({ record }) => !!record.children,
      props: { children: '删除' },
      confirm: { title: '确定要删除吗？' },
    },
  ],
};

const ColumnActionRemove = definePlugin({
  name: 'ColumnActionRemove',
  priority: 'TOOL',
  before() {
    return {
      event: {
        remove: ({ action, record }) => {
          action.remove((data) => data.filter((item) => item !== record));
        },
      },
      actionColumn,
      actionButtons,
    };
  },
});

export default ColumnActionRemove;
