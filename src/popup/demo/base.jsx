import React from 'react';
import { Flex, Button } from 'antd';
import { Popup } from '@ihccc/components';

function Demo() {
  const [open1, setOpen1] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);

  return (
    <React.Fragment>
      <Flex gap={16}>
        <Button onClick={() => setOpen1(true)}>默认弹窗</Button>
        <Button onClick={() => setOpen2(true)}>可拖拽弹窗</Button>
      </Flex>

      <Popup title="默认弹窗" open={open1} onHide={() => setOpen1(false)} onCancel={() => setOpen1(false)}>
        <h1>🥳 Popup</h1>
      </Popup>
      <Popup.Dragable title="可拖拽弹窗" open={open2} onHide={() => setOpen2(false)} onCancel={() => setOpen2(false)}>
        <h1>🥳 Popup.Dragable</h1>
      </Popup.Dragable>
    </React.Fragment>
  );
}

export default Demo;
