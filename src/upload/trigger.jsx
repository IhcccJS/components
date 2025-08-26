import React from 'react';
import { PlusOutlined, InboxOutlined, CloseCircleOutlined } from '@ant-design/icons';
import PreviewNormal from './preview/normal';
import PreviewPlus from './preview/plus';
// import useStyles from './style/trigger';

export function Normal(props) {
  const { disabled, ...restProps } = props;
  return (
    <PreviewNormal disabled={disabled} {...restProps}>
      <PlusOutlined
        style={
          disabled
            ? {
                fontSize: 42,
                color: '#EF9A9A',
                transform: 'rotateZ(45deg)',
              }
            : {
                fontSize: 32,
                color: '#c9c9c9',
              }
        }
      />
    </PreviewNormal>
  );
}

export function Plus(props) {
  const { title, description, disabled, ...restProps } = props;
  // const { styles } = useStyles();
  return (
    <PreviewPlus disabled={disabled} {...restProps}>
      <p className={'bc-upload-drag-icon'}>{disabled ? <CloseCircleOutlined /> : <InboxOutlined />}</p>
      <p className={'bc-upload-text'}>{title || '点击或拖拽文件到此处进行上传'}</p>
      <p className={'bc-upload-hint'}>{description || '支持多文件操作，请不要上传隐私数据'}</p>
    </PreviewPlus>
  );
}
