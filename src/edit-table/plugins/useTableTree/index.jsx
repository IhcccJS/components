import React from 'react';
import { Table } from 'antd';

function useTableTree(instance, props) {
  const { table: tableProps = {} } = props;

  const { action } = instance.getPlugin('editList');
  const { tableColumns, cell } = instance.getPlugin('columnsTransform');

  return {
    name: 'tableTree',
    content: (
      <Table
        {...tableProps}
        columns={tableColumns.data}
        dataSource={action.data}
        pagination={false}
        components={{
          ...tableProps.components,
          body: {
            ...tableProps.components?.body,
            cell,
          },
        }}
      />
    ),
  };
}

export default useTableTree;
