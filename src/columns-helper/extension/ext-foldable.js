function run(item, options) {
  const { enable, name } = options;

  if (!enable.foldAble && !item.fold) return item;

  return item;
}

/** 实现折叠字段功能 */
export default { type: 'item', run };
