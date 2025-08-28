---
title: Image 图片
nav:
  title: 组件
  order: 2
group:
  title: display
  order: 2
toc: content
---

# Image 图片

## 简单上手

<code src="./demo/base"></code>

## Image Props

| 名称      | 类型                    | 默认值      | 描述                         |
| :-------- | :---------------------- | :---------- | :--------------------------- |
| border    | `boolean`               | `undefined` | 添加边框样式                 |
| src       | `string`                | `undefined` | 图片路径                     |
| size      | `default\|full`         | `default`   | 图片尺寸                     |
| group     | `string`                | `undefined` | 图片所属分组                 |
| reader    | `string`                | `undefined` | 读取器，转换图片地址         |
| className | `string`                | `undefined` | 样式类                       |
| style     | `ElementCSSInlineStyle` | `undefined` | 内联样式                     |
| children  | `string\|ReactNode`     | `undefined` | 可以通过此节点修改渲染的内容 |


## Image.Preview Props

| 名称          | 类型                | 默认值      | 描述         |
| :------------ | :------------------ | :---------- | :----------- |
| defaultReader | `boolean`           | `undefined` | 默认读取器   |
| readerOption  | `string`            | `undefined` | 多读取器配置 |
| children      | `string\|ReactNode` | `undefined` | 页面内容     |

## Image.List Props

| 名称      | 类型       | 默认值      | 描述                       |
| :-------- | :--------- | :---------- | :------------------------- |
| max       | `number`   | `-1`        | 最大直接显示数量           |
| items     | `string[]` | `undefined` | 图片路径列表               |
| showEmpty | `boolean`  | `undefined` | 没有数据时，是否显示空状态 |
| column    | `number`   | `3`         | 列数                       |
| gap       | `string`   | `undefined` | 间隔                       |
