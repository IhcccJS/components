import createComponent from '../create-component';

import request from '../plugins/plugin-request-pagination';
// import  columnsTransform from '../plugins/ columnsTransform';

import layout from '../plugins/plugin-layout-style2';
import list from '../plugins/plugin-list-table-editRow';
import buttonList from '../plugins/plugin-button-list';

import buttonCreate from '../plugins/plugin-button-create';
import buttonRefresh from '../plugins/plugin-button-refresh';
import buttonSetting from '../plugins/plugin-button-setting';
import buttonFullscreen from '../plugins/plugin-button-fullscreen';
import buttonExport from '../plugins/plugin-button-export';
import buttonTableExpand from '../plugins/plugin-button-table-expand';

import popup from '../plugins/plugin-popup';

// 编辑树表格
const ListOfTableEditAble = createComponent([
  // 弹窗
  popup,
  // 工具
  request,
  //  columnsTransform,
  // 布局
  layout,
  // 功能按钮
  buttonTableExpand,
  buttonExport,
  buttonSetting,
  buttonFullscreen,
  buttonRefresh,
  buttonCreate,
  // 内容
  buttonList,
  list,
]);

export default ListOfTableEditAble;
