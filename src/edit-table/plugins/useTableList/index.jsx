import { Table } from 'antd';

function useTableList(instance, props) {
  const { table: tableProps = {} } = props;

  const { action } = instance.getPlugin('editList');
  const { tableColumns, cell } = instance.getPlugin('columnsTransform');

  return {
    name: 'tableList',
    content: (
      <Table
        {...tableProps}
        columns={tableColumns.data}
        dataSource={action.list}
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

export default useTableList;
