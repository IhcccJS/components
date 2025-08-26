import createComponent from '../create-component';

import request from '../plugins/plugin-request-pagination';
import columnsTransform from '../plugins/plugin-columns-transform';
import itemSelections from '../plugins/plugin-item-selections';
import listCommand from '../plugins/plugin-list-command';

import layout from '../plugins/plugin-layout-main';
import search from '../plugins/plugin-search-normal';
import list from '../plugins/plugin-list-normal';
import list2 from '../plugins/plugin-list-table';
// import  ListJsonDataViewer from '../plugins/ ListJsonDataViewer';
import listPagination from '../plugins/plugin-list-pagination';
import buttonList from '../plugins/plugin-button-list';

import buttonCreate from '../plugins/plugin-button-create';
import buttonRefresh from '../plugins/plugin-button-refresh';
import buttonFullscreen from '../plugins/plugin-button-fullscreen';
import buttonSetting from '../plugins/plugin-button-setting';

import popup from '../plugins/plugin-popup';

// 翻页表格
const ListOfTable = createComponent([
  // 弹窗
  popup,
  // 工具
  request,
  columnsTransform,
  itemSelections,
  listCommand,
  // 布局
  layout,
  buttonList,
  // 功能按钮
  buttonSetting,
  buttonFullscreen,
  buttonRefresh,
  buttonCreate,
  // 内容
  search,
  list,
  list2,
  //  ListJsonDataViewer,
  listPagination,
]);

export default ListOfTable;
