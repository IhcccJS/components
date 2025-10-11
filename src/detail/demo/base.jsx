import React from 'react';
import './global';
import { Detail } from '@ihccc/components';
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
    <React.Fragment>
      <h4>默认</h4>
      <Detail column={2} data={data} columns={columns} />

      <h4>边框 & 调整内间距</h4>
      <Detail column={2} data={data} columns={columns} border cellPadding="12px" style={{ borderRadius: 12 }} />
    </React.Fragment>
  );
}

export default Demo;
