import React from 'react';
import clsx from 'clsx';
import { ClockCircleOutlined, UploadOutlined, CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
// import useStyles from '../style/status';

const uploadStatusInfo = {
  'not-upload': {
    icon: <ClockCircleOutlined />,
    title: '等待上传',
  },
  uploading: {
    icon: <UploadOutlined />,
    title: '上传中',
  },
  done: {
    icon: <CheckCircleOutlined />,
    title: '已上传',
  },
  error: {
    icon: <CloseCircleOutlined />,
    title: '上传失败',
  },
};

function UploadStatus(props) {
  const { status, float, text } = props;
  // const { styles, cx } = useStyles();

  const currentInfo = React.useMemo(() => uploadStatusInfo[status], [status]);

  if (!currentInfo) return null;

  return (
    <span
      className={clsx('bc-preview-status', status, {
        float: float,
      })}
      title={currentInfo.title}
    >
      {currentInfo.icon}
      {text && <span className={'bc-preview-status-text'}>{currentInfo.title}</span>}
    </span>
  );
}

export default UploadStatus;
