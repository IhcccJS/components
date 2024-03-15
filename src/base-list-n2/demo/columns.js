// 表单 和 table 列配置
const columns = [
  {
    title: '头像',
    dataIndex: 'avatar',
    width: 'e4',
    render: ['avatar'],
    listRender: { as: 'avatar' },
    // listRender: { as: 'cover|avatar|title|description|item|more|action', index: 0 },
    visible: (type) => type !== 'search',
  },
  {
    title: '链接',
    key: 'qrcode',
    dataIndex: 'username',
    width: 'e4',
    render: ['qrcode'],
    listRender: { as: 'cover' },
    visible: 'list',
  },
  {
    title: '姓名',
    dataIndex: 'name',
    width: 'e8',
    profileRender: ['default', 10],
    colProps: { span: 2 },
    render: ['eventLink', { max: 10 }],
    listRender: { as: 'title' },
    action: {
      type: 'event',
      event: 'profile',
    },
  },
  {
    title: '用户名',
    dataIndex: 'username',
    listRender: { as: 'more' },
    width: 'e8',
  },
  {
    title: '联系方式',
    dataIndex: 'phone',
    width: 'md',
    render: ['number', { delimiter: ' ', part: 4 }],
    listRender: { as: 'item' },
  },
  {
    title: '性别',
    dataIndex: 'sex',
    width: 'e4',
    inputNode: 'sex',
    render: 'sex',
    listRender: { as: 'item' },
  },
  {
    title: '用户状态',
    dataIndex: 'enable',
    width: 'md',
    render: ['formater', '状态'],
    inputNode: 'select',
    inputNodeProps: { options: '状态' },
    listRender: { as: 'item' },
  },
  {
    title: '标签',
    dataIndex: 'tags',
    width: 'e12',
    render: ['tagList', { options: '标签', max: 2 }],
    listRender: { as: 'item' },
    visible: 'list',
  },
  {
    title: '进度',
    dataIndex: 'progress',
    width: 'e8',
    render: ['progress', { status: 'active', size: 'small', steps: 5 }],
    listRender: { as: 'item' },
    visible: 'list',
  },
  {
    title: '新增时间',
    dataIndex: 'createTime',
    width: 'lg',
    visible: 'profile',
  },
  {
    title: '更新时间',
    dataIndex: 'updateTime',
    width: 'lg',
    render: ['text'],
    listRender: { as: 'more' },
    visible: ['list', 'profile'],
  },
];

export const actionColumn = {
  fixed: 'right',
  listRender: { as: 'action' },
  buttonConfig: {
    type: 'a',
    buttons: [
      {
        key: 'update',
        props: { children: '编辑' },
        // tour: ({ index }) => index === 0 && ({ label: '点击编辑按钮，修改数据' }),
      },
      {
        key: 'remove',
        props: { children: '删除' },
        confirm: { title: '确认删除吗？', cancelText: '取消' },
      },
    ],
  },
};

export default columns;
