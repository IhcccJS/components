import React from 'react';
import { QRCode, Popover } from 'antd';

function qrcodeRender(props) {
  const { popover, ...restProps } = props || {};
  return function render(val) {
    const qrcode = <QRCode value={val} {...restProps} />;

    if (popover === false) return qrcode;

    return (
      <Popover styles={{ body: { padding: 0 } }} content={qrcode} {...popover}>
        {val}
      </Popover>
    );
  };
}

export default qrcodeRender;
