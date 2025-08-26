import createComponent from '@/components/@comp/create-component';

import RequestPagination from './plugins/plugin-request-pagination';
import ColumnsTransform from './plugins/plugin-columns-transform';
import ItemSelections from './plugins/plugin-item-selections';
import ListCommand from './plugins/plugin-list-command';

import LayoutMain from './plugins/plugin-layout-main';
import SearchNormal from './plugins/plugin-search-normal';
import ListTable from './plugins/plugin-list-table';
import ListNormal from './plugins/plugin-list-normal';
import ListPagination from './plugins/plugin-list-pagination';
import ButtonList from './plugins/plugin-button-list';

import Modal from './plugins/plugin-modal';

// 自动请求表格
const ListAutoRequest = createComponent([
  Modal,
  // 工具
  RequestPagination,
  ColumnsTransform,
  ItemSelections,
  ListCommand,
  // 布局
  LayoutMain,
  ButtonList,
  // 内容
  SearchNormal,
  ListTable,
  ListNormal,
  ListPagination,
]);

export default ListAutoRequest;
