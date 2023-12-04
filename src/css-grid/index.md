---
title: Grid布局 CssGrid
nav:
  title: 组件
  order: 2
group: 
  title: layout
  order: 4
toc: content

apiHeader: false
---

## 栅格

可以控制列数的栅格组件

```jsx
import React from 'react';
import { CssGrid, Column } from '@ihccc/components';

const cellStyle = {
  minHeight: 30,
  height: '100%',
  background: '#2196F3',
  borderRadius: 6,
};

function Cell(props) {
  return (
    <Column {...props}>
      <div style={cellStyle} />
    </Column>
  );
}

function Demo() {
  return (
    <CssGrid grid={{ xxl: 6, xl: 5, lg: 4, sm: 2, xs: 2 }} gap="12px 20px">
      <Cell />
      <Cell span={2} />
      <Cell />
      <Cell />
      <Cell />
      <Cell span={[3, 2]} />
      <Cell />
      <Cell />
      <Cell />
      <Cell />
      <Cell />
      <Cell />
      <Cell />
      <Cell full />
    </CssGrid>
  );
}

export default Demo;
```

## CssGrid

`CssGrid` 下包含 `Column` 组件，和一个 `useBreakpoint` hooks。其中 `Column` 组件也可以由全局直接引入。

### CssGrid Props

| 名称      | 类型             | 默认值      | 描述                 |
| :-------- | :--------------- | :---------- | :------------------- |
| className | `string`         | `undefined` | 类名                 |
| column    | `number`         | `1`         | 列数                 |
| grid      | `object`         | `undefined` | 响应式列数           |
| max       | `number\|object` | `0`         | 最大显示单元数       |
| gap       | `CSSProperties`  | `24`        | 单元间的间隙，像素值 |
| style     | `object`         | `undefined` | 样式                 |
| children  | `ReactNode`      | `undefined` | `Column` 子元素      |

### Column Props

| 名称      | 类型            | 默认值      | 描述                            |
| :-------- | :-------------- | :---------- | :------------------------------ |
| className | `string`        | `undefined` | 类名                            |
| span      | `number\|array` | `undefined` | 占用的单元数，默认是 1          |
| grid      | `object`        | `undefined` | 响应式列数                      |
| full      | `boolean`       | `undefined` | 是否撑满一行                    |
| important | `boolean`       | `undefined` | 是否从父元素的 `max` 影响下忽略 |
| style     | `object`        | `undefined` | 样式                            |

### useBreakpoint result

| 名称  | 类型     | 默认值      | 描述                                                        |
| :---- | :------- | :---------- | :---------------------------------------------------------- |
| media | `object` | `undefined` | 满足的响应式数据，`{ 'xxl', 'xl', 'lg', 'md', 'sm', 'xs' }` |
