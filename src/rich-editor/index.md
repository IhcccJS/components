---
title: 富文本编辑器 RichEditor
nav:
  title: 组件
  order: 2
group:
  title: display
  order: 2
toc: content
---

# RichEditor 富文本编辑器

此组件基于 `react-quill` 开发

## 简单上手

<code src="./demo/base"></code>

## RichEditor Props

| 名称         | 类型                            | 默认值      | 描述                                                                   |
| :----------- | :------------------------------ | :---------- | :--------------------------------------------------------------------- |
| value        | `string`                        | `undefined` | 值                                                                     |
| onChange     | `() => any`                     | `undefined` | 变化回调                                                               |
| imageFormat  | `(file) => string`              | `undefined` | 图片回显格式化，需要将正确的文件地址返回                               |
| onUploadFile | `({ popup, onSuccess }) => any` | `undefined` | 打开文件上传回调，需要在上传完成，调用 `onSuccess`，并传入上传结果数组 |
| className    | `string`                        | `undefined` | 样式类                                                                 |
| style        | `ElementCSSInlineStyle`         | `undefined` | 内联样式                                                               |
