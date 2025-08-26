import createComponent from '@/components/@comp/create-component';

import RequestPagination from './plugins/plugin-request-pagination';
import ColumnsTransform from './plugins/plugin-columns-transform';
import ItemSelections from './plugins/plugin-item-selections';

import LayoutMain from './plugins/plugin-layout-main';
import SearchNormal from './plugins/plugin-search-normal';
import ListTableSelectAble from './plugins/plugin-list-table-selectAble';
import ListPagination from './plugins/plugin-list-pagination';
import ButtonList from './plugins/plugin-button-list';

import ButtonCreate from './plugins/plugin-button-create';
import ButtonRefresh from './plugins/plugin-button-refresh';
import ButtonFullscreen from './plugins/plugin-button-fullscreen';
// import  ButtonHelp from './plugins/plugin-button-help';

import Modal from './plugins/plugin-modal';

// 翻页表格
const ListOfTableSelectAble = createComponent([
  // 弹窗
  Modal,
  // 工具
  RequestPagination,
  ColumnsTransform,
  ItemSelections,
  // 布局
  LayoutMain,
  ButtonList,
  // 功能按钮
  //  ButtonHelp,
  ButtonFullscreen,
  ButtonRefresh,
  SearchNormal,
  ButtonCreate,
  // 内容
  ListTableSelectAble,
  ListPagination,
]);

export default ListOfTableSelectAble;
