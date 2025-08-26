import createComponent from '@/components/@comp/create-component';

import RequestNone from './plugins/plugin-request-none';
import ColumnsTransform from './plugins/plugin-columns-transform';
import ItemSelections from './plugins/plugin-item-selections';

import LayoutMain from './plugins/plugin-layout-main';
import ListTable from './plugins/plugin-list-table';

// 翻页表格
const ListOfTableSimple = createComponent([
  // 工具
  RequestNone,
  ColumnsTransform,
  ItemSelections,
  // 布局
  LayoutMain,
  // 内容
  ListTable,
]);

export default ListOfTableSimple;
