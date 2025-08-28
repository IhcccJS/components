---
title: 对话列表 Dialogue
nav:
  title: 组件
  order: 2
group:
  title: display
  order: 2
toc: content
---

# Dialogue 对话列表

## 简单上手

<code src="./demo/base"></code>

## Dialogue Props

| 名称      | 类型                     | 默认值      | 描述                                                         |
| :-------- | :----------------------- | :---------- | :----------------------------------------------------------- |
| isSelf    | `(item: any) => boolean` | `undefined` | 判断对话是否是自己的消息，如果是将显示在右侧，否则显示在左侧 |
| data      | `string`                 | `undefined` | 消息数据                                                     |
| rowKey    | `string`                 | `undefined` | 唯一的索引                                                   |
| header    | `(item: any) => any`     | `undefined` | 消息头部渲染方法                                             |
| footer    | `(item: any) => any`     | `undefined` | 消息底部渲染方法                                             |
| className | `string`                 | `undefined` | 样式类                                                       |
| style     | `ElementCSSInlineStyle`  | `undefined` | 内联样式                                                     |
