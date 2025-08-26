import { QRCode } from 'antd';

function run(item, options) {
  const { enable, name } = options;

  if (!enable.qrcode && !item.qrcode) return item;

  // TODO 实现字段显示二维码功能

  if (!item.wrappers) item.wrappers = [];

  // item.wrappers.push((children, val) => {
  //   return <QRCode title={val}>{children}</QRCode>;
  // });

  return item;
}

/** 实现显示二维码功能 */
export default { type: 'item', run };
