import React from 'react';
import { Divider } from 'antd';
import useForwardRef from './useForwardRef';
import ButtonList from '../../button-list';
import EditTable from '../edit-table';

const eventMap = {
  // table event
  addStart: ({ action }) => action.addToStart(),
  addEnd: ({ action }) => action.addToEnd(),
  save: ({ action }) => action.save(),
  cancel: ({ action }) => action.cancel(),
  edit: ({ action }) => action.edit(true),
  clear: ({ action }) => action.clear(),
  // row event
  del: ({ action, index }) => action.remove(index),
  copyUp: ({ action, record }) => action.addToStart(record),
  copyDown: ({ action, record }) => action.addToEnd(record),
};

const EditAllTableButtons = (props) => {
  return (
    <ButtonList
      {...props}
      type="a"
      buttons={[
        {
          key: 'addStart',
          props: { children: '新增到顶部' },
        },
        {
          key: 'addEnd',
          props: { children: '新增到底部' },
        },
        {
          key: 'save',
          hidden: ({ editing }) => !editing,
          props: { children: '保存' },
        },
        {
          key: 'cancel',
          hidden: ({ editing }) => !editing,
          props: { children: '取消' },
          confirm: { title: '确定要取消吗？' },
        },
        {
          key: 'edit',
          hidden: ({ editing }) => editing,
          props: { children: '编辑' },
        },
        {
          key: 'clear',
          props: { children: '清空' },
          confirm: { title: '确定要清空吗？' },
        },
      ]}
    />
  );
};

const actionColumn = {
  width: 'lg',
  fixed: 'right',
  buttonConfig: {
    type: 'a',
    buttons: [
      {
        key: 'del',
        props: { children: '删除' },
        confirm: { title: '确定要删除吗？' },
      },
      {
        key: 'copyUp',
        props: { children: '复制 ▲' },
      },
      {
        key: 'copyDown',
        props: { children: '复制 ▼' },
      },
    ],
  },
};

const EditAll = React.forwardRef(function EditAll(props, ref) {
  const { actionButton, ...restProps } = props;
  const etRef = useForwardRef(ref);

  return (
    <EditTable
      {...restProps}
      ref={etRef}
      actionColumn={actionColumn}
      eventMap={eventMap}
      renderDom={(tableDom, eventData) => (
        <React.Fragment>
          <EditAllTableButtons
            layout="end"
            data={eventData}
            eventMap={eventMap}
          />
          <Divider dashed style={{ margin: '12px 0' }} />
          {tableDom}
        </React.Fragment>
      )}
    />
  );
});

export default EditAll;
