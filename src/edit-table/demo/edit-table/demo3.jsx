import React from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Space, Button, Input } from 'antd';
import { Card, Form, EditTableAll } from '@ihccc/components';
import columns, { eventMap, actionButtons } from './columns';
import defaultData from './defaultData';

// 重新创建一个组件，防止和示例一的组件内部实例共用，这是个隐患，待修复
const EditTableAll2 = EditTableAll.use();

const getInitialRow = () => ({ id: '_uid_' + Date.now().toString(36) });

const baseFormProps = {
  labelAlign: 'left',
  labelCol: { span: 2 },
  wrapperCol: { span: 22 },
  actionColumn: false,
};

const rules = [
  {
    validator: (_rule, value) => {
      if (!Array.isArray(value)) return Promise.reject(new Error('请填写表结构!'));

      let errData;

      for (let i in value) {
        if (!value[i].field) {
          errData = [i, '字段索引'];
          break;
        }
        if (!value[i].label) {
          errData = [i, '显示名称'];
          break;
        }
      }

      if (!!errData) return Promise.reject(new Error(`请完善第${+errData[0] + 1}行数据：${errData[1]}!`));

      return Promise.resolve();
    },
  },
];

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
        <Form.Item label="表结构" name="table" valuePropName="dataSource" rules={rules}>
          <EditTableAll2
            ref={etRef}
            editing
            columns={columns}
            eventMap={eventMap}
            actionButtons={actionButtons}
            table={{
              size: 'small',
              pagination: false,
              footer: () => <Button type="dashed" size="small" icon={<PlusOutlined />} onClick={add} style={{ width: '100%' }} />,
            }}
            rowKey="id"
          />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 2 }}>
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
