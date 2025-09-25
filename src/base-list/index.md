---
title: BaseList 列表
nav:
  title: 组件
  order: 2
group:
  title: display
  order: 2
toc: content
---

# BaseList 列表

此组件由多个插件构建而来

## 简单上手

<code background="var(--color-bg, #f1f1f1)" src="./demo/base" ></code>

## Table plugins

- plugin-request-none
- plugin-columns-transform
- plugin-item-selections
- plugin-layout-main
- plugin-list-table
- plugin-request-pagination

## ListOfTable plugins

- plugin-request-none
- plugin-columns-transform
- plugin-item-selections
- plugin-layout-main
- plugin-list-table
- plugin-request-pagination
- plugin-list-command
- plugin-layout-main
- plugin-search-normal
- plugin-list-normal
- plugin-list-table
- plugin-list-pagination
- plugin-button-list
- plugin-button-create
- plugin-button-refresh
- plugin-button-fullscreen
- plugin-button-setting
- plugin-popup

## plugin

插件清单

### plugin-button-create

在页面操作按钮列表自动添加一个新增按钮

| 名称          | 类型                   | 默认值 | 描述                                                                 |
| :------------ | :--------------------- | :----- | :------------------------------------------------------------------- |
| buttonEnabled | `{ create: boolean }`  | `{}`   | 手动隐藏此按钮                                                       |
| eventMap      | `{ create: function }` | `{}`   | 判断页面事件是否注册了 `create` 事件，如果注册了，就自动显示新增按钮 |

### plugin-button-export

在页面操作按钮列表自动添加一个导出按钮，支持当前页的列表数据导出为 `json`

| 名称          | 类型                   | 默认值 | 描述           |
| :------------ | :--------------------- | :----- | :------------- |
| buttonEnabled | `{ export: boolean }`  | `{}`   | 手动隐藏此按钮 |
| exportOption  | `{ fileName: string }` | `{}`   | 导出文件的名称 |

### plugin-button-fullscreen

在页面操作按钮列表自动添加一个全屏按钮，支持当前页面进入全屏状态

| 名称                | 类型                      | 默认值      | 描述             |
| :------------------ | :------------------------ | :---------- | :--------------- |
| buttonEnabled       | `{ fullScreen: boolean }` | `{}`        | 手动隐藏此按钮   |
| fullScreenClassName | `string`                  | `undefined` | 全屏容器样式类名 |

### plugin-button-help <Badge type="error">未完成</Badge>

在页面操作按钮列表自动添加一个帮助按钮，支持打开当前页面的用户帮助文档窗口

| 名称          | 类型                | 默认值 | 描述           |
| :------------ | :------------------ | :----- | :------------- |
| buttonEnabled | `{ help: boolean }` | `{}`   | 手动隐藏此按钮 |

### plugin-button-list

在页面布局中添加按钮列表，提供添加功能按钮的能力，如果要使用其他 `plugin-button-*` 相关插件，则必须引入此插件

| 名称         | 类型                       | 默认值      | 描述                                 |
| :----------- | :------------------------- | :---------- | :----------------------------------- |
| extraButtons | `TButtonListProps`         | `{}`        | 按钮栏组件配置                       |
| eventMap     | `Record<string, function>` | `undefined` | 按钮栏的按钮回调事件                 |
| eventData    | `Record<string, any>`      | `undefined` | 按钮栏的按钮回调事件可以获取到的数据 |

### plugin-button-refresh

在页面操作按钮列表自动添加一个刷新按钮

| 名称          | 类型                   | 默认值 | 描述           |
| :------------ | :--------------------- | :----- | :------------- |
| buttonEnabled | `{ refresh: boolean }` | `{}`   | 手动隐藏此按钮 |

### plugin-button-request-loop

在页面操作按钮列表自动添加一个启动自动刷新的按钮

| 名称          | 类型                       | 默认值 | 描述                 |
| :------------ | :------------------------- | :----- | :------------------- |
| buttonEnabled | `{ requestLoop: boolean }` | `{}`   | 手动隐藏此按钮       |
| duration      | `number`                   | `5`    | 刷新间隔时间，单位秒 |

