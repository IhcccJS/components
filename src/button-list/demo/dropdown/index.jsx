import { ButtonList } from '@ihccc/components';
import { Space } from 'antd';
import { DownOutlined } from '@ant-design/icons';

const handleEvent = function (...args) {
  console.log('event data:', ...args);
};

const buttons = [
  {
    key: 'update',
    tip: '点击编辑',
    group: 'group',
    props: { type: 'primary', children: '编辑' },
    onClick: handleEvent,
  },
  {
    key: 'remove',
    group: 'group',
    confirm: { title: '确认删除吗？' },
    props: { children: '删除' },
    onConfirm: handleEvent,
  },
  {
    key: 'enable',
    group: 'group',
    tip: '点击进行更多操作',
    dropdown: 'dropdown',
    props: { children: <DownOutlined /> },
  },
  {
    key: 'examine',
    dropdown: 'dropdown',
    props: { label: '审核' },
    onClick: handleEvent,
  },
  {
    key: 'dissolve',
    dropdown: 'dropdown',
    props: { label: '消单', danger: true },
    onClick: handleEvent,
  },
  {
    key: 'confirm',
    group: 'group2',
    props: { children: '消单审核' },
    onClick: handleEvent,
  },
  {
    key: 'nullify',
    group: 'group2',
    props: { children: '作废' },
    onClick: handleEvent,
  },
  {
    key: 'timeline',
    props: {
      href: '/guide',
      children: '操作记录',
    },
  },
];

// 页面列表
function Demo() {
  return (
    <Space direction="vertical">
      <ButtonList
        type="a"
        buttons={buttons}
        data={{ name: 'hello' }}
        baseProps={{ dropdown: { placement: 'bottom' } }}
      />
      <ButtonList
        type="button"
        buttons={buttons}
        data={{ name: 'hello' }}
        baseProps={{ dropdown: { placement: 'bottom' } }}
      />
    </Space>
  );
}

export default Demo;
