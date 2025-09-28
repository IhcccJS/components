import { Table } from 'antd';
import definePlugin from '../../create-component/definePlugin';

const TableList = definePlugin({
  name: 'TableList',
  priority: 'CONTENT',
  props: ['table', 'rowKey'],
  main(instance, props) {
    const { table: tableProps = {}, rowKey } = props;

    const { action } = instance.getPlugin('EditList');
    const { tableColumns, cell } = instance.getPlugin('ColumnsTransform');
    // console.log(tableProps, action, tableColumns, cell);

    return {
      content: (
        <Table
          {...tableProps}
          rowKey={rowKey || tableProps.rowKey}
          columns={tableColumns.data}
          dataSource={action.data}
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

export default TableList;
