import React from 'react';
import EditTable from '../edit-table/edit-table-row';
import definePlugin from '../create-component/definePlugin';

export default definePlugin({
  name: 'listTableEditRow',
  priority: 'CONTENT',
  props: ['table', 'eventData', 'rowKey'],
  main(instance, props) {
    const editTableRef = React.useRef();

    const { request } = instance.getPlugin('request');
    const tableExpand = instance.getPlugin('buttonTableExpand');

    const content = (
      <EditTable
        {...props}
        ref={editTableRef}
        eventData={{ ...instance.expose, ...props.eventData }}
        table={{
          loading: request.loading,
          pagination: false,
          ...props.table,
          expandable: { ...(tableExpand?.expandable || props.table?.expandable) },
        }}
        dataSource={request.data.list}
        rowKey={props.rowKey || props.table?.rowKey}
      />
    );

    return { data: { editTable: editTableRef.current }, children: content };
  },
});
