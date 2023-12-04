import React from 'react';
import {
  EditOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  DeleteOutlined,
  CopyOutlined,
} from '@ant-design/icons';
import { Card, Divider, Button, Input } from 'antd';
import { EditTable, CommonForm as Form } from '@ihccc/components';
import columns from './columns';
import defaultData from './defaultData';

const layout = {
  labelCol: { span: 2 },
  wrapperCol: { span: 22 },
};

function EditRowTable(props) {
  const [editing, setEditing] = React.useState(false);
  const etRef = React.useRef();

  const margeColumns = React.useMemo(
    () =>
      columns.concat({
        title: '操作',
        width: 'lg',
        align: 'right',
        fixed: 'right',
        key: 'action',
        render: (_, record, index) => {
          const isEdit = editing === record.id;
          return (
            <React.Fragment>
              {!isEdit && (
                <a title="编辑" onClick={() => etRef.current?.edit(record.id)}>
                  <EditOutlined />
                </a>
              )}
              {isEdit && (
                <a title="保存" onClick={() => etRef.current?.save()}>
                  <CheckCircleOutlined />
                </a>
              )}
              {isEdit && <Divider type="vertical" />}
              {isEdit && (
                <a title="取消" onClick={() => etRef.current?.cancel()}>
                  <CloseCircleOutlined />
                </a>
              )}
              <Divider type="vertical" />
              <a title="删除" onClick={() => etRef.current?.remove(index)}>
                <DeleteOutlined />
              </a>
              <Divider type="vertical" />
              <a
                title="复制到底部"
                onClick={() => etRef.current?.copyToEnd(record)}
              >
                <CopyOutlined />
              </a>
            </React.Fragment>
          );
        },
      }),
    [editing],
  );

  const insertButton = (
    <Button
      block
      size="small"
      type="dashed"
      onClick={() => etRef.current?.addToEnd()}
    >
      添加
    </Button>
  );

  return (
    <Card
      title="编辑表格"
      extra={<a onClick={() => etRef.current?.clear()}>清空</a>}
    >
      <EditTable
        ref={etRef}
        size="small"
        columns={margeColumns}
        footer={() => insertButton}
        editing={editing}
        onEditingChange={setEditing}
        {...props}
      />
    </Card>
  );
}

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
          <EditRowTable pagination={false} />
        </Form.Item>
      </Form>
    </Card>
  );
}

export default Demo;
