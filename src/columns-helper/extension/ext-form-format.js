import { formatSetter } from '@/components/@setter';
import { isArray } from '@wowon/utils';

function run(item, options) {
  const { enable } = options;

  if (!enable.format) return item;

  if (isArray(item.formatIn)) {
    const key = item.name || item.dataIndex;
    item.formatIn = formatSetter.get(item.formatOut.concat(key));
  }
  if (isArray(item.formatOut)) {
    const key = item.name || item.dataIndex;
    item.formatOut = formatSetter.get(item.formatOut.concat(key));
  }

  return item;
}

/** 实现拷贝功能 */
export default { type: 'item', run };
