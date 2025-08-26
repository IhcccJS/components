import assign from '@/components/@comp/_utils/assign';

function run(item, options) {
  const { enable, name } = options;

  if (!enable.cover) return item;

  const coverConfig = item['@' + name];

  if (!!coverConfig) Object.assign(item, coverConfig);

  const coverConfigDeep = item['@@' + name];

  if (!!coverConfigDeep) return assign(item, coverConfigDeep);

  return item;
}

/** 实现配置覆盖 */
export default { type: 'item', run };
