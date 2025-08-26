import createComponent from '@/components/@comp/create-component';

import RequestLoadMore from './plugins/plugin-request-loadMore';

import LayoutStyle2 from './plugins/plugin-layout-style2';
import SearchSimple from './plugins/plugin-search-simple';
import ListLoadMore from './plugins/plugin-list-loadMore';
import ButtonList from './plugins/plugin-button-list';

import ButtonCreate from './plugins/plugin-button-create';
import ButtonRefresh from './plugins/plugin-button-refresh';
import ButtonFullscreen from './plugins/plugin-button-fullscreen';
import ButtonExport from './plugins/plugin-button-export';
// import useButtonHelp from './plugins/useButtonHelp';

import Modal from './plugins/plugin-modal';

// 自定义渲染列表
export const ListOfCustom = createComponent([
  // 工具
  RequestLoadMore,
  // 布局
  LayoutStyle2,
  // 内容
  SearchSimple,
  ButtonList,
  // useListCustomRender,
  ListLoadMore,
  // 功能按钮
  // useButtonHelp,
  ButtonExport,
  ButtonFullscreen,
  ButtonRefresh,
  ButtonCreate,
  // 弹窗
  Modal,
]);

export default ListOfCustom;
