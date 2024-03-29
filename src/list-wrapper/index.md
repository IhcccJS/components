---
title: 列表包装 ListWrapper
nav:
  title: 组件
  order: 2
group: 
  title: container
  order: 1
toc: content
---

# ListWrapper 列表包装

用于处理展示列表的加载状态和空状态，通过此组件包裹数据渲染组件，它会自动判断数据是否为空，并显示为空状态，并且还有加载状态可以使用；当然了，你需要把子组件的数据项提升到这个组件才能使用，检测完数据是否为空后，它会继续向子组件传递数据，让子组件渲染数据。

## 示例

```jsx
import React from 'react';
import { ListWrapper } from '@ihccc/components';

function Demo() {
  const data = {
    name: '张三',
    username: 'abc',
    phone: '1213',
    sex: '0',
    enable: '1',
  };

  return (
    <ListWrapper data={data} loading={false}>
      {({ data }) => JSON.stringify(data)}
    </ListWrapper>
  );
}

export default Demo;
```

## ListWrapper props

| 名称     | 类型                    | 默认值                                           | 描述                                                                                 |
| :------- | :---------------------- | :----------------------------------------------- | :----------------------------------------------------------------------------------- |
| loading  | `boolean`               | `false`                                          | 是否加载中                                                                           |
| alias    | `string`                | `data`                                           | 此 props 中数据配置项名称                                                            |
| data     | `object\|array`         | `undefined`                                      | 此配置名称是 `alias` 配置而来，表示数据配置项名称                                    |
| empty    | `ReactNode`             | `<Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />` | 可以使用自定义空状态组件，参考 [Antd Empty](https://ant.design/components/empty-cn/) |
| children | `function \| ReactNode` | `undefined`                                      | 数据渲染方法或组件                                                                   |
