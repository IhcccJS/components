import React from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';

function avatarRender(props) {
  return function render(val) {
    return <Avatar icon={<UserOutlined />} size={32} src={val} {...props} />;
  };
}

export default avatarRender;
