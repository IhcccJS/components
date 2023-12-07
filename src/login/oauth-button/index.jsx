import React from 'react';
import { Avatar, Button, Space } from 'antd';
import { DoubleRightOutlined, QuestionOutlined } from '@ant-design/icons';
import useStyles from '../style/oauth';

function OauthButton({ source, target, onConfirm, onCancel }) {
  const { styles, cx } = useStyles();
  return (
    <React.Fragment>
      <div className={cx(styles, 'oauthLink')}>
        <div className={cx(styles, 'clientBlock')}>
          <div className={cx(styles, 'image')}>
            <Avatar
              size={60}
              icon={<QuestionOutlined />}
              src={source?.avatar}
              alt="头像"
            />
          </div>
          <span>{source?.name || '-'}</span>
        </div>
        <DoubleRightOutlined className={cx(styles, 'arrow')} />
        <div className={cx(styles, 'clientBlock')}>
          <div className={cx(styles, 'image')}>
            <Avatar
              size={60}
              icon={<QuestionOutlined />}
              src={target?.avatar}
              alt="头像"
            />
          </div>
          <span>{target?.name || '-'}</span>
        </div>
      </div>
      <p className={cx(styles, 'desc')}>确认授权给 {target?.name} 平台吗？</p>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Button
          block
          type="primary"
          size="large"
          shape="round"
          onClick={onConfirm}
        >
          授权
        </Button>
        <Button block type="link" size="large" shape="round" onClick={onCancel}>
          取消
        </Button>
      </Space>
    </React.Fragment>
  );
}

export default OauthButton;
