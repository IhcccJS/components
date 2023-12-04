import filterOfVisible from '../../columns-helper/filterOfVisible';

export const CONFIG_NAME = 'editorConfig';

export const filterChecked = filterOfVisible('list');

export const checkedFilter = (item) => {
  return (
    item['_checked'] || (item['_checked'] == void 0 && filterChecked(item))
  );
  // if (item[CONFIG_NAME]) {
  //   return item[CONFIG_NAME].checked === void 0
  //     ? filterChecked(item)
  //     : item[CONFIG_NAME].checked;
  // }
  // return true;
};

/** 修复列表中的 fixed 参数 */
export const fixColumnItem = (list, index) => {
  if (!list || list.length === 0) return list;
  const prev = list[index - 1];
  const next = list[index + 1];
  const current = list[index];
  if (!current.fixed && prev && prev.fixed === 'right') {
    list[index - 1] = { ...prev, fixed: '' };
    fixColumnItem(list, index - 1);
  }
  if (
    !current.fixed &&
    next &&
    (next.fixed === 'left' || next.fixed === true)
  ) {
    list[index + 1] = { ...next, fixed: '' };
    fixColumnItem(list, index + 1);
  }
  return list;
};

export const fixColumns = (list) => {
  for (let i = 0; i < list.length; i++) fixColumnItem(list, i);
  return list;
};
