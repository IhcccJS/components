---
title: Popuper 弹窗管理
nav:
  title: 组件
  order: 2
group: 
  title: display
  order: 2
toc: content

apiHeader: false
---

# Popuper 弹窗管理

通过将弹窗内容渲染在页面外层，来实现弹窗的跨页面控制。

## 简单上手

<code src="./demo/base" transform></code>

## Popuper.System Props

全局容器

| 名称         | 类型                         | 默认值      | 描述               |
| :----------- | :--------------------------- | :---------- | :----------------- |
| defaultType  | `string`                     | `undefined` | 默认使用的弹窗容器 |
| max          | `number`                     | `undefined` | 最大打开弹窗数     |
| container    | `{ [type]: ReactComponent }` | `undefined` | 容器集合           |
| openPosition | `number`                     | `undefined` | 弹窗打开位置       |
| openOffset   | `number`                     | `undefined` | 弹窗之间打开间隙   |
| children     | `ReactNode`                  | `undefined` | 页面内容           |

## Popuper.usePopuper Props

定义弹窗 hooks

| 名称      | 类型             | 默认值      | 描述         |
| :-------- | :--------------- | :---------- | :----------- |
| namespace | `string`         | `undefined` | 命名空间     |
| items     | `TItemsConfig[]` | `undefined` | 弹窗内容配置 |

TItemsConfig

| 名称            | 类型             | 默认值      | 描述                           |
| :-------------- | :--------------- | :---------- | :----------------------------- |
| name            | `string`         | `undefined` | 弹窗名称                       |
| type            | `string`         | `undefined` | 弹窗组件类型                   |
| content         | `ReactComponent` | `undefined` | 弹窗内容组件                   |
| keep            | `boolean`        | `undefined` | `namespace` 切换不会被注销     |
| preload         | `boolean`        | `undefined` | 是否打开弹窗之前就创建内容     |
| renderToCurrent | `boolean`        | `undefined` | 是否在当前组件渲染弹窗         |
| props           | `object`         | `undefined` | 弹窗参数                       |
| transfer        | `string[]`       | `undefined` | `props` 内向内容组件传递的参数 |
| taskData        | `object`         | `undefined` | 任务栏相关参数                 |
| repeat          | `repeatConfig`   | `undefined` | 弹窗可以重复打开               |

type="popup" props

| 名称       | 类型      | 默认值      | 描述                         |
| :--------- | :-------- | :---------- | :--------------------------- |
| dragAble   | `boolean` | `undefined` | 是否允许拖拽                 |
| cancelMask | `boolean` | `undefined` | 是否允许透过遮罩点击页面元素 |

taskData

| 名称    | 类型      | 默认值      | 描述     |
| :------ | :-------- | :---------- | :------- |
| title   | `string`  | `undefined` | 标题     |
| icon    | `any`     | `undefined` | 图标     |
| visible | `boolean` | `undefined` | 是否显示 |

## Popuper.usePopup Props

| 名称     | 类型     | 默认值      | 描述               |
| :------- | :------- | :---------- | :----------------- |
| popupRef | `string` | `undefined` | 默认使用的弹窗容器 |
