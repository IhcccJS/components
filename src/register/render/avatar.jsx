import React from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';

const avatarRender = (props) => {
  return (val) => {
    return <Avatar icon={<UserOutlined />} size={32} src={val} {...props} />;
  };
};

export default avatarRender;
