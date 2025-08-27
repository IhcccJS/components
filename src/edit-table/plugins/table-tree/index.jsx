import React from 'react';
import { Table } from 'antd';
import definePlugin from '../../../create-component/definePlugin';

const TableTree = definePlugin({
  name: 'TableTree',
  priority: 'CONTENT',
  props: ['table'],
  main(instance, props) {
    const { table: tableProps = {} } = props;

    const { action } = instance.getPlugin('EditList');
    const { tableColumns, cell } = instance.getPlugin('ColumnsTransform');

    return {
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
  },
});

export default TableTree;
