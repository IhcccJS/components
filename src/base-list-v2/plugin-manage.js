import { isArray } from '@ihccc/utils';

class PluginManage {
  static TYPE = {
    ROOT: 'roots',
    ELEMENT: 'elements',
    BUTTON: 'buttons',
    WRAPPER: 'wappers',
    METHOD: 'method',
    REQUEST: 'request',
  };

  constructor() {
    this.installed = {}; // 已经安装的插件

    this.roots = []; // 用于渲染嵌套元素，如布局等
    this.elements = []; // 用于渲染平级元素，如弹窗等
    this.buttons = []; // 用于渲染列表的功能按钮
    this.wappers = []; // 用于声明包裹组件，如上下文
    this.methods = {}; // 用于声明组件内部方法
    this.states = []; // 用于声明组件内部的
  }

  // 是否安装插件
  has(key) {
    return this.installed.hasOwnProperty(key);
  }

  uninstall(key) {
    const pluginItem = this.installed[key];
    // 删除对应的功能配置
    // if (pluginItem.root) {
    //   this.roots = this.roots.filter((item) => item !== pluginItem.root);
    // }

    // if (pluginItem.component) {
    //   this.elements = this.elements.filter(
    //     (item) => item.component !== pluginItem.component,
    //   );
    // }

    // if (pluginItem.button) {
    //   this.buttons = this.buttons.filter((item) => item !== pluginItem.button);
    // }
  }

  // 安装插件
  install(plugin) {
    if (isArray(plugin)) {
      plugin.forEach((item) => this.install(item));
      return;
    }

    const pluginItem = plugin({ TYPE: PluginManage.TYPE, plugins: this });
    this.installed[pluginItem.key] = pluginItem;

    if (pluginItem.root) {
      this.roots.push(pluginItem.root);
    }

    if (pluginItem.component) {
      this.elements.push({
        component: pluginItem.component,
        propName: pluginItem.propName,
      });
    }

    if (pluginItem.button) {
      this.buttons = this.buttons.concat(pluginItem.button);
    }

    if (pluginItem.wapper) {
      this.wappers.push(pluginItem.wapper);
    }

    if (pluginItem.methods) {
      Object.assign(this.methods, pluginItem.methods);
    }

    if (pluginItem.state) {
      this.states = this.states.concat(pluginItem.state);
    }
  }

  initialize() {
    const initialState = {};
    const eventMap = {};

    _plugin_.states.forEach((state) => {
      if (initialState[state.key] != void 0) return;
      initialState[state.key] = state.value;
    });

    Object.entries(_plugin_.methods).forEach(([key, method]) => {
      if (eventMap[key] != void 0) return;
      eventMap[key] = method.bind(null, eventData);
    });

    return { initialState, eventMap };
  }

  createElements(props) {
    const elements = {};

    this.elements.forEach(({ component, propName }) => {
      if (elements[propName] != void 0) return;
      elements[propName] = React.createElement(component, props);
    });

    return elements;
  }

  createRoots(props) {
    return _plugin_.roots.reduce((children, component) => {
      // 后面的元素会包裹前面的元素
      return React.createElement(component, props, children);
    }, null);
  }
}

export default PluginManage;
