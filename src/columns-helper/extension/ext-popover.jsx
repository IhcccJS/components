import { Popover } from 'antd';

function run(item, options) {
  const { enable } = options;

  if (!enable.popover || !item.popover) return item;

  if (!item.wrappers) item.wrappers = [];

  item.wrappers.push(function popoverWrapper(children, ...args) {
    const content = item.popover.content?.apply(this, args) || args[0];
    return (
      <Popover {...item.popover} content={content}>
        {children}
      </Popover>
    );
  });

  return item;
}

/** 实现弹层功能 */
export default { type: 'item', run };
