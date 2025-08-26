import createComponent from '../create-component';

import request from '../plugins/plugin-request-pagination';
import columnsTransform from '../plugins/plugin-columns-transform';
import itemSelections from '../plugins/plugin-item-selections';

import layout from '../plugins/plugin-layout-main';
import search from '../plugins/plugin-search-normal';
import list from '../plugins/plugin-list-table-selectAble';
import listPagination from '../plugins/plugin-list-pagination';
import buttonList from '../plugins/plugin-button-list';

import buttonCreate from '../plugins/plugin-button-create';
import buttonRefresh from '../plugins/plugin-button-refresh';
import buttonFullscreen from '../plugins/plugin-button-fullscreen';

import popup from '../plugins/plugin-popup';

// 翻页表格
const ListOfTableSelectAble = createComponent([
  // 弹窗
  popup,
  // 工具
  request,
  columnsTransform,
  itemSelections,
  // 布局
  layout,
  buttonList,
  // 功能按钮
  buttonFullscreen,
  buttonRefresh,
  search,
  buttonCreate,
  // 内容
  list,
  listPagination,
]);

export default ListOfTableSelectAble;
