import React from 'react';
import './global';
import { Form } from '@ihccc/components';
import columns from '../../base-list/demo/columns/role';

function Demo() {
  return (
    <Form
      name="update"
      initialValues={{ name: '角色123', key: 'myRole' }}
      labelAlign="left"
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 16 }}
      column={1}
      columns={columns}
      style={{ width: 640 }}
    />
  );
}

export default Demo;
