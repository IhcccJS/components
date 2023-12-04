---
title: 表单 CommonForm
nav:
  title: 组件
  order: 2
group:
  title: input
  order: 3
toc: content
---

# CommonForm 表单

## 在全局绑定表单组件

此会在执行后在 `CommonForm.Item` 上绑定一些需要使用的表单组件。后面的 demo 在没有引入表单组件的情况，也可以通过索引的方式使用这些组件。

```jsx
import { register, setOptions } from '@ihccc/components';

const style = {
  padding: '4px 0 4px 20px',
  fontSize: 16,
  borderLeft: "4px solid #1677ff"
}

function GroupTitle({ title }) {
  return (
    <div style={style}>{title}</div>
  )
}

register.form(
  {
    groupTitle: GroupTitle
  }
);

setOptions({
  sex: [
    { label: '女', value: '0' },
    { label: '男', value: '1' },
  ],
  state: [
    { label: '禁用', value: '0' },
    { label: '启用', value: '1' },
  ]
});

export default () => <h1>全局注册输入组件</h1>;
```

## 简单示例

```jsx
import React from 'react';
import { Input } from 'antd';
import { CommonForm as Form } from '@ihccc/components';

const customNodeProps = {
  placeholder: '请输入',
};

const columns = [
  {
    key: 'user',
    inputNode: "groupTitle",
    inputNodeProps: { title: '用户' }
  },
  {
    title: '姓名',
    dataIndex: 'name',
    inputNodeProps: customNodeProps,
  },
  {
    title: '用户名',
    dataIndex: 'username',
  },
  {
    title: '密码',
    dataIndex: 'password',
    visible: 'form1',
  },
  {
    title: '联系方式',
    dataIndex: 'phone',
    inputNodeProps: customNodeProps,
  },
  {
    title: '生日',
    dataIndex: 'brithday',
    inputNode: 'date',
    inputNodeProps: {
      style: { width: '100%' },
    },
  },
  {
    key: 'other',
    inputNode: "groupTitle",
    inputNodeProps: { title: '其它' }
  },
  {
    title: '地址',
    dataIndex: 'address',
  },
  {
    title: '描述',
    dataIndex: 'description',
    visible: (type) => type !== 'form1',
  },
  {
    title: '创建时间',
    dataIndex: 'createtime',
  },
  {
    title: '更新时间',
    dataIndex: 'updatetime',
  },
];

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 18 },
};

const relation = [
  { from: 'name', to: 'username', value: (val) => val },
  {
    from: 'name',
    to: 'password',
    value: (val) => (val === 'abc' ? '123456' : ''),
  },
  {
    from: 'name',
    to: 'phone',
    value: (val) => (val === 'abc' ? '1234567890' : ''),
  },
  { from: 'name', to: 'phone', disabled: (val) => val === 'abc' },
  { from: 'name', to: 'brithday', hide: (val) => val === 'abc' },
];

function Demo() {
  return (
    <Form
      name="form1"
      relation={relation}
      initialValues={{ name: 'abc', username: 'admin' }}
      columns={columns}
      itemProps={layout}
      except={['createtime', 'updatetime']}
      trigger={<Form.Trigger.Base wrapperCol={{ offset: 4 }} />}
      onFinish={(values) => console.log(values)}
      style={{ maxWidth: 400 }}
    >
      <Form.Item
        label="用户名"
        name="username"
        inputNode="input"
        inputNodeProps={customNodeProps}
      />
      <Form.Item label="密码" name="password">
        <Input.Password {...customNodeProps} />
      </Form.Item>
      <Form.Item
        label="地址"
        name="address"
        inputNode="textarea"
        inputNodeProps={{ rows: 3, placeholder: '请输入' }}
      />
    </Form>
  );
}

export default Demo;
```

## 搜索栏

```jsx
import React from 'react';
import { BaseList, CommonForm as Form } from '@ihccc/components';

const customNodeProps = {
  placeholder: '请输入',
};

const columns = [
  {
    key: 'user',
    inputNode: "groupTitle",
    inputNodeProps: { title: '用户' }
  },
  {
    title: '姓名',
    dataIndex: 'name',
    width: 'md',
    inputNodeProps: customNodeProps,
  },
  {
    title: '用户名',
    dataIndex: 'username',
    width: 'md',
    inputNodeProps: customNodeProps,
  },
  {
    title: '联系方式',
    dataIndex: 'phone',
    width: 'md',
    inputNodeProps: customNodeProps,
  },
  {
    title: '性别',
    dataIndex: 'sex',
    inputNode: 'radio',
    inputNodeProps: { options: 'sex' },
  },
  {
    title: '用户状态',
    dataIndex: 'state',
    width: 'md',
    inputNode: 'select',
    inputNodeProps: {
      options: 'state',
    },
  },
];

function Demo() {
  const [role, setRole] = React.useState('admin');

  return (
    <React.Fragment>
      <BaseList.Searcher
        foldAble={role === 'admin'}
        initialValues={{ name: '123', username: 'admin', sex: '1' }}
        onSubmit={(values) => console.log(values)}
      >
        <Form name="search" columns={columns} />
      </BaseList.Searcher>
    </React.Fragment>
  );
}

export default Demo;
```

