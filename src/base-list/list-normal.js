import createComponent from '../create-component';

import request from '../plugins/plugin-request-loadmore';
import columnsTransform from '../plugins/plugin-columns-transform';
import listCommand from '../plugins/plugin-list-command';

import layout from '../plugins/plugin-layout-style2';
import search from '../plugins/plugin-search-simple';
import list from '../plugins/plugin-list-normal';
import listLoadMore from '../plugins/plugin-list-loadMore';
import buttonList from '../plugins/plugin-button-list';

import buttonCreate from '../plugins/plugin-button-create';
import buttonRefresh from '../plugins/plugin-button-refresh';
import buttonFullscreen from '../plugins/plugin-button-fullscreen';
import buttonExport from '../plugins/plugin-button-export';

import popup from '../plugins/plugin-popup';

// 加载更多列表
const ListOfNormal = createComponent([
  // 弹窗
  popup,
  // 工具
  request,
  columnsTransform,
  listCommand,
  // 布局
  layout,
  // 内容
  search,
  buttonList,
  list,
  listLoadMore,
  // 功能按钮
  buttonExport,
  buttonFullscreen,
  buttonRefresh,
  buttonCreate,
]);

export default ListOfNormal;
