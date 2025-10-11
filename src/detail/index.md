---
title: Detail 详情内容
nav:
  title: 组件
  order: 2
group:
  title: display
  order: 2
toc: content
---

# Detail 详情内容

## 简单上手

<code src="./demo/base"></code>

## 分组渲染

<code src="./demo/group"></code>

## Detail Props

| 名称      | 类型                    | 默认值      | 描述                   |
| :-------- | :---------------------- | :---------- | :--------------------- |
| access    | `TAccess`               | `undefined` | 权限配置               |
| name      | `string`                | `profile`   | 数据项过滤名称         |
| column    | `number`                | `undefined` | 列数                   |
| columns   | `TColumnItem[]`         | `[]`        | 数据显示配置项         |
| data      | `Record<string, any>`   | `undefined` | 数据源                 |
| gap       | `string`                | `undefined` | 网格间隔               |
| border    | `boolean`               | `undefined` | 是否显示网格           |
| eventData | `TEventData`            | `{}`        | 事件回调的参数         |
| eventMap  | `TEventMap`             | `{}`        | 事件回调方法集合       |
| children  | `ReactNode`             | `undefined` | 额外的表单项或其它内容 |
| className | `string`                | `undefined` | 样式类                 |
| style     | `ElementCSSInlineStyle` | `undefined` | 内联样式               |
