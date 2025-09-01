---
title: 按钮组 ButtonList
nav:
  title: 组件
  order: 2
group:
  title: display
  order: 2
toc: content
---

# ButtonList 按钮组

用于渲染页面功能按钮列表，表格操作栏按钮，弹窗底部按钮列表等

## 简单上手

<code src="./demo/base"></code>

## Dropdown

<code src="./demo/dropdown"></code>

## ButtonList Props

| 名称           | 类型                                         | 默认值      | 描述                                                                                                                  |
| :------------- | :------------------------------------------- | :---------- | :-------------------------------------------------------------------------------------------------------------------- |
| access         | [`TAccess`](#特别类型)                       | `undefined` | 权限配置，默认的 `handler` 为 `buttonList`                                                                            |
| type           | `string`                                     | `undefined` | 默认按钮类型                                                                                                          |
| space          | `string`                                     | `undefined` | 按钮间隔类型，可选 `divider \| empty \| full \| none`；不设置时，`a` 按钮自动应用 `divider`，其他类型自动应用 `empty` |
| inline         | `boolean`                                    | `undefined` | 设置为行内元素                                                                                                        |
| wrap           | `boolean`                                    | `undefined` | 是否允许换行                                                                                                          |
| reverse        | `boolean`                                    | `undefined` | 是否倒置按钮顺序                                                                                                      |
| layout         | `string`                                     | `undefined` | 按钮布局，可选 `start \| center \| end \| around \| between \| evenly`，不会影响按钮合并分组和下拉分组的渲染          |
| data           | `any`                                        | `undefined` | 按钮响应事件可以接收到的参数                                                                                          |
| buttons        | [`buttonItem[]`](#特别类型)                  | `[]`        | 按钮配置列表                                                                                                          |
| baseProps      | [`propsObject`](#特别类型)                   | `undefined` | 默认的组件参数                                                                                                        |
| sortRenderKeys | `array\|object`                              | `undefined` | 设置按钮排序，优先级更高                                                                                              |
| render         | `function(renderDom, data, buttonList): any` | `undefined` | 自定义渲染按钮列表                                                                                                    |
| eventMap       | `{ [eventKey]: function }`                   | `undefined` | 按钮列表响应的事件列表，如果在这里定义了事件，按钮的 onClick 只需要指定 `eventKey` 即可                               |

### buttonItem

| 名称               | 类型                                                                   | 默认值      | 描述                                                                                                                     |
| :----------------- | :--------------------------------------------------------------------- | :---------- | :----------------------------------------------------------------------------------------------------------------------- |
| key **`Required`** | `string`                                                               | `undefined` | 按钮的唯一键                                                                                                             |
| preset             | `string`                                                               | `undefined` | 预设按钮类型名称                                                                                                         |
| type               | `string`                                                               | `undefined` | 按钮类型，内置可选 `a \| button`                                                                                         |
| space              | `boolean`                                                              | `undefined` | 设置与下一个按钮间的间隔样式，可选 `divider \| empty \| full \| none`                                                    |
| group              | `string`                                                               | `undefined` | 合并分组的名称，仅在 `button` 模式下生效，一个组件可以设置多个不同的合并分组，分组将会渲染在第一个设置分组的按钮位置     |
| dropdown           | `string`                                                               | `undefined` | 下拉分组的名称，一个组件可以设置多个不同的下拉分组，分组将会渲染在第一个设置分组的按钮位置，第一个分组按钮将作为触发按钮 |
| tip                | `string \| object \| (data: any) => (string \| object)`                | `undefined` | 配置 `Tooltip` 组件提示参数                                                                                              |
| confirm            | `object \| (data: any) => object`                                      | `undefined` | 配置 `Popconfirm` 组件提示参数                                                                                           |
| props              | `object \| (data: any) => object`                                      | `undefined` | 配置 `type` 指定的按钮组件参数                                                                                           |
| hidden             | `boolean \| (data: any) => string \| boolean`                          | `undefined` | 按钮是否隐藏                                                                                                             |
| onClick            | `eventKey \| (data: any, event: ReactDomEvent) => any`                 | `undefined` | 按钮点击回调事件                                                                                                         |
| onConfirm          | `eventKey \| (data: any, event: ReactDomEvent) => any`                 | `undefined` | `Popconfirm` 确认回调事件                                                                                                |
| onSwitch           | `eventKey \| (data: any, value: boolean, event: ReactDomEvent) => any` | `undefined` | `Switch` 组件点击回调事件                                                                                                |
| render             | `(data: any, buttonProps: any, button: ReactNode) => any`              | `undefined` | 自定义渲染                                                                                                               |
| sort               | `number`                                                               | `undefined` | 排序值                                                                                                                   |

### 特别类型

TAccess

```ts
type TAccess = string | {
  name?: string,
  handler?: string | (authority, buttonItem) => boolean;
}
```

propsObject

内置组件名称有：`a`，`button`，`switch`，`tip`，`confirm`，`dropdown`，各自配置对应的 antd 内的组件参数

```ts
type propsObject = {
  [componentName: string]?: object;
}
```
