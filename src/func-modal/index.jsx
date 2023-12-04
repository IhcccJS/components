import React from 'react';
import zhCN from 'antd/es/locale/zh_CN';
import { ConfigProvider, Modal } from 'antd';

function funcModal(props) {
  const { title, extra, content, bodyStyle, ...restProps } = props;

  return Modal.info({
    ...restProps,
    className: 'func-modal',
    maskClosable: true,
    icon: null,
    content: (
      <React.Fragment>
        {(title || extra) && (
          <div className="title">
            <div className="titleText">{title}</div>
            <div>{extra}</div>
          </div>
        )}
        <div className="content" style={bodyStyle}>
          <ConfigProvider locale={zhCN}>{content}</ConfigProvider>
        </div>
      </React.Fragment>
    ),
  });
}

export default funcModal;