### plugin-button-setting

在页面操作按钮列表自动添加一个用户设置按钮，用于打开当前页面的用户设置弹窗，如果没有启用用户设置功能或当前页面没有配置用户设置项，则不会显示此按钮

| 名称          | 类型                   | 默认值      | 描述                   |
| :------------ | :--------------------- | :---------- | :--------------------- |
| buttonEnabled | `{ setting: boolean }` | `{}`        | 手动隐藏此按钮         |
| namespace     | `string`               | `undefined` | 当前页面设置配置的命名 |

### plugin-button-switch-render

在页面操作按钮列表自动添加一个列表切换按钮，目前支持卡片/表格切换

| 名称          | 类型                            | 默认值 | 描述                 |
| :------------ | :------------------------------ | :----- | :------------------- |
| buttonEnabled | `{ switchRender: boolean }`     | `{}`   | 手动隐藏此按钮       |
| switchRender  | `{ defaultRenderType: string }` | `{}`   | 配置列表默认显示类型 |

### plugin-button-table-expand

在页面操作按钮列表自动添加一组列表展开按钮，控制树形数据展开部分/展开全部/折叠全部

| 名称          | 类型                       | 默认值 | 描述                                    |
| :------------ | :------------------------- | :----- | :-------------------------------------- |
| buttonEnabled | `{ tableExpand: boolean }` | `{}`   | 手动隐藏此按钮                          |
| expandable    | `TTableExpandable`         | `{}`   | antd `Table` 组件的 `expandable` 配置项 |
| rowKey        | `string`                   | `key`  | 列表唯一索引                            |

### plugin-columns-transform

用于转换列表 `columns` 配置

| 名称                   | 类型               | 默认值      | 描述                                 |
| :--------------------- | :----------------- | :---------- | :----------------------------------- |
| access                 | `TAccess`          | `undefined` | 权限配置                             |
| name                   | `string`           | `list`      | 列表过滤名称                         |
| columns                | `TColumnItem[]`    | `[]`        | 列表列配置项                         |
| columnsTransformConfig | `TUseColumns`      | `{}`        | `useColumns` 配置                    |
| actionColumn           | `TActionColumn`    | `{}`        | 操作列配置                           |
| actionButtons          | `TButtons`         | `[]`        | 操作列按钮配置                       |
| eventData              | `TEventData`       | `{}`        | 按钮或列事件回调的参数               |
| eventMap               | `TEventMap`        | `{}`        | 按钮或列事件回调方法集合             |
| showIndex              | `boolean\|'order'` | `true`      | 是否显示序号列，`order` 表示连续序号 |

### plugin-item-selections

在页面列表添加可选功能，并添加一个全选按钮

| 名称           | 类型              | 默认值      | 描述                     |
| :------------- | :---------------- | :---------- | :----------------------- |
| itemSelections | `TItemSelections` | `undefined` | 选择功能配置，有值时开启 |
| rowKey         | `string`          | `key`       | 列表唯一索引             |

### plugin-layout-empty

简单布局

| 名称          | 类型             | 默认值      | 描述                     |
| :------------ | :--------------- | :---------- | :----------------------- |
| className     | `string`         | `undefined` | 根元素样式类名           |
| renderContent | `TRenderContent` | `{}`        | 在列表额外的内容渲染配置 |

### plugin-layout-main

通用布局

| 名称          | 类型             | 默认值      | 描述                                                         |
| :------------ | :--------------- | :---------- | :----------------------------------------------------------- |
| className     | `string`         | `undefined` | 根元素样式类名                                               |
| title         | `any`            | `undefined` | 列表标题                                                     |
| renderContent | `TRenderContent` | `{}`        | 在列表额外的内容渲染配置                                     |
| layoutStyle   | `string`         | `card`      | 布局样式                                                     |
| inlineHead    | `boolean`        | `false`     | 是否将搜索区域渲染在 `title` 区域，此时 `title` 配置将不生效 |


### plugin-layout-style2

在页面操作按钮列表自动添加一个刷新按钮

