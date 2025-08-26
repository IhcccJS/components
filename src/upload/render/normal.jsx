import React from 'react';
import clsx from 'clsx';
import { Progress } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import UploadStatus from './upload-status';

function Base({ className, disabled, children, ...restProps }) {
  return (
    <div className={clsx('bc-preview-normal', className, disabled && 'disabled')} {...restProps}>
      {children}
    </div>
  );
}

function Trigger({ className, disabled }) {
  return (
    <Base className={className} disabled={disabled}>
      <div className={['bc-preview-normal-content']}>
        <PlusOutlined
          style={
            disabled
              ? { fontSize: 42, color: '#c9c9c9', transform: 'rotateZ(45deg)' }
              : { fontSize: 32, color: '#c9c9c9' }
          }
        />
      </div>
    </Base>
  );
}

function Preview(props) {
  const { className, disabled, file, progressProps, removeAble, onRemove, children } = props;

  return (
    <Base className={className} disabled={disabled}>
      {file.status === 'uploading' && (
        <div className={['bc-preview-normal-progress']}>
          <Progress
            size={72}
            type="circle"
            strokeWidth={4}
            trailColor="#e5e5e5"
            {...progressProps}
            percent={file.percent}
          />
        </div>
      )}
      <UploadStatus float status={file.status} />
      <div className={['bc-preview-normal-content']}>
        {children}
        {!file.isImage && file.name && <p>{file.name}</p>}
      </div>
      {!disabled && removeAble && file.status !== 'uploading' && (
        <div className="remove-button" title="删除" onClick={onRemove}>
          删除
        </div>
      )}
    </Base>
  );
}

export { Base, Trigger, Preview };
