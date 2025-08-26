import React from 'react';
import { Popconfirm, Button } from 'antd';
import { delay } from '@ihccc/utils';

function stopPropagationEvent(event) {
  return function (e) {
    e.stopPropagation();
    event && event(e);
  };
}

const DisabledA = (props) => <a {...props} style={{ color: '#c9c9c9', cursor: 'not-allowed' }} />;

export const A = ({ disabled, onClick, children, ...props }) => {
  if (disabled === true) return <DisabledA>{children}</DisabledA>;
  return (
    <a {...props} onClick={stopPropagationEvent(onClick)}>
      {children}
    </a>
  );
};

export function WaitButton({ wait = 0, onClick, ...restProps }) {
  const [loading, setLoading] = React.useState(false);

  const onBtnClick = React.useCallback(async () => {
    setLoading(true);
    await onClick();
    if (wait > 0) await delay(wait);
    setLoading(false);
  }, [wait, onClick]);

  return <Button {...restProps} loading={loading} onClick={onBtnClick} />;
}

export function Confirm(props) {
  const { disabled, onConfirm, onCancel, children, ...restProps } = props;

  return disabled === true ? (
    React.cloneElement(children, { disabled })
  ) : (
    <Popconfirm onConfirm={stopPropagationEvent(onConfirm)} onCancel={stopPropagationEvent(onCancel)} {...restProps}>
      {children}
    </Popconfirm>
  );
}
