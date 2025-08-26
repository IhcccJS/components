import createComponent from '@/components/@comp/create-component';

import RequestPagination from './plugins/plugin-request-pagination';
import ColumnsTransform from './plugins/plugin-columns-transform';
import ItemSelections from './plugins/plugin-item-selections';
import ListCommand from './plugins/plugin-list-command';

import LayoutMain from './plugins/plugin-layout-main';
import SearchNormal from './plugins/plugin-search-normal';
import ListNormal from './plugins/plugin-list-normal';
import ListPagination from './plugins/plugin-list-pagination';
import ButtonList from './plugins/plugin-button-list';

import ButtonCreate from './plugins/plugin-button-create';
import ButtonRefresh from './plugins/plugin-button-refresh';
import ButtonFullscreen from './plugins/plugin-button-fullscreen';
import ButtonExport from './plugins/plugin-button-export';
// import useButtonHelp from './plugins/plugin-button-help';

import Modal from './plugins/plugin-modal';

// 翻页卡片列表
const ListOfCard = createComponent([
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
  // useButtonHelp,
  ButtonExport,
  ButtonFullscreen,
  ButtonRefresh,
  SearchNormal,
  ButtonCreate,
  // 内容
  ListNormal,
  ListPagination,
]);

export default ListOfCard;
