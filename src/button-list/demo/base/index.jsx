import { ButtonList } from '@ihccc/components';

const handleEvent = function (...args) {
  console.log('event-data:', this, ...args);
};

const buttons = [
  {
    key: 'update',
    tip: '点击编辑',
    group: 'group1',
    props: { type: 'primary', children: '编辑' },
    onClick: handleEvent,
  },
  {
    key: 'remove',
    tip: { title: '点击删除', placement: 'bottom' },
    group: 'group1',
    confirm: { title: '确认删除吗？' },
    props: { danger: true, children: '删除' },
    onConfirm: handleEvent,
  },
  {
    key: 'enable',
    group: 'group2',
    props: { children: '启用' },
    onClick: handleEvent,
  },
  {
    key: 'examine',
    group: 'group2',
    props: { children: '审核' },
    onClick: handleEvent,
  },
  {
    key: 'dissolve',
    group: 'group2',
    props: { type: 'primary', danger: true, children: '消单' },
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
    props: { children: '作废' },
    onClick: handleEvent,
  },
  {
    key: 'timeline',
    tip: { title: '点击跳转', color: 'volcano' },
    props: { href: '/guide', children: '指南' },
  },
];

// 页面列表
function Demo() {
  return (
    <ButtonList
      space="divider"
      type="button"
      buttons={buttons}
      // sortRenderKeys={['enable', 'update', 'dissolve', 'examine', 'newButton']}
      baseProps={{
        button: { size: 'small', shape: 'round' },
        tip: { arrow: false },
      }}
      eventData={{ name: 'hello' }}
    />
  );
}

export default Demo;
