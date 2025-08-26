import createComponent from '../create-component';

import request from '../plugins/plugin-request-pagination';
import columnsTransform from '../plugins/plugin-columns-transform';
import ItemSelections from '../plugins/plugin-item-selections';
import listCommand from '../plugins/plugin-list-command';

import layout from '../plugins/plugin-layout-main';
import search from '../plugins/plugin-search-normal';
import list from '../plugins/plugin-list-normal';
import list2 from '../plugins/plugin-list-table';
import listPagination from '../plugins/plugin-list-pagination';
import buttonList from '../plugins/plugin-button-list';

import popup from '../plugins/plugin-popup';

// 自动请求表格
const ListAutoRequest = createComponent([
  popup,
  // 工具
  request,
  columnsTransform,
  ItemSelections,
  listCommand,
  // 布局
  layout,
  buttonList,
  // 内容
  search,
  list,
  list2,
  listPagination,
]);

export default ListAutoRequest;
