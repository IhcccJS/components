import createComponent from '../create-component';

import request from '../plugins/plugin-request-none';
import columnsTransform from '../plugins/plugin-columns-transform';
import itemSelections from '../plugins/plugin-item-selections';
import listCommand from '../plugins/plugin-list-command';

import layout from '../plugins/plugin-layout-main';
import list from '../plugins/plugin-list-table';

// 翻页表格
const ListOfTableSimple = createComponent([
  // 工具
  request,
  columnsTransform,
  itemSelections,
  listCommand,
  // 布局
  layout,
  // 内容
  list,
]);

export default ListOfTableSimple;
