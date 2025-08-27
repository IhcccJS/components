

#  createComponent

collection

运行前初始化，最先执行；核心代码会将插件列表内所有 collection 先执行，创建收集数据的容器

before

运行前 hook，用于返回预设的配置、选项；可以获取到 props，但是获取不到其他插件的返回实例

main

主 hook，用于返回实例数据；可以获取到 props，以及已经运行的插件的返回实例

## demo

```jsx | pure
const Plugin = {
  /** 名称，用于插件索引其他插件 */
  name: 'demoPlugin',
  /** 优先级，影响插件执行顺序 */
  priority: 'COLLECTING',
  /** 必须引用的插件，自动导入 */
  required: [''],
  /** 非必须引用插件，自动导入 */
  imports: [''],
  /** 对外暴露数据声明，需要暴露的数据，必须在 useMain 中 return 出来 */
  expose: [{ name: '', source: '' }],
  /** 共享的上下文组件 */
  context: {},
  /** 挂载到组件上的组件或变量 */
  subComponent: {},
  /** 定义容器 */
  collection() {
    return {};
  },
  /** 渲染组件，等同于 useMain return { collectionKey: () => {} } */
  content: { collectionKey: () => {} },
  /** 配置项 react/hook，需要的配置项，return 出来 */
  useBefore() {
    return {};
  },
  /** 主方法 react/hook */
  useMain() {
    return {};
  },
};
```

### priority
```js
const PRIORITY = {
  /** TOP: 0 */
  TOP: 0,
  /** TOOL: 100 */
  TOOL: 100,
  /** LAYOUT: 200 */
  LAYOUT: 200,
  /** COLLECTING: 300 */
  COLLECTING: 300,
  /** CONTENT: 400 */
  CONTENT: 400,
  /** LOW: 10000 */
  LOW: 10000,
};
```

存在以下结构

```ts
type plugin = {
  // 插件名称
  name: string,
  // 插件优先级
  priority: number,
  // 此插件必要依赖的其他插件的名称列表
  required: string[]
}

const pluginList: plugin[] = [];
```

对结构 pluginList 按下列条件进行排序

1. 首先按照 priority 的数值进行排序；从小到大，数值越大，优先级越低
2. 按照声明的 required 列表进行排序，required 声明 pluginList 内必须包含的插件, 并移到声明插件的后面，如果不存在此插件，则报错
