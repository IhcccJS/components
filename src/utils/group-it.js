const defaultConfig = {
  defaultName: 'default',
};

function groupIt(list, config) {
  if (!Array.isArray(list)) return {};
  const option = Object.assign({}, defaultConfig, config);

  return (list || []).reduce((group, item) => {
    if (!item) return group;
    const groupName = item.group || option.defaultName;

    if (Array.isArray(groupName)) {
      groupName.forEach((gname) => {
        if (!group[gname]) group[gname] = [];
        group[gname].push(item);
      });
    } else {
      if (!group[groupName]) group[groupName] = [];
      group[groupName].push(item);
    }
    return group;
  }, {});
}
