import { isString, isArray, isObject, isFunction } from '@ihccc/utils';
import defaultExtension from './extension';
import filterOfVisible from './filterOfVisible';

function transform(columnsSource, opts) {
  if (isObject(opts) === false) return columnsSource || [];

  const config = Object.assign({ enable: {}, eventData: {}, eventMap: {} }, opts);

  let columns;

  const { name, eventData, beforeExtension, afterExtension } = config;

  if (isFunction(columnsSource)) {
    columns = columnsSource.apply(null, eventData);
  }

  if (isArray(columnsSource) === false) return [];

  columns = [...columnsSource];

  // 先处理用户方法，这样用户修改的数据可以被 defaultExtension 接着处理
  const transformExtList = [...(beforeExtension || []), ...defaultExtension, ...(afterExtension || [])];

  // 对处理方法进行分类
  const { listExtension, itemExtension } = transformExtList.reduce(
    (grouped, item) => {
      if (item.type === 'list') grouped['listExtension'].push(item);
      if (item.type === 'item') grouped['itemExtension'].push(item);
      return grouped;
    },
    { listExtension: [], itemExtension: [] },
  );

  columns = listExtension.reduce(
    (cols, extension) => extension.run?.(cols, config) || cols,
    columns.filter((item) => !!item),
  );

  const newColumns = (isString(name) ? columns.filter(filterOfVisible(name)) : columns).map((item) => {
    const column = { ...item };
    if (column.children) {
      column.children = transform(column.children, config);
    }
    return itemExtension.reduce((col, handle) => handle.run?.(col, config) || col, column);
  });

  return newColumns;
}

export default transform;
