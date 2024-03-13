import BaseList from './base-list';

const PLUGINS = BaseList.PLUGINS;

// 常用表格组件
BaseList.NormalTable = BaseList.use([
  PLUGINS.LayoutDefault,
  PLUGINS.RequestPagination,
  PLUGINS.RenderTable,
  PLUGINS.RenderList,
  PLUGINS.FunctionRefresh,
  PLUGINS.FunctionFullscreen,
]);

// 常用列表组件
BaseList.NormalList = BaseList.use([
  PLUGINS.LayoutDefault,
  PLUGINS.RenderList,
  PLUGINS.FunctionRefresh,
]);

// 列表表格切换组件

export default BaseList;
