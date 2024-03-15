import React from 'react';
import { List, Avatar } from 'antd';
import { Modaler, CommonForm as Form, BaseListV2 } from '@ihccc/components';
import './global';
import columns from './columns';
import { query } from './_services';

function UpdateForm2({ data, onFinish }) {
  const [form] = Form.useForm();

  React.useEffect(() => {
    form.resetFields();
  }, [data]);

  return (
    <Form
      name="update"
      form={form}
      initialValues={data}
      columns={columns}
      onFinish={onFinish}
    />
  );
}

const DemoList = React.memo(function DemoList() {
  const onFinish = (values) => {
    console.log('onFinish values::', values);
  };

  console.log(2222);

  return (
    <BaseListV2
      namespace="userList"
      modals={[
        {
          name: 'UpdateForm',
          content: UpdateForm2,
          props: { footer: false, onFinish },
          transfer: ['data', 'onFinish'],
        },
      ]}
      button={[
        {
          key: 'create',
          props: { type: 'primary', children: '新增' },
          onClick: ({ modal }) =>
            modal.open('UpdateForm', { title: '新增', data: {} }),
        },
      ]}
      query={query}
      columns={columns}
      rowKey="id"
      // leftRender={<div style={{ width: 240 }}>123</div>}
      renderItem={(item) => {
        console.log(3333);
        return (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src={item.avatar} />}
              title={<a>{item.name}</a>}
              description="Ant Design, a design language for background applications, is refined by Ant UED Team"
            />
          </List.Item>
        );
      }}
    />
  );
});

function Demo() {
  const [mounted, setMounted] = React.useState(true);
  return (
    <Modaler.System
      defaultModalProps={{ modal: { dragAble: true, cancelMask: true } }}
    >
      <Modaler.TaskBar />
      <button onClick={() => setMounted((m) => !m)}>切换</button>
      {mounted && <DemoList />}
    </Modaler.System>
  );
}

export default Demo;
