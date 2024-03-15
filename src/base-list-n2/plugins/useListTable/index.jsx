import React from 'react';
import { Table } from 'antd';
import columnsHelper from '../../../columns-helper';
import { isString } from '@ihccc/utils';

function useListTable(instance) {
  const content = React.memo((props) => {
    const { name, access, columns, actionColumn, rowKey } = props;

    const { request } = instance.getPlugin('request');

    const tableColumns = columnsHelper.useColumns(
      columns,
      Object.assign(
        {
          handler: 'baseList',
          name: name || 'list',
          isList: true,
          // showIndex: showIndex === 'order' ? data?.page : showIndex,
          actions: actionColumn,
          eventData: {},
          eventMap: {},
        },
        isString(access) ? { name: access } : access,
      ),
    );

    return (
      <Table
        loading={request.loading}
        dataSource={request.data.list}
        columns={tableColumns}
        pagination={{
          size: 'small',
          defaultCurrent: 1,
          total: request.data.total,
        }}
        rowKey={rowKey}
      />
    );
  });

  return {
    name: 'listTable',
    content,
    props: ['name', 'access', 'columns', 'actionColumn', 'rowKey'],
  };
}

export default useListTable;
