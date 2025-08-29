import React from 'react';
import { Space, Input } from 'antd';
import { Select } from '@ihccc/components';
import { query } from './services';

function Demo() {
  const [name, setName] = React.useState();
  const [value, setValue] = React.useState(null);

  const queryUser = {
    query,
    params: { name },
    // 初始值为 {} 就不会默认请求
    // params: !name ? {} : { name },
    format: (res) =>
      (res?.data?.list || []).map((item) => ({
        label: item.name,
        value: item.phone,
      })),
  };

  return (
    <Space>
      <Input placeholder="请输入姓名查询" value={name} onChange={(e) => setName(e.target.value)} />
      <Select options={queryUser} value={value} onChange={setValue} style={{ width: 200 }} />
    </Space>
  );
}

export default Demo;
