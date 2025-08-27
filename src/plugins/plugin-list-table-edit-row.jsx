import React from 'react';
import EditTableTree from '../edit-table/edit-table-tree';
import definePlugin from '../create-component/definePlugin';

export default definePlugin({
  name: 'listTableEditRow',
  priority: 'CONTENT',
  props: [],
  main(instance, props) {
    const { request } = instance.getPlugin('request');

    const buttonExpandAble = instance.getPlugin('buttonExpandAble');
    const editTableRef = React.useRef();

    const eventData = { ...instance.expose, ...props.eventData };

    const content = (
      <EditTableTree
        {...props}
        ref={editTableRef}
        eventData={eventData}
        table={{
          ...props.table,
          expandable: { ...(buttonExpandAble?.expandable || props.table?.expandable) },
          loading: request.loading,
          rowKey: props.rowKey,
        }}
        dataSource={request.data.list}
      />
    );

    return { data: { editTable: editTableRef.current }, children: content };
  },
});
