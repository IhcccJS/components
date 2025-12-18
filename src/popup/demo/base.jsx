import React from 'react';
import { Flex, Button } from 'antd';
import { Popup } from '@ihccc/components';

function Demo() {
  const [open1, setOpen1] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [open3, setOpen3] = React.useState(false);
  const [destroy, setDestroy] = React.useState(false);

  return (
    <React.Fragment>
      <Flex gap={16}>
        <Button onClick={() => setOpen1(true)}>默认弹窗</Button>
        <Button onClick={() => setOpen2(true)}>可拖拽弹窗</Button>
        <Button onClick={() => setOpen3(true)}>可拖拽弹窗隐藏遮罩</Button>
      </Flex>

      <Popup forceRender title="默认弹窗" extra="额外内容" open={open1} onCancel={() => setOpen1(false)}>
        <h1>🥳 Popup</h1>
      </Popup>
      <Popup.Dragable width={720} title="可拖拽弹窗" open={open2} onHide={() => setOpen2(false)}>
        <h1>🥳 Popup.Dragable</h1>
        <div style={{ height: 400, background: '#f1f1f1' }}></div>
      </Popup.Dragable>
      <Popup.Dragable
        mask={false}
        cancelMask
        width={720}
        title="可拖拽弹窗"
        open={open3}
        onHide={() => {
          setDestroy(false);
          setOpen3(false);
        }}
        onCancel={() => {
          setDestroy(true);
          setOpen3(false);
        }}
        destroyOnClose={destroy}
        footerButton={{
          sortRenderKeys: { cancel: false },
          buttons: [{ key: 'close', props: { type: 'primary', danger: true, children: '关闭' }, onClick: 'cancel' }],
        }}
      >
        <h1>🥳 Popup.Dragable</h1>
        <div style={{ height: 400, background: '#f1f1f1' }}></div>
      </Popup.Dragable>
    </React.Fragment>
  );
}

export default Demo;
