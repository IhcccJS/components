import React from 'react';
import { LogoutOutlined, FunctionOutlined } from '@ant-design/icons';
import { Flex } from 'antd';
import { ListItem } from '@ihccc/components';

function Demo() {
  return (
    <Flex vertical gap="16px" style={{ width: 400 }}>
      <ListItem.StyleCard
        cover={<img src="/ihccc-components/哆啦A梦.png" alt="cover" style={{ height: 120 }} />}
        extra="更多信息"
        name="哆啦A梦"
        desc="来自未来的机器猫"
      />
      <ListItem.StyleCommand icon={<LogoutOutlined />} name="退出系统" desc="退出系统将会清空用户缓存" />
      <ListItem.StyleNormal vertical icon={<FunctionOutlined />} name="查看" desc="查看系统信息" />
    </Flex>
  );
}

export default Demo;
