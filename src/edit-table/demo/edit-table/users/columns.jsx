import './global';

const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
    width: 'e8',
    render: ['eventLink', { max: 10 }],
    inputNode: 'input',
  },
  {
    title: '用户名',
    dataIndex: 'username',
    width: 'e8',
    inputNode: 'input',
  },
  {
    title: '联系方式',
    dataIndex: 'phone',
    width: 'md',
    render: ['number', { delimiter: ' ', part: 4 }],
    inputNode: 'input',
  },
  {
    title: '性别',
    dataIndex: 'sex',
    width: 'e12',
    render: 'sex',
    inputNode: 'sex',
    inputNodeProps: { defaultValue: '0' },
  },
  {
    title: '用户状态',
    dataIndex: 'enable',
    width: 'md',
    render: ['formater', '状态'],
    inputNode: 'select',
    inputNodeProps: { options: '状态', defaultValue: '1' },
  },
  {
    title: '标签',
    dataIndex: 'tags',
    width: 'e12',
    render: ['tagList', { options: '标签', max: 2 }],
    inputNode: 'select',
    inputNodeProps: {
      options: '标签',
      defaultValue: [],
      mode: 'multiple',
      maxTagCount: 1,
    },
  },
  {
    title: '进度',
    dataIndex: 'progress',
    width: 'e8',
    render: ['progress', { status: 'active', size: 'small', steps: 5 }],
    inputNode: 'number',
  },
  {
    title: '更新时间',
    dataIndex: 'updateTime',
    width: 'lg',
    render: ['text'],
  },
];

export default columns;
