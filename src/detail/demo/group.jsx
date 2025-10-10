import React from 'react';
import './global';
import { Detail } from '@ihccc/components';
import columns from '../../base-list/demo/columns/role';

const data = {
  name: '张三',
  username: 'abc',
  phone: '1213',
  sex: '0',
  enable: '1',
};

function Demo() {
  return (
    <Detail group column={2} data={data} columns={columns}>
      <Detail.Group index="group1"></Detail.Group>
      <Detail.Group index="group2"></Detail.Group>
    </Detail>
  );
}

export default Demo;
