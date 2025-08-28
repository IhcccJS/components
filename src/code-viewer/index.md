---
title: 代码显示 CodeViewer
nav:
  title: 组件
  order: 2
group:
  title: display
  order: 2
toc: content
---

# CodeViewer 代码显示

需要额外安装 `highlight.js`，并且在全局添加如下代码

```js
import hljs from 'highlight.js/lib/core';
import js from 'highlight.js/lib/languages/javascript'; // 需要的语言包
import 'highlight.js/styles/atom-one-dark.min.css'; // 引入代码高亮样式

hljs.registerLanguage('js', js); // 注册语言
```

## 简单上手

<code src="./demo/base"></code>

## CodeViewer Props

| 名称      | 类型                    | 默认值      | 描述     |
| :-------- | :---------------------- | :---------- | :------- |
| className | `string`                | `undefined` | 样式类   |
| lang      | `string`                | `json`      | 代码语言 |
| value     | `string`                | `undefined` | 代码片段 |
| style     | `ElementCSSInlineStyle` | `undefined` | 内联样式 |
