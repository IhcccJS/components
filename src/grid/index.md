---
title: 网格 Grid
nav:
  title: 组件
  order: 2
group:
  title: display
  order: 2
toc: content
---

# Grid 网格

## 简单上手

<code src="./demo/base"></code>

## Grid Props

| 名称          | 类型                     | 默认值      | 描述                                                         |
| :------------ | :----------------------- | :---------- | :----------------------------------------------------------- |
| border        | `boolean`                | `undefined` | 是否显示网格                                                 |
| template      | `array`                  | `undefined` | 以数据方式渲染                                               |
| column        | `number`                 | `undefined` | 列数                                                         |
| gap           | `string`                 | `undefined` | 网格间隔                                                     |
| transferStyle | `boolean`                | `undefined` | 使用 `template` 情况下，是否将网格样式参数，传递到内容元素上 |
| onItemClick   | `(index: number) => any` | `undefined` | 使用 `template` 情况下，点击每个网格元素的回调               |
| className     | `string`                 | `undefined` | 样式类                                                       |
| style         | `ElementCSSInlineStyle`  | `undefined` | 内联样式                                                     |
| children      | `any`                    | `undefined` | 内容                                                         |
