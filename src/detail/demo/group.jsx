import React from 'react';
import './global';
import { Card, Detail } from '@ihccc/components';
import columns from '../../base-list/demo/columns/role';

const data = {
  name: '管理员',
  key: 'admin',
  enable: '1',
  remark: '备注信息',
  createTime: '2020/10/10 12:34:56',
  updateTime: '2020/10/10 12:34:56',
};

function Demo() {
  return (
    <Detail group column={2} data={data} columns={columns}>
      <Detail.Group index="group1">
        <Card defaultFold={false} title="基础信息" style={{ background: '#f7f7f7' }} />
      </Detail.Group>
      <Detail.Group index="default">
        <Card defaultFold={false} title="其它信息" style={{ background: '#f7f7f7' }} />
      </Detail.Group>
    </Detail>
  );
}

export default Demo;
