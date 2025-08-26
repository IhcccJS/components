import createComponent from '@/components/@comp/create-component';

import RequestPagination from './plugins/plugin-request-pagination';
import ColumnsTransform from './plugins/plugin-columns-transform';
import ItemSelections from './plugins/plugin-item-selections';
import ListCommand from './plugins/plugin-list-command';

import LayoutMain from './plugins/plugin-layout-main';
import SearchNormal from './plugins/plugin-search-normal';
import ListNormal from './plugins/plugin-list-normal';
import ListTable from './plugins/plugin-list-table';
// import  ListJsonDataViewer from './plugins/ ListJsonDataViewer';
import ListPagination from './plugins/plugin-list-pagination';
import ButtonList from './plugins/plugin-button-list';

import ButtonCreate from './plugins/plugin-button-create';
import ButtonRefresh from './plugins/plugin-button-refresh';
import ButtonFullscreen from './plugins/plugin-button-fullscreen';
import ButtonSetting from './plugins/plugin-button-setting';
// import  ButtonExport from './plugins/ ButtonExport';

import Modal from './plugins/plugin-modal';

// 翻页表格
const ListOfTable = createComponent([
  // 弹窗
  Modal,
  // 工具
  RequestPagination,
  ColumnsTransform,
  ItemSelections,
  ListCommand,
  // 布局
  LayoutMain,
  ButtonList,
  // 功能按钮
  //  ButtonExport,
  ButtonSetting,
  ButtonFullscreen,
  ButtonRefresh,
  ButtonCreate,
  // 内容
  SearchNormal,
  ListTable,
  ListNormal,
  //  ListJsonDataViewer,
  ListPagination,
]);

export default ListOfTable;
