---
title: 列表 BaseList
nav:
  title: 组件
  order: 2
group: 
  title: display
  order: 2
toc: content

apiHeader: false
---

# BaseList 列表

BaseList 是 @ihccc/components 的主要组件，你可以用这个组件快速构建 CURD 管理页面。

- ✅ BaseList 列表组件
- ✅ useList 处理列表内的请求
- ✅ Searcher 搜索框组件
- ✅ Updater 表单弹出层
- ✅ Profiler 详情内容弹出层

## 普通列表

<code src="./demo/baseList" background="#f5f5f5"></code>

## BaseList Props

`BaseList` 下包含了 `useList` hooks，和 `Searcher`，`Updater`，`Profiler` 三个组件。

| 名称              | 类型                  | 默认值                                                | 描述                                                                                                                                                              |
| :---------------- | :-------------------- | :---------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| title             | `string`              | `undefined`                                           | 列表标题，显示在功能按钮栏                                                                                                                                        |
| showIndex         | `boolean\|string`     | `undefined`                                           | 是否在 `columns` 添加配置显示列表序号，如果是 `order` 则显示连续序号                                                                                              |
| extraButtons      | `array<object>`       | `undefined`                                           | 额外的功能按钮，同 `ButtonList` 的 `buttons` 配置，如果存在 `key` 和内置按钮一样的时候，会合并配置，内置按钮有 `refresh \| fullScreen \| columnsEditor \| create` |
| extraButtonConfig | `object`              | `undefined`                                           | 功能按钮配置，同 `ButtonList` 内属性，除了 `buttons` 配置                                                                                                         |
| columnsEditor     | `columnsEditorConfig` | `undefined`                                           | 有配置时，开启数据显示设置功能                                                                                                                                    |
| searcher          | `ReactNode`           | `undefined`                                           | 搜索栏组件，需要配合 `BaseList.Searcher` 组件                                                                                                                     |
| searchRender      | `() => ReactNode`     | `undefined`                                           | 渲染搜索栏组件方法                                                                                                                                                |
| behaviors         | `object`              | `undefined`                                           | 弹出层的行为定义，key 指定行为名称，value 指定弹出层在`popups`内的 key                                                                                            |
| popups            | `array<ReactNode>`    | `undefined`                                           | 弹出层数组，可以直接使用 Ant 的 `Modal` 和 `Drawer` 定义，也可以使用 `BaseList` 下的弹出层                                                                        |
| wrapper           | `ReactComponent`      | `DefaultWrapper`                                      | 列表的包裹组件，作为列表的容器                                                                                                                                    |
| autoRequest       | `boolean`             | `true`                                                | 是否在组件挂载时执行 `action.query` 进行请求数据                                                                                                                  |
| state             | `object<function>`    | `undefined`                                           | 约定的列表数据等状态值, `{ loading: { query, create, update, remove }, data: { page, list, total } }`                                                             |
| action            | `object<function>`    | `{}`                                                  | 约定的列表请求事件，`{ query: 列表请求, create：新增请求, update：更新请求, remove：删除请求 }`                                                                   |
| eventEmitter      | `eventEmitter`        | `undefined`                                           | 使用 utils 下的 [eventEmitter](/utils/event-emitter) 方法生成的事件处理器，用于调用列表内的事件                                                                   |
| children          | `ReactNode`           | `<Table scroll={{ x: 'max-content' }} rowKey="id" />` | 渲染列表的组件                                                                                                                                                    |

`eventEmitter` 事件处理器可以调用的列表事件如下：

- `'fullScreen'` ：切换全屏
- `'page'` ：跳转页面，参数是 `{ pageNumber, pageSize }`
- `'search'` ：查询列表，参数是接口查询参数
- `'submit'` ：新增编辑，提交事件，参数分别是提交的数据和 `action` 内部方法的名称，即 `services` 内定义的请求方法名称
- `'popup'` ：打开弹窗事件，参数是弹窗组件的属性值，包含 `behaviors` 内定义的行为名称
- `'popup.close'` ：关闭弹窗事件，参数是 `behaviors` 行为名称
- `'action/xxx'` ： `action` 内请求事件，参数是请求参数

