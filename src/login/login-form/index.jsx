import { GithubFilled, LockOutlined, MailOutlined, SafetyCertificateOutlined, UserOutlined } from '@ant-design/icons';
import { version, Button, Checkbox, Divider, Form, Input, Tabs } from 'antd';
import React from 'react';

import useStyles from '../style';
import VerifyCode from './verify-code';

console.log(version);

export function UserPasswordForm({ loading, size, ...restProps }) {
  const { styles, cx } = useStyles();
  return (
    <Form layout="vertical" {...restProps}>
      <Form.Item label="用户名" name="username" rules={[{ required: true, message: '用户名是必填项！' }]}>
        <Input size={size} prefix={<UserOutlined className={cx(styles, 'prefixIcon')} />} placeholder="请输入" />
      </Form.Item>
      <Form.Item label="密码" name="password" rules={[{ required: true, message: '密码是必填项！' }]}>
        <Input.Password size={size} prefix={<LockOutlined className={cx(styles, 'prefixIcon')} />} placeholder="请输入" />
      </Form.Item>
      <Form.Item name="remember" valuePropName="checked">
        <Checkbox>记住密码</Checkbox>
      </Form.Item>
      <Form.Item style={{ marginTop: 48 }}>
        <Button block type="primary" size={size} shape="round" loading={loading} htmlType="submit">
          登录
        </Button>
      </Form.Item>
    </Form>
  );
}

export function EmailForm({ loading, size, timecount, onSend, ...restProps }) {
  const { styles, cx } = useStyles();
  return (
    <Form layout="vertical" {...restProps}>
      <Form.Item label="邮箱" name="email" rules={[{ required: true, message: '邮箱是必填项！' }]}>
        <Input size={size} prefix={<MailOutlined className={cx(styles, 'prefixIcon')} />} placeholder="请输入" />
      </Form.Item>
      <Form.Item label="验证码" name="code" rules={[{ required: true, message: '验证码是必填项！' }]}>
        <VerifyCode
          size={size}
          prefix={<SafetyCertificateOutlined className={cx(styles, 'prefixIcon')} />}
          placeholder="请输入"
          timecount={timecount}
          onSend={onSend}
        />
      </Form.Item>
      <Form.Item style={{ marginTop: 48 }}>
        <Button block type="primary" size={size} shape="round" loading={loading} htmlType="submit">
          登录
        </Button>
      </Form.Item>
    </Form>
  );
}

export function ExtraForm({ onGithub }) {
  const { styles, cx } = useStyles();
  return (
    <React.Fragment>
      <Divider dashed plain>
        其它方式
      </Divider>
      <div className={cx(styles, 'other')}>
        <Button type="default" shape="circle" size="large" title="Github 授权登录" onClick={onGithub}>
          <GithubFilled />
        </Button>
      </div>
    </React.Fragment>
  );
}

function LoginForm({ onSend, ...restProps }) {
  return (
    <Tabs
      animated
      destroyInactiveTabPane
      items={[
        {
          label: '密码登录',
          key: 'password',
          children: <UserPasswordForm {...restProps} />,
        },
        {
          label: '邮箱登录',
          key: 'email',
          children: <EmailForm onSend={onSend} {...restProps} />,
        },
      ]}
    />
  );
}

export default LoginForm;
