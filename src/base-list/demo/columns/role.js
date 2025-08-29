export default [
  {
    title: '名称',
    dataIndex: 'name',
    width: 'e8',
    listRender: { as: 'name' },
  },
  {
    title: '标识',
    dataIndex: 'key',
    width: 'e8',
    listRender: { as: 'title', className: 'column-2' },
  },
  {
    title: '状态',
    dataIndex: 'enable',
    width: 'e8',
    listRender: { as: 'item', className: 'column-2' },
  },
  {
    title: '备注',
    dataIndex: 'remark',
    width: 'e16',
    visible: ['list'],
    listRender: { as: 'description' },
  },
  {
    title: '新增时间',
    dataIndex: 'createTime',
    width: 'e12',
    listRender: { as: 'extra' },
    visible: ['list'],
  },
  {
    title: '更新时间',
    dataIndex: 'updateTime',
    width: 'e12',
    listRender: { as: 'extra' },
    visible: ['list'],
  },
];

export const actionButtons = [
  {
    key: 'update',
    props: { children: '编辑' },
  },
  {
    key: 'remove',
    props: { children: '删除' },
    confirm: { title: '确认删除吗？', cancelText: '取消' },
  },
];
