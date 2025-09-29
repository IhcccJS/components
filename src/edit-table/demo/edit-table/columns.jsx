import './global';

const columns = [
  {
    title: '图片',
    dataIndex: 'pictures',
    width: 'md',
    render: 'pics',
    input: 'upload',
  },
  {
    title: '字段索引',
    dataIndex: 'field',
    width: 'md',
    render: ['text'],
    input: 'input',
    // editAble: false,
  },
  {
    title: '允许显示',
    dataIndex: 'visible',
    width: 'md',
    align: 'center',
    render: 'boolean',
    input: 'check',
    itemProps: { valuePropName: 'checked' },
    defaultValue: true,
  },
  {
    title: '显示名称',
    dataIndex: 'label',
    width: 'lg',
    render: ['text'],
    input: 'input',
  },
  {
    title: '列宽',
    dataIndex: 'width',
    width: 'md',
    input: 'select',
    inputProps: { options: 'front.width' },
    render: ['formater', { options: 'front.width' }],
    defaultValue: null,
  },
  {
    title: '允许搜索',
    dataIndex: 'searchable',
    width: 'md',
    align: 'center',
    render: 'boolean',
    input: 'check',
    itemProps: { valuePropName: 'checked' },
    defaultValue: true,
  },
  {
    title: '允许编辑',
    dataIndex: 'editable',
    width: 'md',
    align: 'center',
    render: 'boolean',
    input: 'check',
    itemProps: { valuePropName: 'checked' },
    defaultValue: true,
  },
  {
    title: '输入组件',
    dataIndex: 'inputType',
    width: 'lg',
    input: 'autoComplete',
    inputProps: { options: 'generator.input_type' },
    render: ['formater', { options: 'generator.input_type' }],
  },
];

const replaceData = (data, current, next) => {
  const newData = [...data];
  const currentData = newData[current];
  newData[current] = newData[next];
  newData[next] = currentData;
  return newData;
};

// 在操作列添加自定义事件和操作按钮
export const eventMap = {
  moveUp: ({ action, index }) => action.setData((data) => replaceData(data, index, index - 1)),
  moveDn: ({ action, index }) => action.setData((data) => replaceData(data, index, index + 1)),
};

export const actionButtons = {
  buttons: [
    {
      key: 'moveUp',
      props: ({ index }) => ({ disabled: index === 0, children: '上移' }),
    },
    {
      key: 'moveDn',
      props: ({ index, action }) => ({ disabled: index === action.data.length - 1, children: '下移' }),
    },
  ],
};

export default columns;
