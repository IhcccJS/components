import { isFunction, isArray } from '@ihccc/utils';
import assign from '../../utils/assign';
import { columnSetter } from '../../setter';

function extendColumn(column) {
  const extendName = column.extend || column.extendDeep;

  if (!extendName) return column;

  const extendSource = columnSetter.get(extendName);
  let sourceColumn;
  if (isFunction(extendSource)) {
    sourceColumn = extendSource(...(isArray(column.extendProps) ? column.extendProps : [column.extendProps]));
  } else {
    sourceColumn = extendSource;
  }

  if (!column.extendDeep) {
    column = Object.assign({}, sourceColumn, column);
  } else {
    column = assign(sourceColumn, column);
  }

  return column;
}

function run(item, options) {
  const { enable } = options;

  if (!enable.cover) return item;

  // 继承默认配置
  return extendColumn(item);
}

/** 实现配置继承 */
export default { type: 'item', run };
