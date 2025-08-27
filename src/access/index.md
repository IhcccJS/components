---
title: Access
nav:
  title: 组件
  order: 2
group:
  title: display
  order: 2
toc: content
---

# Access 权限

## 简单上手

<code src="./demo/base"></code>

## 动态修改

<code src="./demo/role"></code>

## Access Props

| 名称 | 类型     | 默认值      | 描述       |
| :--- | :------- | :---------- | :--------- |
| akey | `string` | `undefined` | 唯一的索引 |


## Access.System Props

| 名称         | 类型             | 默认值      | 描述               |
| :----------- | :--------------- | :---------- | :----------------- |
| getAccessKey | `(el) => string` | `-`         | 设置元素的校验值   |
| data         | `string`         | `undefined` | 校验数据           |
| handlers     | `object`         | `undefined` | 处理方法           |
| children     | `ReactNode`      | `undefined` | 需要控制权限的内容 |


## Access.useAccess

| 名称     | 类型      | 默认值      | 描述     |
| :------- | :-------- | :---------- | :------- |
| disabled | `boolean` | `undefined` | 是否禁用 |
| data     | `[]`      | `undefined` | 校验数据 |
| key      | `string`  | `undefined` | 权限值   |
| name     | `object`  | `undefined` | 处理方法 |
| keyName  | `object`  | `undefined` | 处理方法 |
| handler  | `object`  | `undefined` | 处理方法 |
