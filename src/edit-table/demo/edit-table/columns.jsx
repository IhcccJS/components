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
    editAble: false,
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
    inputProps: {
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
    render: ['formater', 'generator.input_type'],
  },
];

export default columns;
