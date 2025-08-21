import { DownOutlined } from '@ant-design/icons';

export const searchAction = [
  {
    key: 'reset',
    props: { children: '重置' },
  },
  {
    key: 'search',
    props: { type: 'primary', children: '查询' },
  },
];

export const listAction = [
  {
    key: 'update',
    group: 'group',
    props: { type: 'primary', children: '编辑' },
  },
  {
    key: 'remove',
    group: 'group',
    confirm: { title: '确认删除吗？' },
    props: { children: '删除' },
  },
  {
    key: 'enable',
    group: 'group',
    tip: '更多操作',
    dropdown: 'dropdown',
    props: { children: <DownOutlined /> },
  },
  {
    key: 'examine',
    dropdown: 'dropdown',
    props: { label: '审核' },
  },
  {
    key: 'dissolve',
    dropdown: 'dropdown',
    props: { label: '消单', danger: true },
  },
  {
    key: 'confirm',
    group: 'group2',
    props: { children: '消单审核' },
  },
  {
    key: 'nullify',
    group: 'group2',
    props: { children: '作废' },
  },
  {
    key: 'timeline',
    tip: '点击跳转',
    props: {
      href: '/guide',
      children: '操作记录',
    },
  },
];
