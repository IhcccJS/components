import React from 'react';
import { Table } from 'antd';
import { useControllableValue } from 'ahooks';
import definePlugin from '../../create-component/definePlugin';

export default definePlugin({
  name: 'listTableSelectAble',
  priority: 'CONTENT',
  props: [],
  main(instance, props) {
    const switchRender = instance.getPlugin('buttonSwitchRender');

    if (!!switchRender?.renderType && switchRender?.renderType !== 'table') return;

    const { table: tableProps = {}, rowKey: _rowKey = 'key' } = props;

    const { request } = instance.getPlugin('request');
    const { tableColumns } = instance.getPlugin('columnsTransform');

    const rowKey = _rowKey || tableProps.rowKey;

    const [selected, onSelect] = useControllableValue(tableProps, {
      defaultValue: null,
      defaultValuePropName: 'defaultSelected',
      valuePropName: 'selected',
      trigger: 'onSelect',
    });

    const rowClassName = React.useCallback(
      (record) => (record[rowKey] === selected?.[rowKey] ? 'bc-ant-table-row-active' : ''),
      [selected],
    );

    const onRow = React.useCallback(
      (record) => ({
        onClick: () => {
          onSelect(record[rowKey] === selected?.[rowKey] ? null : record);
        },
      }),
      [selected, onSelect],
    );

    const content = (
      <Table
        {...tableProps}
        pagination={
          typeof tableProps.pagination === 'object' && {
            total: request.data.total,
            current: request.page.pageNumber,
            pageSize: request.page.pageSize,
            onChange: request.goto,
            showTotal: (total) => `总计 ${total} 项`,
            ...tableProps.pagination,
          }
        }
        rowClassName={rowClassName}
        onRow={onRow}
        loading={request.loading}
        dataSource={request.data.list}
        columns={tableColumns.data}
        style={{ flex: 1, overflow: 'hidden', ...tableProps.style }}
        rowKey={rowKey || tableProps.rowKey}
      />
    );

    return { children: content };
  },
});
