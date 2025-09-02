import createComponent from '../create-component';

import request from '../plugins/plugin-request-loadmore';

import layout from '../plugins/plugin-layout-style2';
import search from '../plugins/plugin-search-simple';
import list from '../plugins/plugin-list-loadmore';
import buttonList from '../plugins/plugin-button-list';

import buttonCreate from '../plugins/plugin-button-create';
import buttonRefresh from '../plugins/plugin-button-refresh';
import buttonFullscreen from '../plugins/plugin-button-fullscreen';
import buttonExport from '../plugins/plugin-button-export';

import popup from '../plugins/plugin-popup';

// 自定义渲染列表
export const ListOfCustom = createComponent([
  // 工具
  request,
  // 布局
  layout,
  // 内容
  search,
  buttonList,
  list,
  // 功能按钮
  buttonExport,
  buttonFullscreen,
  buttonRefresh,
  buttonCreate,
  // 弹窗
  popup,
]);

export default ListOfCustom;
