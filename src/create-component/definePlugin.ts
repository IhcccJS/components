import type TSystem from './system-base';

type TPriority = {
  /** TOP: 0 */
  TOP: 0;
  /** TOOL: 100 */
  TOOL: 100;
  /** LAYOUT: 200 */
  LAYOUT: 200;
  /** COLLECTING: 300 */
  COLLECTING: 300;
  /** CONTENT: 400 */
  CONTENT: 400;
  /** LOW: 10000 */
  LOW: 10000;
};

type TPlugin<T> = {
  /** 名称，用于插件索引其他插件 */
  name?: string;
  /** 优先级，影响插件执行顺序 */
  priority?: keyof TPriority | ((priority: TPriority) => keyof TPriority);
  /** 必须引用的插件，自动导入 */
  required?: string[];
  /** 对外暴露数据声明，需要暴露的数据，必须在 useMain 中 return 出来 */
  expose?: { name: string; source: string }[];
  /** 挂载到组件上的组件或变量 */
  subComponent?: Record<string, any>;
  /** 共享的上下文组件 */
  context?: Record<string, any>;
  /** 声明插件扩展支持的 props */
  props?: T;
  /**
   * 声明插件支持的 props
   * @deprecated 使用 props 替代
   */
  extendProps?: Partial<T>;
  /** 定义容器，返回一个定义容器名称的对象，容器可以是 null/[]/{} */
  collection?: () => Record<string, any>;
  /** 布局插件的 element 容器名称列表，声明的容器名称，将会自动创建组件，并传递给布局组件 */
  elementKeys?: string[];
  /** 渲染组件，等同于 main return { collectionKey: () => {} } */
  content?: Record<string, any>;
  /**
   * - 预处理 hook，return 的内容可以被收集
   * - 在所有插件的 main 前执行
   * @deprecated 使用 before 替代
   */
  useBefore?: (instance: TSystem, props: T) => Record<string, any>;
  /**
   * - 预处理 hook，return 的内容可以被收集
   * - 在所有插件的 main 前执行
   */
  before?: (instance: TSystem, props: T) => Record<string, any>;
  /**
   * - 主方法 hook，return 的内容可以被收集、暴露、引用
   * - 在所有插件的 before 后执行
   * @deprecated 使用 main 替代
   */
  useMain?: (instance: TSystem, props: T) => Record<string, any>;
  /**
   * - 主方法 hook，return 的内容可以被收集、暴露、引用
   * - 在所有插件的 before 后执行
   */
  main?: (instance: TSystem, props: T) => Record<string, any>;
};

function definePlugin(plugin: TPlugin<Record<string, any>>): TPlugin<Record<string, any>> {
  return plugin;
}

export { TSystem, TPriority, TPlugin };

export default definePlugin;
