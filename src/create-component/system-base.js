import { isArray, isObject } from '@wowon/utils';
import separate from '../_utils/separate';
import { sortPlugins, bindSubComponent } from './utils';

/** 抽象类，插件化组件实现类 */
class BaseSystem {
  /** 对插件进行排序 */
  static sortPlugins = sortPlugins;

  // TODO 也要绑定上下文列表
  /** 挂载组件子元素、上下文列表 */
  static bindSubComponent = bindSubComponent;

  constructor(name, plugins) {
    /** 组件名称 */
    this.name = name;
    /** 安装的插件列表 */
    this.plugins = plugins;
    /** 安装的插件 */
    this.pluginInstalled = plugins.reduce((store, plugin) => {
      store[plugin.name] = true;
      return store;
    }, {});
    /** 插件实例列表，插件运行后的结果 */
    this.pluginImpls = new Map();
    /** 渲染内容的容器列表，类似于插槽 */
    this.collection = { refs: {} };
    /** 插件声明的根容器名称列表 */
    this.layoutContentKeys = [];
    /** 上下文列表 */
    this.context = {};
    /** 插件扩展的 props 列表 */
    this.props = plugins.reduce(
      (store, plugin) => {
        const props = plugin.props || plugin.extendProps;
        if (isArray(props)) {
          // 支持数组定义、方便 react 组件逻辑，无需校验
          return props.reduce((s, p) => ((s[p] = null), s), store);
        } else if (isObject(props)) {
          // 支持对象定义、主要方便 Vue 组件逻辑
          Object.assign(store, props);
        }
        return store;
      },
      { childrenRenderMode: null },
    );
    /** 每个插件扩展的 props 列表 */
    this.extendProps = {};
    /** 未在扩展声明内的 props 列表 */
    this.sourceProps = {};
    /** 对组件外暴露的内部变量列表 */
    this.expose = {};
  }

  /** 是否安装插件 */
  hasPlugin(name) {
    return this.pluginInstalled[name];
  }

  /** 获取插件实例 */
  getPlugin(name) {
    return this.pluginImpls.get(name);
  }

  /** 获取插件支持的上下文 */
  getContext(name) {
    return this.context[name];
  }

  /** 获取所有插件声明的 props */
  getExtendProps() {
    return this.extendProps;
  }

  /** 获取未声明的 props */
  getSourceProps() {
    return this.sourceProps;
  }

  /** 根据必选配置获取插件实例 */
  _getPluginRequired(required) {
    if (!required || required.length === 0) return {};
    return required.reduce((store, name) => ((store[name] = this.pluginImpls.get(name)), store), {});
  }

  /** 收集渲染内容 */
  _collection(list = {}) {
    for (const key in list) {
      const store = this.collection[key];
      const content = list[key];
      if (store === void 0 || !content) continue;
      // 对不同的容器定义，进行不同的合并操作
      if (isArray(store)) {
        this.collection[key] = store.concat(content);
      } else if (isObject(store)) {
        this.collection[key] = Object.assign(store, content);
      } else {
        this.collection[key] = content;
      }
    }
  }

  /** 初始化系统，收集插件定义的容器、上下文、默认的 content */
  init() {
    this.layoutContentKeys = [];

    for (let plugin of this.plugins) {
      if (!!plugin.collection) {
        const collectionStore = plugin.collection();
        const elementKeys = plugin.elementKeys || [];

        // 如果定义容器名称包含 layout，则为布局插件
        // 布局插件定义的所有容器需要在后续单独处理
        if (collectionStore.layout !== void 0) {
          for (const name in collectionStore) {
            // 布局接收的容器名称放入 layoutContentKeys
            if (name !== 'layout' && elementKeys.indexOf(name) > -1) this.layoutContentKeys.push(name);
          }
        }

        Object.assign(this.collection, collectionStore);
      }
    }

    for (let plugin of this.plugins) {
      // 收集默认内容元素
      if (!!plugin.content) this._collection(plugin.content);

      // 收集定义的上下文
      if (!!plugin.context) Object.assign(this.context, plugin.context);

      // const extProps = plugin.props || plugin.extendProps;
      // if (!!extProps) {
      //   this.extPropKeys = extProps.reduce((ext, key) => {
      //     return (ext[key] = true), ext;
      //   }, this.extPropKeys);
      // }
    }

    // 如果没有插件定义容器，默认设置 children 为根容器
    if (this.layoutContentKeys.length === 0) {
      this.layoutContentKeys.push('children');
      this.collection['children'] = [];
    }
  }

  /** 插件系统运行 */
  before(...args) {
    const partProps = separate(args[0], this.props);
    this.extendProps = partProps[0];
    this.sourceProps = partProps[1];
    for (let plugin of this.plugins) {
      const beforeFn = plugin.before || plugin.useBefore;
      if (!beforeFn) continue;
      // 调用 useBefore 传入的是 extendProps
      const preset = beforeFn(this, ...args);
      this._collection(preset);
    }
  }

  /** 插件件主逻辑 */
  main(...args) {
    for (let plugin of this.plugins) {
      const mainFn = plugin.main || plugin.useMain;

      if (!mainFn) continue;

      const required = this._getPluginRequired(plugin.required);

      // 调用 main 传入的是 extendProps 和 required
      const impl = mainFn(this, { ...args[0], ...this.extendProps, ...required });

      if (!impl) continue;

      this.pluginImpls.set(plugin.name, impl);

      this._collection(impl);

      // console.log('impl::', impl, this.collection);

      if (isArray(plugin.expose)) {
        plugin.expose.forEach((item) => {
          this.expose[item.name] = impl[item.source];
        });
      }
    }
  }

  /** 组件系统渲染 */
  render() {}

  /** 抽象方法：创建组件 */
  build() {}
}

export default BaseSystem;
