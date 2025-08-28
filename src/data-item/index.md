---
title: 数据项 DataItem
nav:
  title: 组件
  order: 2
group:
  title: display
  order: 2
toc: content
---

# DataItem 数据项

如果需要渲染多个，推荐使用 `Detail`

## 简单上手

<code src="./demo/base"></code>

## DataItem Props

| 名称       | 类型          | 默认值              | 描述         |
| :--------- | :------------ | :------------------ | :----------- |
| icon       | `string`      | `undefined`         | 图标         |
| label      | `string`      | `undefined`         | 标签         |
| value      | `string`      | `undefined`         | 值           |
| symbol     | `string`      | `:`                 | 符号         |
| styleSeed  | `TStyleSeed`  | `StyleSeed.DEFAULT` | 样式种子     |
| children   | `string`      | `undefined`         | 内容         |
| className  | `string`      | `undefined`         | 根元素类名   |
| style      | `string`      | `undefined`         | 内联样式     |
| classNames | `TClassNames` | `undefined`         | 样式类       |
| styles     | `TStyles`     | `undefined`         | 内联样式集合 |


### 特别类型

TStyleSeed

```ts
type TStyleSeed = DataItem.StyleSeed;
```

TClassNames

classNames 包含多个样式名可配置：`root` 根元素样式，`head` 头部元素样式，`icon` 图标元素样式，`label` 标签元素样式，`symbol` 符号元素样式，`body` 主体元素样式

```ts
type TClassNames = {
  root?: string;
  head?: string;
  icon?: string;
  label?: string;
  symbol?: string;
  body?: string;
}
```

TStyles

styles 包含多个样式名可配置：`root` 根元素内联样式，`head` 头部元素内联样式，`icon` 图标元素内联样式，`label` 标签元素内联样式，`symbol` 符号元素内联样式，`body` 主体元素内联样式

```ts
type TStyles = {
  root?: ElementCSSInlineStyle;
  head?: ElementCSSInlineStyle;
  icon?: ElementCSSInlineStyle;
  label?: ElementCSSInlineStyle;
  symbol?: ElementCSSInlineStyle;
  body?: ElementCSSInlineStyle;
}
```
