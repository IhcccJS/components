import React from 'react';
import clsx from 'clsx';
import { Button, Progress } from 'antd';
import { InboxOutlined, CloseCircleOutlined } from '@ant-design/icons';
import UploadStatus from './upload-status';
// import useStyles from '../style/preview';

function Base(props) {
  const { className, disabled, children, ...restProps } = props;
  return (
    <div
      className={clsx('bc-preview-plus', className, {
        ['disabled']: disabled,
      })}
      {...restProps}
    >
      {children}
    </div>
  );
}

function Trigger({ className, disabled, title, description }) {
  return (
    <Base className={className} disabled={disabled}>
      <div className={'bc-upload-drag-icon'}>{disabled ? <CloseCircleOutlined /> : <InboxOutlined />}</div>
      <div className={'bc-upload-text'}>{title || '点击或拖拽文件到此处进行上传'}</div>
      <div className={'bc-upload-hint'}>{description || '支持多文件操作，请不要上传隐私数据'}</div>
    </Base>
  );
}

function Preview(props) {
  const { className, disabled, file, progressProps, removeAble, onRemove, children } = props;

  return (
    <Base className={className} disabled={disabled} style={{ display: 'flex' }}>
      <div className={'bc-preview-plus-content'}>
        <div className={'bc-preview-plus-preview'}>{children}</div>
        <div className={'bc-preview-plus-info'}>
          <div className={'bc-preview-plus-info-name'}>文件：{file.name || '未知'}</div>
          <div>类型：{file.extname || '未知'}</div>
          <div>大小：{file.size || '未知'}</div>
          {file.status === 'uploading' ? (
            <Progress status="active" trailColor="#e5e5e5" {...progressProps} percent={file.percent} />
          ) : (
            <UploadStatus text status={file.status} />
          )}
        </div>
        {!disabled && removeAble && file.status !== 'uploading' && (
          <Button type="link" size="small" danger title="删除" onClick={onRemove}>
            删除
          </Button>
        )}
      </div>
    </Base>
  );
}

export { Base, Trigger, Preview };
