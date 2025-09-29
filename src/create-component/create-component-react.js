import System from './system-react';

function create() {
  const componentName = arguments.length > 1 ? arguments[0] : 'PluginComponent';
  const plugins = arguments.length > 1 ? arguments[1] : arguments[0];

  // FIXME 多个组件内部会共用一个 System 实例，从而导致隐患问题
  function build(addons) {
    const pluginList = System.sortPlugins(!addons ? plugins : plugins.concat(addons));
    const component = new System(componentName, pluginList);
    if (!!addons) component.use(addons);
    const PluginComponent = component.build();
    System.bindSubComponent(PluginComponent, pluginList);
    PluginComponent.instance = component;
    PluginComponent.displayName = componentName;
    return PluginComponent;
  }

  // 插件列表
  const PluginComponent = build();
  // 额外添加插件
  PluginComponent.use = build;

  return PluginComponent;
}

export default create;