```js
const ee = eventEmitter();

// 切换全屏
ee.emit('fullScreen');

// 跳转页面
ee.emit('page', { pageNumber: 2 });

// 打开 create 弹窗
ee.emit('popup', { type: 'create' });

// 关闭 update 弹窗
ee.emit('popup.close', 'update');

// 执行 action.bind 请求
ee.emit('action/bind', { id: 'xxx', vid: 'aaa' });
```

由于默认使用了 `Table` 组件，所以额外任意的 `props` 会继续向下传递，你可以使用自定义的渲染列表的组件，所以 `columns` 在默认情况下才必须使用，自定义的时候视情况而定

> 更多配置 参考 [Antd Table](https://ant.design/components/table-cn/)

#### columnsEditorConfig 

除了以下配置，还可以传入弹窗 `<Modal />` 的配置

| 名称     | 类型      | 默认值      | 描述                             |
| :------- | :-------- | :---------- | :------------------------------- |
| saveName | `string`  | `undefined` | 缓存的名称，默认是当前页面的 url |
| column   | `number`  | `6`         | 每行显示数量                     |
| canAlign | `boolean` | `true`      | 是否可以设置对齐                 |
| canFixed | `boolean` | `true`      | 是否可以设置固定                 |
| canSort  | `boolean` | `true`      | 是否可以拖拽排序                 |

### BaseList columns 的列配置

如 `Antd Table` 组件一样，`columns` 是一个配置列的数组，但是在 `BaseList` 内 `columns` 进行了扩充。它可以在 `CommonForm` 表单中使用，也可以在 `Detail` 组件中使用，另外如果你使用了新的配置，然后又想在 `Antd` 组件中正常使用，可以通过 [columnsHelper](/utils/columnsHelper) 方法进行转换等操作。因此添加了一些额外的配置属性，如下：

| 名称           | 类型                               | 默认值      | 描述                                                                                                                                                                                                                                                                                                        |
| :------------- | :--------------------------------- | :---------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| visible        | `string\|array\|function`          | `undefined` | 用来控制列在什么内容里显示，它接收一个 `type` 可以用来区分显示位置，并且需要你返回 `boolean` 值用来控制显示。当在 `CommonForm` 渲染时，`type` 值是父级弹出层的 `type` 属性，或者是 `CommonForm` 的 `name` 属性；当在 `BaseList` 内渲染时，它恒等于 `'list'`；当在 `Detail` 内渲染时，它恒等于 `'profile'`； |
| itemProps      | `object`                           | `undefined` | `CommonForm` 组件内有效，等于 `CommonForm.Item` 组件的 `props`                                                                                                                                                                                                                                              |
| inputNode      | `string\|array\|object\|ReactNode` | `undefined` | 输入组件                                                                                                                                                                                                                                                                                                    |
| inputNodeProps | `object`                           | `undefined` | 输入组件的 `props`                                                                                                                                                                                                                                                                                          |
| profileProps   | `object`                           | `undefined` | 详情列配置参数                                                                                                                                                                                                                                                                                              |
| profileRender  | `string\|array\|object\|function`  | `undefined` | `Detail` 自定义渲染，默认使用了列表的 `render`，如果和列表的渲染有区别，可以使用此方法替换 `render` 渲染。其他用法同 `render`                                                                                                                                                                               |
| colProps       | `object`                           | `undefined` | `Detail` 列配置，属性参考 `CssGrid.Column`                                                                                                                                                                                                                                                                  |
| width          | `string\|number`                   | `undefined` | 现在约定了固定宽度，方便对齐列表，有 `{ min: 50, xs: 60, sm: 80, md: 120, lg: 180, xl: 260, xxl: 360, max: 480 }`                                                                                                                                                                                           |
| render         | `string\|array\|object\|function`  | `undefined` | `render` 通过修改，可以接受全局配置的渲染列表的名称，或者是数组 `[方法名称, 方法参数]`，或者是一个对象 `{ type：方法名称, params：方法参数 }`，当是对象时，你需要在全局配置的是一个高阶的渲染方法                                                                                                           |

BaseList.render 全局配置用法

```jsx | pure
import { BaseList, Text, Select } from '@ihccc/components';

// global
BaseList.render.set({
  text: (val) => <Text label={val} />,
  tip: (max) => (val) => <Text label={val}><Text.Tip max={max}></Text>,
  formater: (options) => (val) => <Select.Formater options={options} value={val} />
});

// columns
[
  ...
  {
    ...,
    render: 'text'
  },
  {
    ...,
    render: ['tip', 20]
  },
  {
    ...,
    render: { type: 'tip', params: 20 }
  },
  {
    ...,
    render: { type: 'formater', params: [{ label: 'abc', value: '0' }, { label: 'bababa', value: '1' }] }
  },
  ...
]

```

### BaseList.useList

`useList` 是一个用于处理请求逻辑的 hooks，使用它搭配 BaseList 可以省很多处理请求的事情，他接受一些参数配置，并返回列表的数据 `state`，和其它的封装过的请求方法 `action`。

#### BaseList.useList params

| 名称          | 类型               | 默认值                            | 描述                                                                                                                              |
| :------------ | :----------------- | :-------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------- |
| services      | `object`           | `{}`                              | 请求接口，默认仅处理 `{ query: 列表请求, create：新增请求, update：更新请求, remove：删除请求 }`                                  |
| defaultPage   | `object`           | `{ pageNumber: 1, pageSize: 10 }` | 默认请求列表页码参数                                                                                                              |
| defaultParams | `object`           | `undefined`                       | 默认请求列表参数                                                                                                                  |
| paramsFilter  | `object\|function` | `undefined`                       | 参数处理，以 `services` 内方法的名称作为 key 的函数对象，可以对任意的请求参数单独处理。它接收提交的数据，并需要你返回处理后的数据 |
| validator     | `object\|function` | `undefined`                       | 请求结果成功和失败的校验，它接收请求成功的数据，并需要你返回一个布尔值，表示是否成功                                              |
| onComplete    | `object\|function` | `undefined`                       | 请求结束时回调                                                                                                                    |
| defineAction  | `array<object>`    | `undefined`                       | 用于自定义 `services` 没有的处理方法                                                                                              |

defineAction 结构

| 名称    | 类型       | 描述                                                                                                                                          |
| :------ | :--------- | :-------------------------------------------------------------------------------------------------------------------------------------------- |
| type    | `string`   | `services` 内的请求名称                                                                                                                       |
| params  | `string`   | 参数来源，可选 `params: 搜索表单参数 \| formData: 编辑表单参数 \| arguments: 函数参数 `                                                       |
| refresh | `string`   | 请求完成，是否执行 `query` 刷新列表                                                                                                           |
| save    | `function` | 仅在 `type` 是 `query` 时有效，列表保存的数据源，它接受列表请求的结果，需要返回正确的数据，结构应该为 `{ list, total, pageNumber, pageSize }` |
| message | `function` | 需要你返回请求完成的提示信息，它接受的参数是 `pass: validator 方法结果, result: 请求结果, params: 请求参数`，返回 `false` 不提示              |

#### BaseList.useList result

| 名称   | 类型               | 默认值      | 描述             |
| :----- | :----------------- | :---------- | :--------------- |
| state  | `object`           | `undefined` | 列表数据等状态   |
| action | `object<function>` | `undefined` | 列表请求事件对象 |

### BaseList.Searcher Props

| 名称          | 类型               | 默认值                    | 描述                                                            |
| :------------ | :----------------- | :------------------------ | :-------------------------------------------------------------- |
| foldAble      | `boolean`          | `false`                   | 搜索栏是否可折叠                                                |
| defaultFold   | `boolean`          | `true`                    | 搜索栏默认折叠状态                                              |
| foldSize      | `object`           | `FOLDSIZE.middle`         | 响应式折叠个数                                                  |
| grid          | `object`           | `GRID.middle`             | 响应式配置                                                      |
| initialValues | `object\|function` | `undefined`               | 默认值，也可以设置为一个方法（异步也可以），返回默认值          |
| form          | `FormInstance`     | `undefined`               | 表单的实例，子元素的表单 `form` 实例，需要从这里传入            |
| trigger       | `ReactNode`        | `<Form.Trigger.Srarch />` | 表单提交重置按钮组件（>1.2.4）                                  |
| onSubmit      | `function`         | `undefined`               | 提交事件，`<CommonForm />` 组件的 `onFinish` 事件会被此事件覆盖 |
| children      | `ReactNode`        | `undefined`               | `<CommonForm />` 表单组件                                       |

`Searcher` 默认响应式配置为

```js
const GRID = {
  small: { xs: 1, sm: 2, md: 3, lg: 4, xl: 5, xxl: 6 },
  middle: { xs: 1, sm: 2, md: 2, lg: 3, xl: 4, xxl: 5 },
  large: { xs: 1, sm: 1, md: 2, lg: 3, xl: 4, xxl: 4 },
};

const FOLDSIZE = {
  small: { xs: 1, sm: 1, md: 2, lg: 3, xl: 4, xxl: 5 },
  middle: { xs: 1, sm: 1, md: 1, lg: 2, xl: 3, xxl: 4 },
  large: { xs: 1, sm: 1, md: 1, lg: 2, xl: 3, xxl: 3 },
};
```

### BaseList.Updater Props

| 名称             | 类型                            | 默认值      | 描述                                                                          |
| :--------------- | :------------------------------ | :---------- | :---------------------------------------------------------------------------- |
| type             | `string`                        | `undefined` | 弹出层的行为名称                                                              |
| loading          | `object`                        | `undefined` | 加载状态                                                                      |
| title            | `string\|object`                | `undefined` | 弹出层标题可以设置为一个 `type` 属性索引的对象了                              |
| mode             | `string`                        | `modal`     | 弹出层的类型，可选 `modal：弹窗，drawer：抽屉，none：没有弹层`                |
| form             | `FormInstance`                  | `undefined` | 表单的实例，子元素的表单 `form` 实例，需要从这里传入                          |
| initialValues    | `object\|function`              | `undefined` | 默认值，也可以设置为一个方法（异步也可以），返回默认值                        |
| onlyFormValue    | `boolean`                       | `undefined` | 提交数据是否仅提交表单值，如果为假，会包含 `initialValues` 全部数据           |
| steps            | `number\|array<string\|object>` | `undefined` | 分步的步数（不显示步骤条），或步骤条配置，是对象数组时，配置参考 `Steps` 组件 |
| showSubmitOnStep | `number\|boolean`               | `undefined` | 是否显示提交按钮，或者是在第 `showSubmitOnStep` 步后显示提交按钮              |
| resetButtonProps | `object`                        | `undefined` | 重置按钮配置                                                                  |
| okButtonProps    | `object`                        | `undefined` | 提交按钮配置                                                                  |
| footer           | `ReactComponent`                | `undefined` | 底部按钮栏组件                                                                |
| children         | `ReactNode`                     | `undefined` | `<CommonForm />` 等组件                                                       |
| onStep           | `function`                      | `undefined` | 步进回调事件                                                                  |
| onSubmit         | `function`                      | `undefined` | 表单提交事件                                                                  |
| onValidateFailed | `function`                      | `undefined` | 表单校验错误事件                                                              |

### BaseList.Profiler Props

| 名称          | 类型               | 默认值      | 描述                                                             |
| :------------ | :----------------- | :---------- | :--------------------------------------------------------------- |
| index         | `number`           | `undefined` | 数据索引                                                         |
| mode          | `string`           | `modal`     | 弹出层的类型，可选 `modal：弹窗，drawer：抽屉，none：没有弹层`   |
| initialValues | `object\|function` | `undefined` | 默认值，也可以设置为一个方法（异步也可以），返回默认值           |
| children      | `ReactNode`        | `undefined` | `<Detail />` 等组件，`<Detail />` 会接收父组件传递的数据值等参数 |

> Updater、Profiler 更多配置 参考
>
> - [Antd Modal](https://ant.design/components/modal-cn/)
> - [Antd Drawer](https://ant.design/components/drawer-cn/)
