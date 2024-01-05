---
title: 编辑表格 EditTable
nav:
  title: 组件
  order: 2
group: 
  title: input
  order: 3
toc: content
---

# EditTable 编辑表格

## 全部编辑

<code src="./demo/edit-table/demo1" background="#8c8c8c1a"></code>

## 行编辑

<code src="./demo/edit-table/demo2" background="#8c8c8c1a"></code>

## 在表单内使用

<code src="./demo/edit-table/demo3" background="#8c8c8c1a"></code>

## EditTable Props

`EditTable` 是在 `Table` 组件基础上扩展来的，以下是新增的 `props`，其余和原组件保持一致

| 名称              | 类型                              | 默认值      | 描述                                                                 |
| :---------------- | :-------------------------------- | :---------- | :------------------------------------------------------------------- |
| showIndex         | `boolean\|string`                 | `undefined` | 是否在 `columns` 添加配置显示列表序号，如果是 `order` 则显示连续序号 |
| defaultDataSource | `array`                           | []          | 默认数据                                                             |
| dataSource        | `array`                           | `undefined` | 数据                                                                 |
| onChange          | `function(newDataSource): void 0` | `undefined` | 数据保存时，回调方法                                                 |
| rowKey            | `string`                          | `id`        | 行内唯一的 `key` 名称                                                |

### EditTable columns 的列配置

如 `BaseList` 组件一样，`EditTable` 内对 `columns` 进行了扩充；

| 名称      | 类型                                          | 默认值      | 描述                                               |
| :-------- | :-------------------------------------------- | :---------- | :------------------------------------------------- |
| inputNode | `string\| ReactNode`                          | `undefined` | 与 `CommonForm` 组件不同，没有设置，此项将不可编辑 |
| editAble  | `boolean \| function(record, index): boolean` | `undefined` | 是否可编辑                                         |

### 使用 Ref 调用 EditTable 组件内方法

``` jsx | pure
const etRef = React.useRef();

<EditTable ref={etRef} />
```

`etRef.current` 上将会绑定的方法如下：

| 名称                                             | 类型                                                                         | 描述                                                                                                                          |
| :----------------------------------------------- | :--------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------- |
| addToStart                                       | `function(rowData?: object): void 0`                                         | 在第一行添加初始数据；<Badge>new</Badge> 可以传入初始数据，没有初始数据，会使用配置项内的参数 `inputNodeProps.defaultValue`   |
| addToEnd                                         | `function(rowData?: object): void 0`                                         | 在最后一行添加初始数据；<Badge>new</Badge> 可以传入初始数据，没有初始数据，会使用配置项内的参数 `inputNodeProps.defaultValue` |
| ~~copyToStart~~ <Badge type="error">废弃</Badge> | `function(rowData: object): void 0`                                          | 将指定数据，添加到第一行                                                                                                      |
| ~~copyToEnd~~ <Badge type="error">废弃</Badge>   | `function(rowData: object): void 0`                                          | 将指定数据，添加到最后一行                                                                                                    |
| edit                                             | `function(key?: boolean\|string): void 0`                                    | 将某一行设置为编辑状态；<Badge>new</Badge> 传 `true` 编辑全部                                                                 |
| ~~editAll~~ <Badge type="error">废弃</Badge>     | `function(): void 0`                                                         | 将所有行设置为编辑状态                                                                                                        |
| cancel                                           | `function(): void 0`                                                         | 取消编辑                                                                                                                      |
| save                                             | `function(): void 0`                                                         | 保存数据                                                                                                                      |
| getInput                                         | `function(index: number): void 0`                                            | 根据索引，获取当前行数据                                                                                                      |
| remove                                           | `function(index: number): void 0`                                            | 删除指定索引的行                                                                                                              |
| clear                                            | `function(): void 0`                                                         | 清空所有数据                                                                                                                  |
| setValue <Badge type="info">New</Badge>          | `function(index: number, dataIndex: string \| string[], value: any): void 0` | 修改某行某个字段数据                                                                                                          |
