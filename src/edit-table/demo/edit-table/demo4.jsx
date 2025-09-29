import React from 'react';
import { treeFromArray } from '@ihccc/utils';
import { ListOfTableEditAble } from '@ihccc/components';
import columns from './users/columns';
import { query, remove } from './users/_services';

// 列表数据转树结构
const formatList = (list) => treeFromArray(list || [], { rootKey: '_root' });
// 新增时初始化数据
const getInitialRow = (record) => ({ id: Date.now().toString(), pid: record?.id || '_root' });

const eventMap = {
  create: ({ editTable }) => {
    const record = getInitialRow();
    editTable.action?.unshiftAndEdit(record, record.id);
  },
  insert: ({ action, record, rowKey, expand }) => {
    const rowData = getInitialRow(record) || {};
    action.unshiftAndEdit(rowData, rowData[rowKey]);
    // expand.setExpandedRowKeys((keys) => keys.concat(record.id));
  },
  remove: async ({ record, request }) => {
    await remove(record);
    request.refresh();
  },
};

function Demo() {
  return (
    <ListOfTableEditAble
      namespace="menuList"
      request={{ query, pageSize: 999, cacheKey: 'access/menu', staleTime: -1 }}
      columns={columns}
      formatList={formatList}
      table={{
        bordered: true,
        size: 'small',
        scroll: { x: 'max-content' },
      }}
      // 设置新增行的初始数据
      eventData={{ getInitialRow }}
      eventMap={eventMap}
      onSave={async (record) => {
        // 新增和编辑
        console.log('onSave::', record);
      }}
      rowKey="id"
    />
  );
}

export default Demo;