| 名称          | 类型                   | 默认值 | 描述           |
| :------------ | :--------------------- | :----- | :------------- |
| buttonEnabled | `{ refresh: boolean }` | `{}`   | 手动隐藏此按钮 |


### plugin-list-normal

使用 antd `List` 渲染列表内容

| 名称       | 类型          | 默认值 | 描述                 |
| :--------- | :------------ | :----- | :------------------- |
| list       | `TListProps`  | `{}`   | antd `List` 组件配置 |
| renderList | `TRenderList` | `{}`   | 列表渲染配置         |
| rowKey     | `string`      | `key`  | 列表唯一索引         |


### plugin-list-table-selectable

使用可点击行的 `Table` 渲染列表内容

| 名称            | 类型          | 默认值      | 描述                  |
| :-------------- | :------------ | :---------- | :-------------------- |
| table           | `TTableProps` | `{}`        | antd `Table` 组件配置 |
| rowKey          | `string`      | `key`       | 列表唯一索引          |
| defaultSelected | `any`         | `undefined` | 默认选择项            |
| selected        | `any`         | `undefined` | 选择项（受控）        |
| onSelect        | `function`    | `undefined` | 选择回调事件          |


### plugin-list-command

给页面提供一个便捷的回调事件配置，可以理解为 `eventMap` 的变体

| 名称    | 类型       | 默认值 | 描述     |
| :------ | :--------- | :----- | :------- |
| command | `TCommand` | `{}`   | 命令集合 |


### plugin-list-custom-render

为组件提供一个自定义渲染的方式，使用后，组件会将数据和配置项传递给第一个子节点

| 名称     | 类型        | 默认值 | 描述                                                               |
| :------- | :---------- | :----- | :----------------------------------------------------------------- |
| children | `ReactNode` | `{}`   | 可以接收 `request` 和 `columns` 的内容渲染组件，用于自定义渲染内容 |


### plugin-list-data-viewer

使用 `vanilla-jsoneditor` 编辑器回显列表数据


### plugin-list-loadmore

在页面底部添加一个加载更多的按钮，点击后会自动请求下一页数据；需要配合 `plugin-request-loadmore` 使用

| 名称          | 类型                      | 默认值 | 描述           |
| :------------ | :------------------------ | :----- | :------------- |
| buttonEnabled | `{ loadButton: boolean }` | `{}`   | 手动隐藏此按钮 |


### plugin-list-pagination

在页面底部添加一个分页组件；需要配合 `plugin-request-pagination` 使用

| 名称       | 类型               | 默认值 | 描述                       |
| :--------- | :----------------- | :----- | :------------------------- |
| pagination | `TPaginationProps` | `{}`   | antd `Pagination` 分页配置 |


### plugin-list-scroll-height-resize <Badge type="error">Bug</Badge>

自动调整列表滚动区域的高度，使页面恰好不显示滚动条

| 名称              | 类型      | 默认值      | 描述         |
| :---------------- | :-------- | :---------- | :----------- |
| disableListScroll | `boolean` | `undefined` | 禁用调整滚动 |


### plugin-list-table-edit-row

使用编辑表格渲染数据


### plugin-list-table

使用 antd `Table` 组件渲染数据

| 名称   | 类型          | 默认值 | 描述                  |
| :----- | :------------ | :----- | :-------------------- |
| table  | `TTableProps` | `{}`   | antd `Table` 组件配置 |
| rowKey | `string`      | `key`  | 列表唯一索引          |


### plugin-list-waterfall <Badge type="error">未完成</Badge>

使用瀑布流列表渲染数据

| 名称      | 类型              | 默认值 | 描述               |
| :-------- | :---------------- | :----- | :----------------- |
| waterfall | `TWaterfallProps` | `{}`   | `Waterfall` 配置项 |


### plugin-popup

给当前页面添加弹窗管理功能

| 名称      | 类型               | 默认值      | 描述             |
| :-------- | :----------------- | :---------- | :--------------- |
| namespace | `string`           | `undefined` | 当前页面唯一命名 |
| popup     | `TPopupRegister[]` | `{}`        | 弹窗配置项       |


### plugin-request-loadmore

页面请求数据的方式使用加载更多请求

