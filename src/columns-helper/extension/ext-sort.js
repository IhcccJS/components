function run(list, options) {
  const { enable } = options;

  if (!enable.sort) return list;

  const sortList = list.map((item, index) => ({ index, sort: item.sort !== void 0 ? item.sort : index }));

  sortList.sort((x, y) => x.sort - y.sort);

  return sortList.map((item) => list[item.index]);
}

/** 实现配置排序 */
export default { type: 'list', run };
