import {
  forwardRef,
  useImperativeHandle,
  isValidElement,
  createElement,
  cloneElement,
  Fragment,
  Children,
} from 'react';
import BaseSystem from './system-base';
import { pickProps } from './utils';

const createElements = (elements, props, fragment) => {
  if (!elements || elements.length === 0) return null;
  if (!Array.isArray(elements)) return elements;
  const content = elements.map((item) => {
    if (isValidElement(item) || typeof item !== 'function') return item;
    return createElement(item, props);
  });
  if (!fragment) return content;
  return createElement(Fragment, null, ...content);
};

class SystemReact extends BaseSystem {
  static sortPlugins = BaseSystem.sortPlugins;
  static bindSubComponent = BaseSystem.bindSubComponent;

  constructor(name, plugins) {
    super(name, plugins);
  }

  render(props) {
    const layoutContentKeys = this.layoutContentKeys;
    const collection = this.collection;

    const contentProps = { ...props, instance: this };

    const nodes = layoutContentKeys.reduce(
      (store, key) => {
        if (key === 'children') {
          store.children = createElements(collection[key], contentProps);
        } else {
          store.content[key] = createElements(collection[key], contentProps, true);
        }
        return store;
      },
      { children: [], content: {} },
    );

    const childrenRenderMode = props.childrenRenderMode;
    let renderDefaultContent;
    if (childrenRenderMode === 'all') renderDefaultContent = nodes.children || [createElement('div', null, '默认内容')];
    else if (childrenRenderMode === 'none') renderDefaultContent = [];
    else if (childrenRenderMode > -1) renderDefaultContent = [nodes.children?.[childrenRenderMode]];
    else renderDefaultContent = [nodes.children?.[0]];

    // 克隆组件传入的 children 列表
    const childrenList = Children.map(contentProps.children, (child) => {
      if (isValidElement(child)) {
        // 子节点 props 传递了对应暴露名称为 true 的属性，就替换传入 expose 中对应属性暴露的值
        return cloneElement(child, pickProps({ ...this.expose, content: nodes.children }, child.props));
      }
      return child;
    });

    return createElement(
      collection.layout || Fragment,
      // 传入所有的 props、创建的组件、根ref
      { ...contentProps, ...nodes.content, ref: collection.refs.root },
      // 先放props传入的 children 内容
      ...(childrenList || []),
      // 再放入插件收集的 children 内容
      ...renderDefaultContent,
    );
  }

  build() {
    const instance = this;

    const PluginComponent = forwardRef(function PluginComponent(props, ref) {
      // 再次初始化，清空
      instance.init(props);
      // 预处理
      instance.before(props);
      // 主方法
      instance.main(props);
      // 给ref绑定插件内声明的暴露变量
      useImperativeHandle(ref, () => instance.expose, []);

      return instance.render(props);
    });

    return PluginComponent;
  }
}

export default SystemReact;
