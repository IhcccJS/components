import createComponent from '@/components/@comp/create-component';

import RequestPagination from './plugins/plugin-request-pagination';
// import  ColumnsTransform from './plugins/ ColumnsTransform';

import LayoutStyle2 from './plugins/plugin-layout-style2';
import ListTableEditRow from './plugins/plugin-list-table-editRow';
import ButtonList from './plugins/plugin-button-list';

import ButtonCreate from './plugins/plugin-button-create';
import ButtonRefresh from './plugins/plugin-button-refresh';
import ButtonSetting from './plugins/plugin-button-setting';
import ButtonFullscreen from './plugins/plugin-button-fullscreen';
import ButtonExport from './plugins/plugin-button-export';
import ButtonTableExpand from './plugins/plugin-button-table-expand';
// import  ButtonHelp from './plugins/plugin-button-help';

import Modal from './plugins/plugin-modal';

// 编辑树表格
const ListOfTableEditAble = createComponent([
  // 弹窗
  Modal,
  // 工具
  RequestPagination,
  //  ColumnsTransform,
  // 布局
  LayoutStyle2,
  // 功能按钮
  //  ButtonHelp,
  ButtonTableExpand,
  ButtonExport,
  ButtonSetting,
  ButtonFullscreen,
  ButtonRefresh,
  ButtonCreate,
  // 内容
  ButtonList,
  ListTableEditRow,
]);

export default ListOfTableEditAble;
