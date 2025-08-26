import System from './system-react';

function create(plugins) {
  // 插件列表
  let pluginList = System.sortPlugins(plugins);

  const componentName = arguments.length > 1 ? arguments[0] : 'PluginComponent';

  const component = new System(componentName, pluginList);

  const PluginComponent = component.build();

  System.bindSubComponent(PluginComponent, pluginList);

  // 额外添加插件
  PluginComponent.use = function (addons) {
    // 在没有传值的情况下，将插件列表重置为初始状态
    // 如果有新的插件，会被合并
    pluginList = System.sortPlugins(!addons ? plugins : plugins.concat(addons));

    System.bindSubComponent(PluginComponent, pluginList);
  };

  PluginComponent.instance = component;
  PluginComponent.displayName = componentName;

  return PluginComponent;
}

export default create;
