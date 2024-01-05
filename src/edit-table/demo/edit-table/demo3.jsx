import React from 'react';
import { Card, Input } from 'antd';
import { EditTable, CommonForm as Form } from '@ihccc/components';
import columns from './columns';
import defaultData from './defaultData';

const layout = {
  labelCol: { span: 2 },
  wrapperCol: { span: 22 },
};

function Demo() {
  return (
    <Card title="创建表">
      <Form
        initialValues={{ tableName: 'abc', table: defaultData }}
        itemProps={layout}
        trigger={<Form.Trigger.Base wrapperCol={{ offset: 2 }} />}
        onFinish={(values) => console.log(values)}
      >
        <Form.Item label="表名称" name="tableName">
          <Input placeholder="请输入" />
        </Form.Item>
        <Form.Item label="表结构" name="table" valuePropName="dataSource">
          <EditTable.EditRow
            size="small"
            columns={columns}
            pagination={false}
          />
        </Form.Item>
      </Form>
    </Card>
  );
}

export default Demo;