## 更新弹窗

```jsx
import React from 'react';
import { Button } from 'antd';
import { BaseList, CommonForm as Form } from '@ihccc/components';

const customNodeProps = {
  placeholder: '请输入',
};

const columns = [
  {
    key: 'user',
    inputNode: "groupTitle",
    inputNodeProps: { title: '用户' }
  },
  {
    title: '姓名',
    dataIndex: 'name',
    width: 'md',
    inputNodeProps: customNodeProps,
    itemProps: { rules: [{ required: true, message: '请输入您的姓名!' }] },
  },
  {
    title: '用户名',
    dataIndex: 'username',
    width: 'md',
    inputNodeProps: customNodeProps,
  },
  {
    title: '联系方式',
    dataIndex: 'phone',
    width: 'md',
    inputNodeProps: customNodeProps,
  },
  {
    title: '性别',
    dataIndex: 'sex',
    inputNode: 'radio',
    inputNodeProps: { options: 'sex' },
  },
  {
    key: 'other',
    inputNode: "groupTitle",
    inputNodeProps: { title: '其它' }
  },
  {
    title: '用户状态',
    dataIndex: 'state',
    width: 'md',
    inputNode: 'select',
    inputNodeProps: {
      options: 'state'
    },
  },
];

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 18 },
};

const group = [
  ['name', 'username'],
  ['phone', 'sex', 'state'],
];

function Demo() {
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <BaseList.Updater
        type="create"
        title={{ create: '新增信息', update: '编辑信息' }}
        steps={['第一步', '第二步', '第三步']}
        showSubmitOnStep
        open={open}
        initialValues={{ name: '123', username: 'admin', sex: '1' }}
        onSubmit={async (values) => console.log('值：', values)}
        onCancel={() => setOpen(false)}
      >
        <Form
          name="update"
          group={group}
          itemProps={layout}
          columns={columns}
        />
      </BaseList.Updater>
      <Button onClick={() => setOpen(true)}>编辑信息</Button>
    </React.Fragment>
  );
}

export default Demo;
```

## CommonForm Props

| 名称      | 类型     | 默认值      | 描述                                                                                                 |
| :-------- | :------- | :---------- | :--------------------------------------------------------------------------------------------------- |
| group     | `array`  | `undefined` | 表单名称的二维分组，用于对表单进行分组显示                                                           |
| current   | `number` | `0`         | `group` 分组的索引                                                                                   |
| relation  | `array`  | `undefined` | 表单项之间的关系配置、用于处理表单关联操作                                                           |
| columns   | `array`  | `undefined` | 表单数组配置，配置参考 `BaseList` [columns](/components/display/base-list#baselist-columns-的列配置) |
| except    | `array`  | `undefined` | 不需要渲染的表单名称数组                                                                             |
| itemProps | `object` | `undefined` | `CommonForm.Item` 通用的配置                                                                         |

> 更多配置 参考
>
> - [Antd Form](https://ant.design/components/form-cn)
> - [CssGrid](/components/layout/css-grid#cssgrid-props)

## CommonForm.Item Props

| 名称           | 类型                              | 默认值      | 描述                                                                                                       |
| :------------- | :-------------------------------- | :---------- | :--------------------------------------------------------------------------------------------------------- |
| show           | `boolean`                         | `true`      | 是否显示                                                                                                   |
| inputNode      | `string\|array\|object\|function` | `undefined` | 表单组件，如果是字符串，或者是一个对象（用法同 `BaseList - columns - render`），将会使用全局配置的表单组件 |
| inputNodeProps | `object`                          | `undefined` | 表单配置                                                                                                   |

> 更多配置 参考
>
> - [Antd Form.Item](https://ant.design/components/form-cn/#Form.Item)
> - [CssGrid.Column](/components/layout/css-grid#column-props)

## register.form

表单项注册可以通过索引使用的表单组件

- 默认值

```js | pure
import { Input } from 'antd';

Item.inputTypes = {
  input: Input,
};
```

- 用法，在全局使用

```jsx | pure
import { Input, DatePicker } from 'antd';
import { register } from '@ihccc/components';

register.form({
  input: Input,
  date: DatePicker,
  // 懒加载
  time: React.lazy(() => import('antd/lib/time-picker'))
});
```

引入默认注册包

```
import { register } from '@ihccc/components';

register.form();
```

默认已经注册的表单组件有：

| 名称（inputNode） | 组件             |
| ----------------- | ---------------- |
| `input`           | antd/Input       |
| `number`          | antd/InputNumber |
