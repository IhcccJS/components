import { Tooltip } from 'antd';

function run(item, options) {
  const { enable } = options;

  if (!enable.tip || !item.tip) return item;

  if (!item.wrappers) item.wrappers = [];

  item.wrappers.push(function tooltipWrapper(children, ...args) {
    const title = item.tip.title?.apply(this, args) || args[0];
    return <Tooltip title={title}>{children}</Tooltip>;
  });

  return item;
}

/** 实现显示提示功能 */
export default { type: 'item', run };
