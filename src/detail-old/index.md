---
title: 详情内容 Detail
nav:
  title: 组件
  order: 2
group: 
  title: display
  order: 2
toc: content
---

# Detail 详情内容

## 示例

```jsx
import React from 'react';
import { register, Detail, Text } from '@ihccc/components';

// 绑定渲染方法
register.render({
  default: (max) => (val) =>
    (
      <Text label={val}>
        <Text.Tip max={max} />
      </Text>
    ),
  sex: (val) => (val === '0' ? '女' : '男'),
  enable: (val) => (val === '0' ? '禁用' : '启用'),
});

const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
    width: 'md',
    profileRender: { type: 'default', params: 10 },
    render: () => <a>123</a>,
  },
  {
    title: '用户名',
    dataIndex: 'username',
    width: 'md',
  },
  {
    title: '联系方式',
    dataIndex: 'phone',
    width: 'md',
  },
  {
    title: '性别',
    dataIndex: 'sex',
    width: 'sm',
    render: 'sex',
  },
  {
    title: '用户状态',
    dataIndex: 'enable',
    width: 'md',
    render: 'enable',
  },
];

function Demo() {
  const data = {
    name: '张三',
    username: 'abc',
    phone: '1213',
    sex: '0',
    enable: '1',
  };

  return (
    <Detail column={2} data={data} columns={columns}>
      <Detail.Item layout="horizontal" />
    </Detail>
  );
}

export default Demo;
```

## Detail props

| 名称     | 类型        | 默认值            | 描述                                                                                |
| :------- | :---------- | :---------------- | :---------------------------------------------------------------------------------- |
| name     | `string`    | `profile`         | 渲染名称，用于 columns 内的 visible 属性过滤                                        |
| columns  | `array`     | `undefined`       | 同 [BaseList.columns](/components/display/base-list#baselist-columns-的列配置) 配置 |
| data     | `object`    | `undefined`       | 数据项                                                                              |
| colProps | `object`    | `undefined`       | 公用的项配置，项配置参考 [CssGrid.Column](/components/layout/css-grid#column-props) |
| filter   | `function`  | `undefined`       | 传入一个 `(col, value, data) => false` 方法，返回 `false`, 可以过滤某一项的渲染     |
| children | `ReactNode` | `<Detail.Item />` | 渲染数据项的组件                                                                    |

> 更多配置 参考 [CssGrid](/components/layout/css-grid#cssgrid-props)

### Detail.Item props

| 名称      | 类型                | 默认值       | 描述                                          |
| :-------- | :------------------ | :----------- | :-------------------------------------------- |
| className | `string`            | `undefined`  | 样式类                                        |
| layout    | `string`            | `'vertical'` | 排布方式，`vertical: 垂直， horizontal: 水平` |
| record    | `object`            | `undefined`  | 数据项                                        |
| label     | `string\|ReactNode` | `undefined`  | 数据名称                                      |
| value     | `any`               | `undefined`  | 数据值                                        |
| showColon | `boolean`           | `true`       | 是否显示冒号                                  |
| render    | `function`          | `undefined`  | 渲染函数                                      |

> 更多配置 参考 [CssGrid.Column](/components/layout/css-grid#column-props)

> 如果需要实现自定义的 `Detail.Item` 组件，自定义组件必须要有 `title、value、record、render` 这四个 props 属性
