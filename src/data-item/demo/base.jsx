import React from 'react';
import { UserOutlined, DashboardOutlined } from '@ant-design/icons';
import { DataItem } from '@ihccc/components';

function Demo() {
  return (
    <React.Fragment>
      <DataItem icon={<UserOutlined />} label="姓名" value={'麦扣'} />
      <DataItem styleSeed={DataItem.StyleSeed.DETAIL_CARD_SIMPLE} icon={<UserOutlined />} label="姓名" value={'麦扣'} />
      <DataItem
        styleSeed={DataItem.StyleSeed.COUNT_CARD_LARGE}
        icon={<DashboardOutlined />}
        label="总量"
        value={128}
        style={{ color: '#24b588' }}
      />
    </React.Fragment>
  );
}

export default Demo;
