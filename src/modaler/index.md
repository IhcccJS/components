---
title: Modaler
nav:
  title: 组件
  order: 2
group: 
  title: display
  order: 2
toc: content

apiHeader: false
---

# Modaler 弹窗管理

通过将弹窗内容渲染在页面外层，来实现弹窗的跨页面控制。

## 计划

- 实现基础的管理功能，能打开关闭，内容可以监听弹窗状态
- baseList 内使用方案，baseList 外部使用方案
- 内容组件传值，弹窗组件传值；内容组件调用弹窗方法，修改弹窗属性；外部修改内容组件参数
- 默认提供的详情弹窗，表单弹窗
- 可以拖拽
- 弹窗任务栏渲染
- 穿透点击

## code


```jsx | pure
import React from 'react';
import { Space, Button } from 'antd';
import { Modaler } from '@ihccc/components';

const Profile = ({ title, data = {}, onStatusChange }) => {
  return (
    <React.Fragment>
      <h1>{title} 详情</h1>
      <p>姓名：{data.name}</p>
      <p>年龄：{data.age}</p>
      <p>地址：{data.address}</p>
      <Button type="primary" onClick={onStatusChange}>修改状态</Button>
    </React.Fragment>
  );
};

function UserPage() {

  const { modal } = Modaler.useModaler({
    namespace: 'user',
    popups: [{
      name: 'profile',
      content: Profile,
      keep: true, // namespace 切换不会被注销
      preload: true, // 是否打开弹窗之前就创建内容
      renderToCurrent: true, // 是否在当前组件渲染弹窗
      props: {
        dragAble: true, // 是否允许拖拽
        cancelMask: true, // 是否可以跨遮罩点击页面内容
      },
      repeat: { getKey: (data) => data.id }, // 弹窗可以重复打开
    }],
  });

  return (
    <Space>
      <Button onClick={() => modal.open('profile', { title: '欢迎' })}>
        打开用户详情
      </Button>
      <Button onClick={() => modal.hide('profile')}>隐藏用户详情</Button>
      <Button onClick={() => modal.close('profile')}>关闭用户详情</Button>
    </Space>
  );
}

function Demo() {
  return (
    <div style={{ padding: 20, maxHeight: 960, overflow: 'auto' }}>
      <Modaler.System>
        <Modaler.TaskBar />
        <UserPage />
      </Modaler.System>
    </div>
  );
}

export default Demo;
```

## 基础使用

最简单的用法

<code src="./demo/base" iframe="640" transform></code>

## Modaler.System Props

全局容器

| 名称         | 类型                         | 默认值      | 描述               |
| :----------- | :--------------------------- | :---------- | :----------------- |
| defaultType  | `string`                     | `undefined` | 默认使用的弹窗容器 |
| max          | `number`                     | `undefined` | 最大打开弹窗数     |
| container    | `{ [type]: ModalComponent }` | `undefined` | 容器集合           |
| openPosition | `number`                     | `undefined` | 弹窗打开位置       |
| openOffset   | `number`                     | `undefined` | 弹窗之间打开间隙   |
| children     | `ReactNode`                  | `undefined` | 页面内容           |

## Modaler.useModaler Props

定义弹窗 hooks

| 名称      | 类型            | 默认值      | 描述         |
| :-------- | :-------------- | :---------- | :----------- |
| namespace | `string`        | `undefined` | 命名空间     |
| items     | `[]itemsConfig` | `undefined` | 弹窗内容配置 |

itemsConfig

| 名称            | 类型             | 默认值      | 描述                           |
| :-------------- | :--------------- | :---------- | :----------------------------- |
| name            | `string`         | `undefined` | 弹窗名称                       |
| type            | `string`         | `undefined` | 弹窗组件类型                   |
| content         | `ReactComponent` | `undefined` | 弹窗内容组件                   |
| keep            | `boolean`        | `undefined` | `namespace` 切换不会被注销     |
| preload         | `boolean`        | `undefined` | 是否打开弹窗之前就创建内容     |
| renderToCurrent | `boolean`        | `undefined` | 是否在当前组件渲染弹窗         |
| props           | `object`         | `undefined` | 弹窗参数                       |
| transfer        | `string[]`       | `undefined` | `props` 内向内容组件传递的参数 |
| taskData        | `object`         | `undefined` | 任务栏相关参数                 |
| repeat          | `repeatConfig`   | `undefined` | 弹窗可以重复打开               |

type="modal" props

| 名称       | 类型      | 默认值      | 描述                         |
| :--------- | :-------- | :---------- | :--------------------------- |
| dragAble   | `boolean` | `undefined` | 是否允许拖拽                 |
| cancelMask | `boolean` | `undefined` | 是否允许透过遮罩点击页面元素 |

taskData

| 名称    | 类型      | 默认值      | 描述     |
| :------ | :-------- | :---------- | :------- |
| title   | `string`  | `undefined` | 标题     |
| icon    | `any`     | `undefined` | 图标     |
| visible | `boolean` | `undefined` | 是否显示 |

## Modaler.useModal Props

| 名称     | 类型     | 默认值      | 描述               |
| :------- | :------- | :---------- | :----------------- |
| modalRef | `string` | `undefined` | 默认使用的弹窗容器 |
