import React from 'react';
import { UserOutlined, CloudSyncOutlined, EditOutlined } from '@ant-design/icons';
import { Space, Button, Form, Input, Spin } from 'antd';
import { Modaler } from '@wowon/components';
import { profile } from '../services';

function getName() {
  return ['张三', '李晓'][Math.floor(Math.random() * 2)];
}

function useProfile(name) {
  const [data, setData] = React.useState({});
  const [loading, setLoading] = React.useState(false);

  const fetch = async () => {
    setLoading(true);
    const res = await profile({ name });
    setData(res.data || {});
    setLoading(false);
  };

  React.useEffect(() => {
    if (name) fetch();
  }, [name]);

  return { data, loading };
}

function UserProfile({ name, data = {} }) {
  console.log('UserProfile update!');
  return (
    <React.Fragment>
      <h1>{name} 详情</h1>
      <p>姓名：{data.name}</p>
      <p>年龄：{data.age}</p>
      <p>地址：{data.address}</p>
    </React.Fragment>
  );
}

function OrderProfile({ data = {} }) {
  console.log('OrderProfile update!');
  return (
    <React.Fragment>
      <h1>工单详情</h1>
      <p>工单ID：{data.id}</p>
      <p>出咯人：{data.name}</p>
      <p>处理时间：{data.time}</p>
    </React.Fragment>
  );
}

function FetchProfile({ name }) {
  console.log('FetchProfile update!');
  const { data, loading } = useProfile(name);

  return (
    <Spin spinning={loading}>
      <h1>{name} 详情</h1>
      <p>姓名：{data.name}</p>
      <p>年龄：{data.age}</p>
      <p>地址：{data.address}</p>
    </Spin>
  );
}

function UpdateFormWithoutFooter({ data, onFinish }) {
  const [form] = Form.useForm();

  React.useEffect(() => {
    form.resetFields();
  }, [data]);

  return (
    <Form form={form} initialValues={data} onFinish={onFinish}>
      <Form.Item label="姓名" name="name">
        <Input placeholder="请输入" />
      </Form.Item>
      <Form.Item label="年龄" name="age">
        <Input placeholder="请输入" />
      </Form.Item>
      <Form.Item label="地址" name="address">
        <Input placeholder="请输入" />
      </Form.Item>
      <Form.Item wrapperCol={{ span: 12, offset: 2 }} style={{ marginBottom: 0 }}>
        <Space>
          <Button type="primary" htmlType="submit">
            提交
          </Button>
          <Button htmlType="reset">重置</Button>
        </Space>
      </Form.Item>
    </Form>
  );
}

function UpdateFormWithFooter({ name, ee }) {
  const { data, loading } = useProfile(name);

  const [form] = Form.useForm();

  React.useEffect(() => {
    form.resetFields();
  }, [data]);

  ee.on('submit', () => form.validateFields());

  ee.on('cancel', () => form.resetFields());

  return (
    <Spin spinning={loading}>
      <Form form={form} initialValues={data}>
        <Form.Item label="姓名" name="name">
          <Input placeholder="请输入" />
        </Form.Item>
        <Form.Item label="年龄" name="age">
          <Input placeholder="请输入" />
        </Form.Item>
        <Form.Item label="地址" name="address">
          <Input placeholder="请输入" />
        </Form.Item>
      </Form>
    </Spin>
  );
}

function Buttons({ label, onOpen, onTransfer, onHide, onClose }) {
  return (
    <Space>
      <Button type="primary" onClick={onOpen}>
        打开 - {label}
      </Button>
      {onTransfer && <Button onClick={onTransfer}>传参</Button>}
      {onHide && (
        <Button danger onClick={onHide}>
          隐藏
        </Button>
      )}
      {onClose && (
        <Button type="primary" danger onClick={onClose}>
          关闭
        </Button>
      )}
    </Space>
  );
}

const modalFooter = [
  {
    key: 'cancel',
    props: { children: '取消' },
    onClick: ({ onCancel }) => onCancel(),
    space: 'full',
  },
  {
    key: 'submit',
    props: { type: 'primary', children: '提交' },
    onClick: ({ onOk }) => onOk(),
  },
];

