---
title: Select 选择器
nav:
  title: 组件
  order: 2
group: 
  title: input
  order: 3
toc: content
---

# Select 选择器

这个组件是对 antd Select 组件的二次封装，使用起来更方便

## 简单上手

<code src="./demo/base"></code>

## 使用请求数据渲染

会在聚焦时请求数据

<code src="./demo/query"></code>

## SelectView <sup>测试</sup>

<code src="./demo/select-view"></code>

## 更多选择器组件

<code src="./demo/more"></code>

## Select Props


| 名称       | 类型                                                 | 默认值 | 描述                                                              |
| :--------- | :--------------------------------------------------- | :----- | :---------------------------------------------------------------- |
| options    | `array<option> \| object<{groupName \| key:option}>` | `[]`   | 选项数组或对象，是对象时会将 key 的名称作为分组名渲染成分组的结构 |
| showSearch | `number\|boolean`                                    | `5`    | 是否支持搜索；如果是数值，表示选项超出后将支持搜索                |

### option

| 名称  | 类型                  | 描述     |
| :---- | :-------------------- | :------- |
| label | `string \| ReactNode` | 选项名称 |
| value | `string \| number`    | 值       |
| icon  | `string \| ReactNode` | 图标     |
| color | `string`              | 颜色     |

## setOptions Props

`setOptions` 是一个方法，它只需要一个对象参数，此时 `options` 可以为字符串类型，通过 `options={optionName}`，就可以得到配置过的选项内容
`setOptions(variable:object): void 0`

| 名称     | 类型                                    | 默认值 | 描述         |
| :------- | :-------------------------------------- | :----- | :----------- |
| variable | `object<{ optionName: array<option> }>` | `{}`   | 选项参数配置 |
