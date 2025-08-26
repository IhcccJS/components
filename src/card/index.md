---
title: Card
nav:
  title: 组件
  order: 2
group:
  title: display
  order: 2
toc: content
---

# Card 卡片

## 简单上手

<code background="#f1f1f1" src="./demo/base"></code>

## Card Props

| 名称       | 类型                                     | 默认值      | 描述                     |
| :--------- | :--------------------------------------- | :---------- | :----------------------- |
| icon       | `any`                                    | `-`         | 标题前的图标             |
| title      | `any`                                    | `undefined` | 标题                     |
| extra      | `any`                                    | `undefined` | 标题栏额外内容           |
| cover      | `any`                                    | `undefined` | 头部和主体区域中间的内容 |
| footer     | `any`                                    | `undefined` | 底部区域内容             |
| size       | `small\|default\|large`                  | `undefined` | 尺寸                     |
| statusType | `error\|warning\|success\|info\|default` | `undefined` | 卡片状态                 |
| tabs       | `TabsProps`                              | `undefined` | 将卡片渲染为 `tabs` 栏   |
| children   | `string`                                 | `undefined` | 主体内容                 |
| className  | `string`                                 | `undefined` | 样式类                   |
| classNames | `string`                                 | `undefined` | 样式类                   |
| style      | `string`                                 | `undefined` | 内联样式                 |
| styles     | `string`                                 | `undefined` | 内联样式                 |
| onClick    | `string`                                 | `undefined` | 点击回调                 |
