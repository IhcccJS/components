import React from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';
import { Dialogue } from '@ihccc/components';

const getAvatar = (color) => <Avatar size={48} shape="square" icon={<UserOutlined />} style={{ background: color }} />;

const data = [
  { name: 'AAA', avatar: getAvatar('#03a9f4'), content: '您好~', time: '2025-08-28 12:00:10', key: '1' },
  { name: 'BBB', avatar: getAvatar('#24b588'), content: '您好~', time: '2025-08-28 12:00:15', key: '2' },
  { name: 'CCC', avatar: getAvatar('#ff9800'), content: '大家好~', time: '2025-08-28 12:01:20', key: '3' },
  { name: 'BBB', avatar: getAvatar('#24b588'), content: '🥳 欢迎使用 @ihccc/components~', time: '2025-08-28 12:02:56', key: '4' },
];

function Demo() {
  return <Dialogue data={data} isSelf={(item) => item.name === 'AAA'} />;
}

export default Demo;
