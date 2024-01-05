import './global';

const columns = [
  {
    title: '图片',
    dataIndex: 'pictures',
    width: 'md',
    render: 'pics',
    inputNode: 'upload',
  },
  {
    title: '字段索引',
    dataIndex: 'field',
    width: 'md',
    render: ['text'],
    inputNode: 'input',
    editAble: false,
  },
  {
    title: '允许显示',
    dataIndex: 'visible',
    width: 'md',
    align: 'center',
    render: 'boolean',
    inputNode: 'check',
    itemProps: { valuePropName: 'checked' },
    defaultValue: true,
  },
  {
    title: '显示名称',
    dataIndex: 'label',
    width: 'lg',
    render: ['text'],
    inputNode: 'input',
  },
  {
    title: '列宽',
    dataIndex: 'width',
    width: 'md',
    inputNode: 'select',
    inputNodeProps: {
      options: 'front.width',
    },
    render: ['formater', 'front.width'],
    defaultValue: null,
  },
  {
    title: '允许搜索',
    dataIndex: 'searchable',
    width: 'md',
    align: 'center',
    render: 'boolean',
    inputNode: 'check',
    itemProps: { valuePropName: 'checked' },
    defaultValue: true,
  },
  {
    title: '允许编辑',
    dataIndex: 'editable',
    width: 'md',
    align: 'center',
    render: 'boolean',
    inputNode: 'check',
    itemProps: { valuePropName: 'checked' },
    defaultValue: true,
  },
  {
    title: '输入组件',
    dataIndex: 'inputType',
    width: 'lg',
    inputNode: 'autoComplete',
    inputNodeProps: { options: 'generator.input_type' },
    render: ['formater', 'generator.input_type'],
  },
];

export default columns;
