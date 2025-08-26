import React from 'react';
import { Table } from 'antd';
import { definePlugin } from '@/components/@comp/create-component';

export default definePlugin({
  name: 'listTable',
  priority: 'CONTENT',
  props: [],
  main(instance, props) {
    const { table: tableProps = {}, rowKey = 'key' } = props;

    const { request } = instance.getPlugin('request');
    const { tableColumns } = instance.getPlugin('columnsTransform');
    const listScroll = instance.getPlugin('listScrollHeight');
    const buttonExpandAble = instance.getPlugin('buttonExpandAble');
    const { selectionType, selection } = instance.getPlugin('itemSelections') || {};

    const rowSelection = !selection
      ? void 0
      : {
          type: selectionType,
          selectedRowKeys: selection?.selectedRowKeys,
          onSelect: selection?.toggle,
          onSelectAll: selection?.toggleAll,
          getCheckboxProps: selection?.getCheckboxProps,
          ...tableProps.rowSelection,
        };

    const content = (
      <Table
        {...tableProps}
        {...(!buttonExpandAble
          ? {}
          : {
              expandable: buttonExpandAble.expandable || tableProps.expandable,
            })}
        rowSelection={rowSelection}
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
        loading={request.loading}
        dataSource={request.data.list}
        columns={tableColumns.data}
        scroll={!listScroll ? tableProps.scroll : { y: listScroll.height, ...tableProps.scroll }}
        style={{ flex: 1, overflow: 'hidden', ...tableProps.style }}
        rowKey={rowKey || tableProps.rowKey}
      />
    );

    // console.log(rowSelection, content);

    return { children: content };
  },
});
