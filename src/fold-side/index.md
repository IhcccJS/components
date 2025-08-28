---
title: 折叠侧边栏 FoldSide
nav:
  title: 组件
  order: 2
group:
  title: display
  order: 2
toc: content
---

# FoldSide 折叠侧边栏

## 简单上手

<code src="./demo/base"></code>

## FoldSide Props

| 名称              | 类型                     | 默认值      | 描述                     |
| :---------------- | :----------------------- | :---------- | :----------------------- |
| title             | `string`                 | `undefined` | 标题                     |
| placement         | `left\|right`            | `left`      | 位置                     |
| renderOnFirstOpen | `boolean`                | `undefined` | 是否在第一次打开时才渲染 |
| fold              | `boolean`                | `undefined` | 是否折叠，受控状态       |
| defaultFold       | `boolean`                | `undefined` | 默认是否折叠             |
| onFoldChange      | `(fold: boolean) => any` | `undefined` | 折叠状态改变回调         |
| className         | `string`                 | `undefined` | 样式类                   |
| style             | `ElementCSSInlineStyle`  | `undefined` | 内联样式                 |
| children          | `any`                    | `undefined` | 内容                     |
