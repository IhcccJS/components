import { isString, isArray, isObject, isFunction } from '@ihccc/utils';
import defaultExtension from './extension';
import filterOfVisible from '../filterOfVisible';

const getListOrderNumber = (page = {}, n = 0) => {
  const { pageNumber = 1, pageSize = 10 } = page;
  return pageSize * (pageNumber - 1) + n + 1;
};

function transform(columnsSource, opts) {
  if (isObject(opts) === false) return columnsSource || [];

  let columns;

  const {
    name,
    showIndex,
    isList,
    eventMap,
    eventData,
    actions,
    transformExtension,
  } = opts;

  if (isFunction(columnsSource)) {
    columns = columnsSource.apply(null, opts.eventData);
  }

  if (isArray(columnsSource) === false) return [];

  columns = [...columnsSource];

  const transformItem = defaultExtension.concat(transformExtension || []);

  if (isList && !!showIndex) {
    columns.unshift({
      title: 'NO.',
      key: 'indexNumber',
      width: 'min',
      fixed: 'left',
      align: 'center',
      render: [
        'number',
        {
          count: (_, __, n) => getListOrderNumber(showIndex, n),
          style: { fontSize: 16, fontFamily: 'inherit' },
        },
      ],
    });
  }

  if (isList && isObject(actions)) {
    const { buttonConfig, ...rest } = actions;
    columns.push({
      title: '操作',
      key: 'actions',
      render: ['buttons', { ...buttonConfig, eventMap, data: eventData }],
      ...rest,
    });
  }

  const newColumns = (
    isString(name) ? columns.filter(filterOfVisible(name)) : columns
  ).map((item) => {
    const column = { ...item };
    if (column.children) {
      column.children = transform(column.children, opts);
    }
    return transformItem.reduce((col, handle) => handle(col, opts), column);
  });

  return newColumns;
}

export default transform;
