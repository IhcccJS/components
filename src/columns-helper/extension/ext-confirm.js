import { Popconfirm } from 'antd';
import { isFunction } from '@wowon/utils';

function run(item, options) {
  const { enable } = options;

  if (!enable.confirm || !item.confirm) return item;

  if (!item.wrappers) item.wrappers = [];

  item.wrappers.push(function popoverWrapper(children, ...args) {
    const confirmProps = isFunction(item.confirm) ? item.confirm.apply(this, args) : item.confirm;
    return (
      <Popconfirm onConfirm={this.column?.event?.confirm} {...confirmProps}>
        {children}
      </Popconfirm>
    );
  });

  return item;
}

/** 实现弹层确认功能 */
export default { type: 'item', run };
