---
title: columns
nav:
  title: 组件
  order: 2
toc: content

apiHeader: false
---

`columns` 通常是指表格中显示数据列的配置；为了方便数据渲染，在本库中，指功能中的字段列表；通过统一的 `columnsHelper` 方法，可以方便的将此配置转换为表格、表单、详情等内容组件的配置项，统一了配置项和数据规范。

## 类型

```ts
type columns = TColumnItem[];
```

## `TColumnItem` 配置项

| 字段                                                  | 作用范围        | 描述           |
| :---------------------------------------------------- | :-------------- | :------------- |
| extend                                                | `全部`          | 继承类型       |
| extendDeep                                            | `全部`          | 继承类型       |
| extendProps                                           | `全部`          | 继承参数       |
| title                                                 | `全部`          | 标题名称       |
| colSpan                                               | `全部`          | 跨列数         |
| rowSpan                                               | `全部`          | 跨行数         |
| visible                                               | `全部`          | 是否显示       |
| `@visibleName`                                        | `全部`          | 覆盖配置       |
| `@@visibleName`                                       | `全部`          | 深度覆盖配置   |
| dataIndex                                             | `全部`          | 字段名称       |
| renderType                                            | `Table\|Detail` | 渲染方法类型   |
| renderProps                                           | `Table\|Detail` | 渲染方法参数   |
| event                                                 | `Table\|Detail` | 渲染时操作事件 |
| group                                                 | `Form\|Detail`  | 分组名称       |
| name                                                  | `Form`          | 表单中字段名称 |
| inputNode <Badge type="warning">考虑弃用</Badge>      | `Form`          | 输入组件类型   |
| input                                                 | `Form`          | 输入组件类型   |
| inputNodeProps <Badge type="warning">考虑弃用</Badge> | `Form`          | 输入组件参数   |
| inputProps                                            | `Form`          | 输入组件参数   |
| itemProps                                             | `Form`          | 表单项参数     |
| rules                                                 | `Form`          | 表单校验规则   |
| listRender                                            | `Table`         | 列表中渲染配置 |
