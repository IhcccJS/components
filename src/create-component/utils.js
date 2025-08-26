export const PRIORITY = {
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

export function getSortIndex(plugin) {
  if (typeof plugin.priority === 'number') return plugin.priority;
  if (typeof plugin.priority === 'string') return PRIORITY[plugin.priority];
  if (typeof plugin.priority === 'function') return plugin.priority(PRIORITY);
  return PRIORITY.LOW;
}

export function checkRequired(plugins) {
  const listNames = plugins.reduce((s, i) => ((s[i.name] = true), s), {});

  for (const plugin of plugins) {
    if (!plugin.required) continue;
    for (const name of plugin.required) {
      if (!listNames[name]) return { name, plugin };
    }
  }

  return false;
}

export function sortPlugins(plugins) {
  const list = plugins.filter((item) => !!item).sort((p1, p2) => getSortIndex(p1) - getSortIndex(p2));

  let sortByRequired = false;
  const waitIndexMap = {};
  const requiredMap = {};
  const doneList = [];

  const error = checkRequired(list);

  if (!!error) throw { required: error.name, plugin: error.plugin, error: '不存在的 required 引用！' };

  const maxLoop = list.length ** 2;
  let i = 0;
  while (list.length > 0 && i < maxLoop) {
    i += 1;
    const plugin = list.shift();

    // 如果声明了，并且有未注入的插件，延后插入
    if (!!plugin.required) {
      if (plugin.required.some((name) => !requiredMap[name])) {
        if (sortByRequired === false) sortByRequired = true;
        if (!waitIndexMap[plugin.name]) waitIndexMap[plugin.name] = 0;
        const waitIndex = Math.min(waitIndexMap[plugin.name] + 1, list.length);
        list.splice(waitIndex, 0, plugin);
        waitIndexMap[plugin.name] = waitIndex;
        continue;
      }
    }

    doneList.push(plugin);
    requiredMap[plugin.name] = true;
  }

  if (doneList.length < plugins.length) {
    throw { list, error: '可能存在循环 required 引用！' };
  }

  if (sortByRequired) {
    console.log(
      '✨ 推荐的排序，你可以按照此序列，优化插件列表：',
      doneList.map((i) => i.name),
    );
  }

  return doneList;
}

export function pickProps(props, select) {
  const newProps = {};
  for (const key in props) {
    if (select[key] === true) newProps[key] = props[key];
  }
  return newProps;
}

export function bindSubComponent(comp, plugins) {
  for (let index = 0; index < plugins.length; index++) {
    if (!!plugins[index].subComponent) {
      Object.entries(plugins[index].subComponent).forEach(([key, component]) => {
        comp[key] = component;
      });
    }
  }
}
