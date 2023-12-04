const presetButtons = {
  create: {
    type: 'button',
    props: { type: 'primary', children: '新增' },
  },
  update: { props: { children: '编辑' } },
  remove: {
    confirm: { title: '确认删除吗？' },
    props: { children: '删除' },
  },
};

export default presetButtons;
