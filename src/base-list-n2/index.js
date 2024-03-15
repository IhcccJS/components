import core from './core';

import useRequest from './plugins/useRequest';
import useLayoutMain from './plugins/useLayoutMain';
// import useLayoutStyle2 from './plugins/useLayoutStyle2';
import useSearchNormal from './plugins/useSearchNormal';
import useListNormal from './plugins/useListNormal';
// import useListTable from './plugins/useListTable';
// import useListPagination from './plugins/useListPagination';
import useButtonList from './plugins/useButtonList';
import useButtonRefresh from './plugins/useButtonRefresh';
import useButtonFullscreen from './plugins/useButtonFullscreen';
import useModal from './plugins/useModal';
import useDemoCount from './plugins/useDemoCount';

export default core([
  useRequest,
  useModal,
  useLayoutMain,
  // useLayoutStyle2,
  useSearchNormal,
  useButtonList,
  useListNormal,
  // useListTable,

  // useListPagination,
  useButtonRefresh,
  useButtonFullscreen,
  useDemoCount,
]);
