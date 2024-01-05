import React from 'react';
import { Button } from 'antd';
import useForwardRef from './useForwardRef';
import EditTable from '../edit-table';

const eventMap = {
  // row event
  edit: ({ action, record }) => {
    action.cancel();
    action.edit(record.id);
  },
  save: ({ action }) => action.save(),
  cancel: ({ action }) => action.cancel(),
  del: ({ action, index }) => action.remove(index),
  copy: ({ action, record }) => action.addToEnd(record),
};

const actionColumn = {
  width: 'lg',
  fixed: 'right',
  buttonConfig: {
    type: 'a',
    buttons: [
      {
        key: 'edit',
        hidden: ({ editing, record, rowKey }) => editing === record[rowKey],
        props: { children: '编辑' },
      },
      {
        key: 'save',
        hidden: ({ editing, record, rowKey }) => editing !== record[rowKey],
        props: { children: '保存' },
      },
      {
        key: 'cancel',
        hidden: ({ editing, record, rowKey }) => editing !== record[rowKey],
        props: { children: '取消' },
        confirm: { title: '确定要取消吗？' },
      },
      {
        key: 'del',
        hidden: ({ editing, record, rowKey }) => editing === record[rowKey],
        props: { children: '删除' },
        confirm: { title: '确定要删除吗？' },
      },
      {
        key: 'copy',
        hidden: ({ editing, record, rowKey }) => editing === record[rowKey],
        props: { children: '复制' },
      },
    ],
  },
};

const EditRow = React.forwardRef(function EditRow(props, ref) {
  const { actionButton, ...restProps } = props;
  const etRef = useForwardRef(ref);

  const insertButton = (
    <Button
      block
      size="small"
      type="dashed"
      onClick={() => {
        etRef.current?.cancel();
        etRef.current?.addToEnd();
      }}
    >
      添加
    </Button>
  );

  return (
    <EditTable
      {...restProps}
      ref={etRef}
      actionColumn={actionColumn}
      eventMap={eventMap}
      footer={() => insertButton}
    />
  );
});

export default EditRow;
