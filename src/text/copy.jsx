import React from 'react';
import { CopyOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';
import { copyText } from '@ihccc/utils';

function Copy(props) {
  const { value, label, children } = props;
  const [status, setStatus] = React.useState('none');
  const [timer, setTimer] = React.useState(null);

  const copy = React.useCallback(async () => {
    if (value || label) {
      const isSuccess = copyText(value || label);
      setStatus(isSuccess ? 'success' : 'error');
      setTimer(setTimeout(() => setStatus('none'), 1500));
    }
  }, [value, label]);

  const iconList = React.useMemo(
    () => ({
      success: <CheckOutlined className="bc-text-copy-icon success" />,
      error: <CloseOutlined className="bc-text-copy-icon error" />,
      none: (
        <Tooltip title="复制">
          <CopyOutlined className="bc-text-copy-icon" onClick={copy} />
        </Tooltip>
      ),
    }),
    [copy],
  );

  const icon = React.useMemo(() => iconList[status], [status, iconList]);

  React.useEffect(
    () => () => {
      clearTimeout(timer);
    },
    [timer],
  );

  return (
    <React.Fragment>
      {React.isValidElement(children) ? React.cloneElement(children, { label }) : label}
      {icon}
    </React.Fragment>
  );
}

export default Copy;
