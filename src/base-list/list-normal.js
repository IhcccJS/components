import createComponent from '@/components/@comp/create-component';

import RequestLoadMore from './plugins/plugin-request-loadMore';
import ColumnsTransform from './plugins/plugin-columns-transform';
import ListCommand from './plugins/plugin-list-command';

import LayoutStyle2 from './plugins/plugin-layout-style2';
import SearchSimple from './plugins/plugin-search-simple';
import ListNormal from './plugins/plugin-list-normal';
import ListLoadMore from './plugins/plugin-list-loadMore';
import ButtonList from './plugins/plugin-button-list';

import ButtonCreate from './plugins/plugin-button-create';
import ButtonRefresh from './plugins/plugin-button-refresh';
import ButtonFullscreen from './plugins/plugin-button-fullscreen';
import ButtonExport from './plugins/plugin-button-export';
// import  ButtonHelp from './plugins/plugin-button-help';

import Modal from './plugins/plugin-modal';

// 加载更多列表
const ListOfNormal = createComponent([
  // 弹窗
  Modal,
  // 工具
  RequestLoadMore,
  ColumnsTransform,
  ListCommand,
  // 布局
  LayoutStyle2,
  // 内容
  SearchSimple,
  ButtonList,
  ListNormal,
  ListLoadMore,
  // 功能按钮
  //  ButtonHelp,
  ButtonExport,
  ButtonFullscreen,
  ButtonRefresh,
  ButtonCreate,
]);

export default ListOfNormal;
