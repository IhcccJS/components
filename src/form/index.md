---
title: Form 表单
nav:
  title: 组件
  order: 2
group:
  title: display
  order: 2
toc: content
---

# Form 表单

此组件由多个插件构建而来

## 简单上手

<code src="./demo/base"></code>

## Form plugins

- FormView
- FormTransformColumns
- Group
- FormStep
- AutoAlignment
- Relation
- ButtonSubmit

## plugin

插件清单

### AutoAlignment <Badge type="error">未完成</Badge>

自动设置 `labelCol` 和 `wrapperCol` 使表单项自动对齐

### ButtonSubmit

默认添加的重置按钮、提交按钮

| 名称              | 类型      | 默认值      | 描述                                                |
| :---------------- | :-------- | :---------- | :-------------------------------------------------- |
| column            | `number`  | `undefined` | 操作按钮占的列数                                    |
| resetButtonProps  | `TButton` | `undefined` | 重置按钮配置，查看 `ButtonList` 组件 `buttons` 配置 |
| submitButtonProps | `TButton` | `undefined` | 提交按钮配置，查看 `ButtonList` 组件 `buttons` 配置 |

### FormStep

添加一个 `useStep` hook，可以让分组的表单变成分步显示，使用前提是必须使用了 `Group` 插件

```ts
const useStep = (form: formInstance, defaultStep: number = 0) => { step: number, setStep: (step: number) => void 0, value: Record<string, any> }
```

### FormTransformColumns

用于转换表单的 `columns` 配置

| 名称                   | 类型                                                       | 默认值      | 描述                   |
| :--------------------- | :--------------------------------------------------------- | :---------- | :--------------------- |
| type                   | `string`                                                   | `undefined` | 控制表单显示隐藏的名称 |
| column                 | `number`                                                   | `undefined` | 表单显示列数           |
| columns                | `TColumns[]`                                               | `[]`        | 列表列配置项           |
| viewType               | `string\|Record<string, 'hidden'\|'readonly'\|'disabled'>` | `undefined` | 手动隐藏此按钮         |
| columnsTransformConfig | `TUseColumns`                                              | `{}`        | `useColumns` 配置      |

### FormView

渲染表单

| 名称     | 类型            | 默认值      | 描述                   |
| :------- | :-------------- | :---------- | :--------------------- |
| form     | `TFormInstance` | `undefined` | 表单实例               |
| children | `ReactNode`     | `undefined` | 额外的表单项或其它内容 |

### Group

在页面操作按钮列表自动添加一个新增按钮

| 名称         | 类型                                        | 默认值      | 描述             |
| :----------- | :------------------------------------------ | :---------- | :--------------- |
| classNames   | `{ grid: string }`                          | `{}`        | 网格元素样式     |
| foldConfig   | `{ defaultFold?: boolean; size?: number; }` | `undefined` | 折叠配置         |
| actionColumn | `function\|TGridItem`                       | `undefined` | 提交按钮栏配置   |
| group        | `boolean`                                   | `undefined` | 是否开启分组     |
| border       | `boolean`                                   | `undefined` | 是否显示边框样式 |
| gap          | `string`                                    | `undefined` | 表单元素间隔     |
| column       | `number`                                    | `undefined` | 表单显示列数     |

### Relation

在页面操作按钮列表自动添加一个新增按钮

| 名称           | 类型              | 默认值 | 描述             |
| :------------- | :---------------- | :----- | :--------------- |
| columns        | `TColumn[]`       | `[]`   | 列表列配置项     |
| relationEvents | `TRelationEvents` | `[]`   | 表单关联回调配置 |

## 特别类型

### TColumn

```ts
type TColumn = {
  ...TColumnItem,
  trigger: { target: string, event: string }[]
}
```

### TRelationEvents

```ts
type TRelationEvents = Record<
  string, 
  (value: any, changeValues: any) => ({
    value?: any;
    hidden?: boolean;
    disabled?: boolean;
    readonly?: boolean;
    viewType?: 'hidden' | 'readonly' | 'disabled';
    colSpan?: number;
    rowSpan?: number;
    inputProps?: Record<string, any>;
    itemProps?: Record<string, any>;
  })
>;
```