function UserPage() {
  const onFinish = (values) => {
    console.log('onFinish values::', values);
  };

  const onOk = async ({ ee }) => {
    console.log('onOk values::', await ee.emit('submit'));
    return false;
  };

  const onCancel = ({ ee }) => {
    ee.emit('cancel');
    return false;
  };

  const { modal } = Modaler.useModaler({
    namespace: 'user',
    items: [
      {
        name: 'profile',
        content: UserProfile,
        props: { title: '用户详情', footer: false },
        transfer: ['name', 'data'],
        taskData: { icon: <UserOutlined /> },
      },
      {
        name: 'order',
        content: OrderProfile,
        props: { title: '工单详情', footer: false },
        transfer: ['key', 'data'],
        repeat: {},
      },
      {
        name: 'fetchProfile',
        content: FetchProfile,
        props: { title: '请求数据', footer: false },
        transfer: ['name'],
        taskData: { icon: <CloudSyncOutlined /> },
      },
      {
        name: 'updateFormWithoutFooter',
        content: UpdateFormWithoutFooter,
        props: { title: '调用外部事件', footer: false, onFinish },
        transfer: ['data', 'onFinish'],
        taskData: { icon: <EditOutlined /> },
      },
      {
        name: 'updateFormWithFooter',
        content: UpdateFormWithFooter,
        props: { title: '调用内容事件', onOk, onCancel, buttons: modalFooter },
        transfer: ['name'],
        events: true,
        taskData: { icon: <EditOutlined /> },
      },
    ],
  });

  return (
    <Space direction="vertical">
      <Buttons
        label="用户"
        onOpen={() => modal.open('profile', { name: Math.random() })}
        onTransfer={() =>
          modal.setProps('profile', {
            name: '123',
            data: {
              name: Math.random(),
              age: Math.random(),
              address: Math.random(),
            },
          })
        }
        onHide={() => modal.hide('profile')}
        onClose={() => modal.close('profile')}
      />
      <Buttons
        label="工单"
        onOpen={() =>
          modal.open('order', {
            key: Math.floor(Math.random() * 10),
            data: {
              name: Math.random(),
              time: new Date().toLocaleString(),
            },
          })
        }
      />
      <Buttons
        label="请求详情"
        onOpen={() => modal.open('fetchProfile', { name: '张三' })}
        onTransfer={() => modal.setProps('fetchProfile', { name: getName() })}
        onHide={() => modal.hide('fetchProfile')}
        onClose={() => modal.close('fetchProfile')}
      />
      <Buttons
        label="内容调用弹窗外事件"
        onOpen={() =>
          modal.open('updateFormWithoutFooter', {
            data: {
              name: Math.random(),
              age: Math.random(),
              address: Math.random(),
            },
          })
        }
        onTransfer={() =>
          modal.setProps('updateFormWithoutFooter', {
            data: {
              name: Math.random(),
              age: Math.random(),
              address: Math.random(),
            },
          })
        }
        onHide={() => modal.hide('updateFormWithoutFooter')}
        onClose={() => modal.close('updateFormWithoutFooter')}
      />
      <Buttons
        label="弹窗外调用内容事件"
        onOpen={() => modal.open('updateFormWithFooter', { name: '张三' })}
        onTransfer={() => modal.setProps('updateFormWithFooter', { name: getName() })}
        onHide={() => modal.hide('updateFormWithFooter')}
        onClose={() => modal.close('updateFormWithFooter')}
      />
    </Space>
  );
}

function Demo() {
  return (
    <div style={{ padding: 20, maxHeight: 960, overflow: 'auto' }}>
      <Modaler.System
        defaultModalProps={{ modal: { dragAble: true, cancelMask: true } }}
        onOpenOverflow={() => {
          console.warn('弹窗打开上限！！！');
        }}
      >
        <Modaler.TaskBar />
        <UserPage />
      </Modaler.System>
    </div>
  );
}

export default Demo;
