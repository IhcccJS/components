---
title: ListView
nav:
  title: 组件
  order: 2
group: 
  title: display
  order: 2
toc: content
---

# ListView 列表视图

展示列表

## 基础使用

最简单的用法

```jsx
import React from 'react';
import { ListView } from '@ihccc/components';

function Demo() {
  return (
    <ListView column={4}>
      <ListView.Item>
        abc
      </ListView.Item>
      <ListView.Item>
        abc
      </ListView.Item>
      <ListView.Item>
        abc
      </ListView.Item>
      <ListView.Item>
        abc
      </ListView.Item>
      <ListView.Item>
        abc
      </ListView.Item>
      <ListView.Item>
        abc
      </ListView.Item>
      <ListView.Item>
        abc
      </ListView.Item>
      <ListView.Item>
        abc
      </ListView.Item>
    </ListView>
  );
}

export default Demo;
```

## ListView Props

列表

| 名称   | 类型     | 默认值      | 描述       |
| :----- | :------- | :---------- | :--------- |
| column | `number` | `undefined` | 每行的列数 |

## ListView.Item Props

列表

| 名称    | 类型      | 默认值      | 描述       |
| :------ | :-------- | :---------- | :--------- |
| noStyle | `boolean` | `undefined` | 是否无样式 |
