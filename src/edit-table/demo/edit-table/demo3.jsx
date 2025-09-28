import React from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Space, Button, Input } from 'antd';
import { Card, Form, EditTableRow } from '@ihccc/components';
import columns from './columns';
import defaultData from './defaultData';

const getInitialRow = () => ({ id: '_uid_' + Date.now().toString(36) });

const baseFormProps = {
  labelAlign: 'left',
  labelCol: { span: 2 },
  wrapperCol: { span: 22 },
  actionColumn: false,
};

function Demo() {
  const etRef = React.useRef();

  const initialValues = { tableName: 'abc', table: defaultData };

  const onFinish = (values) => console.log(values);

  const add = () => {
    const row = getInitialRow();
    etRef.current.action.pushAndEdit(row, row.id);
  };

  return (
    <Card title="创建表">
      <Form {...baseFormProps} initialValues={initialValues} onFinish={onFinish}>
        <Form.Item label="表名称" name="tableName">
          <Input placeholder="请输入" />
        </Form.Item>
        <Form.Item label="表结构" name="table" valuePropName="dataSource">
          <EditTableRow
            ref={etRef}
            columns={columns}
            table={{
              size: 'small',
              pagination: false,
              footer: () => <Button type="dashed" size="small" icon={<PlusOutlined />} onClick={add} style={{ width: '100%' }} />,
            }}
            rowKey="id"
          />
        </Form.Item>
        <Form.Item>
          <Space>
            <Button htmlType="reset">重置</Button>
            <Button type="primary" htmlType="submit">
              确认
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Card>
  );
}

export default Demo;
