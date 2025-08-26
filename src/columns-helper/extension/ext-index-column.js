const getListOrderNumber = (page = {}, n = 0) => {
  const { pageNumber = 1, pageSize = 10 } = page;
  return pageSize * (pageNumber - 1) + n + 1;
};

function run(list, options) {
  const { enable, indexColumn } = options;

  if (!enable.indexColumn || !indexColumn) return list;

  const { page, ...rest } = indexColumn || {};

  list.unshift({
    title: 'NO.',
    key: 'indexNumber',
    width: 'min',
    fixed: 'left',
    align: 'center',
    render: [
      'number',
      {
        count: (_, __, n) => getListOrderNumber(page, n),
        style: { fontSize: 16, fontFamily: 'inherit' },
      },
    ],
    ...rest,
  });

  return list;
}

/** 添加索引列 */
export default { type: 'list', run };
