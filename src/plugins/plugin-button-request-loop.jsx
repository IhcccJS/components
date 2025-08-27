import React from 'react';
import { LoadingOutlined, PoweroffOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useInterval } from 'ahooks';
import definePlugin from '../create-component/definePlugin';

function CountDownButton({ delay, callback, ...restProps }) {
  const [enable, setEnable] = React.useState(false);
  const [countDown, setCountDown] = React.useState(delay);

  useInterval(
    () => {
      setCountDown((c) => {
        if (c - 1 === 0) {
          callback?.();
          return delay;
        }
        return c - 1;
      });
    },
    enable ? 1000 : void 0,
  );

  return (
    <Button
      {...restProps}
      type={enable ? 'primary' : 'dashed'}
      icon={enable ? <LoadingOutlined /> : <PoweroffOutlined />}
      onClick={() => {
        setEnable((e) => !e);
        setCountDown(delay);
      }}
    >
      {enable ? `已开启（${countDown}s）` : '未开启'}
    </Button>
  );
}

export default definePlugin({
  name: 'buttonRequestLoop',
  priority: 'CONTENT',
  props: ['buttonEnabled'],
  before(_, props) {
    const { buttonEnabled = {} } = props;

    if (buttonEnabled.requestLoop === false) return;

    return {
      button: {
        key: 'requestLoopToggle',
        tip: '定时刷新',
        props: ({ request }) => ({ delay: 5, callback: request.refresh }),
        // #FIXME: Cannot update a component (`ForwardRef`) while rendering a different component (`RenderButtons`). To locate the bad setState() call inside `RenderButtons`
        render: CountDownButton,
      },
    };
  },
});