| 名称          | 类型       | 默认值      | 描述       |
| :------------ | :--------- | :---------- | :--------- |
| request.query | `function` | `undefined` | 请求方法   |
| request       | `TRequest` | `{}`        | 请求配置项 |


### plugin-request-none

页面数据直接由外部传入

| 名称  | 类型          | 默认值 | 描述               |
| :---- | :------------ | :----- | :----------------- |
| table | `TTableProps` | `{}`   | 页面数据和列表配置 |


### plugin-request-pagination

页面请求数据的方式使用分页请求

| 名称          | 类型       | 默认值      | 描述       |
| :------------ | :--------- | :---------- | :--------- |
| request.query | `function` | `undefined` | 请求方法   |
| request       | `TRequest` | `{}`        | 请求配置项 |


### plugin-request-profile

页面请求详情数据

| 名称          | 类型       | 默认值      | 描述       |
| :------------ | :--------- | :---------- | :--------- |
| request.query | `function` | `undefined` | 请求方法   |
| request       | `TRequest` | `{}`        | 请求配置项 |


### plugin-search-normal

在列表上方，添加一个搜索栏

| 名称              | 类型          | 默认值      | 描述             |
| :---------------- | :------------ | :---------- | :--------------- |
| request           | `TRequest`    | `{}`        | 默认搜索参数配置 |
| columns           | `TColumn[]`   | `{}`        | 手动隐藏此按钮   |
| column            | `number`      | `6`         | 列数             |
| search.visible    | `boolean`     | `true`      | 是否渲染搜索栏   |
| search.foldConfig | `TFoldConfig` | `undefined` | 折叠配置         |
| search.formProps  | `TFormProps`  | `{}`        | 搜索表单配置     |


### plugin-search-simple

在列表左上角，按钮栏左侧添加一个搜索栏

| 名称             | 类型         | 默认值 | 描述           |
| :--------------- | :----------- | :----- | :------------- |
| columns          | `TColumn[]`  | `[]`   | 表单配置项     |
| search.visible   | `boolean`    | `true` | 是否渲染搜索栏 |
| search.formProps | `TFormProps` | `{}`   | 搜索表单配置   |

## 特别类型

### TTableProps

查看 antd `Table` 组件

### TButtonListProps

查看 `ButtonList` 组件

### TTableExpandable

查看 antd `Table` 组件 `expandable` 配置项

### TAccess

```ts
type TAccess = string | {
  name?: string;
  handler?: (auth: any, element: any) => element | boolean;
};
```

### TUseColumns

### TActionColumn

查看 `columns/TColumnItem`

### TButtons

查看 `ButtonList` 组件 `buttons` 配置

### TEventData

```ts
type TEventData = Record<string, any>;
```

### TEventMap

```ts
type TEventMap = Record<string, function>;
```

### TItemSelections

```ts
type TItemSelections = {
  type?: 'radio';
  disabled?: (item: any) => boolean;
  defaultSelected?: any[];
  selected?: any[];
};
```

### TRenderContent

```ts
type TRenderContent = {
  place?: 'inner' | 'outer';
  direction?: 'column' | 'row' | 'column-reverse' | 'row-reverse';
  content?: ReactNode;
} | ({ header: ReactNode, toolbar: ReactNode, footer: ReactNode, content: ReactNode, body: ReactNode }) => ReactNode;
```

### TListProps

查看 antd `List` 组件

### TRenderList

```ts
type TRenderList = {
  type?: 'card';
  renderComponent?: Record<string, ReactComponent>;
  itemProps?: Record<string, any> | ({ data: any, index: number, selection: TSelection }) => Record<string, any>;
};
```

### TCommand

```ts
type TCommand = Record<string, string | function>;
```

### TPaginationProps

查看 antd `Pagination` 组件

### TWaterfallProps

查看 `Waterfall` 组件

### TPopupRegister

查看 `Popuper` 组件

### TRequest

查看 `useApi` hooks

### TFoldConfig

```ts
type TFoldConfig = {
  defaultFold?: boolean;
  size?: number;
};
```

### TFormProps

查看 `Form` 组件
