import {
  EditOutlined,
  PlusOutlined,
  UndoOutlined,
  UploadOutlined,
  CloseCircleOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons';
import { Tooltip, Button } from 'antd';
import { isArray } from '@ihccc/utils';
import ButtonList from '../../../button-list';

class RowState {
  constructor() {
    this.key = '__$ROW_STATE$__';
    this.state = {
      remove: false,
      create: false,
      update: true,
    };
  }
  getAddState() {
    return { [this.key]: { ...this.state, create: true } };
  }
  getPath(key) {
    return [this.key, key];
  }
  status(record, key) {
    const itemStatus = record?.[this.key];
    if (isArray(key)) {
      for (let index = 0; index < key.length; index++) {
        if (itemStatus?.[key[index]]) return true;
      }
    } else {
      return itemStatus?.[key] || null;
    }
  }
  getActionName(record, keys) {
    const itemStatus = record?.[this.key];
    for (let index = 0; index < keys.length; index++) {
      if (itemStatus?.[keys[index]]) return keys[index];
    }
    return 'update';
  }
}

export const rowState = new RowState();

export const eventMap = {
  // table event
  addStart: ({ action }) => {
    action.addToStart(rowState.getAddState());
    action.save();
  },
  cancel: ({ action }) => action.cancel(),
  edit: ({ action }) => action.edit(true),
  submit: ({ action, onSubmit }) => {
    action.save();
    onSubmit?.();
  },
  refresh: ({ onRefresh }) => onRefresh?.(),
  // row event
  del: ({ action, index }) =>
    action.setValue(index, rowState.getPath('remove'), true),
  rowCancel: ({ action, record, index }) => {
    if (rowState.status(record, 'create')) {
      action.remove(index);
      return;
    }
    if (rowState.status(record, 'remove'))
      action.setValue(index, rowState.getPath('remove'), false);
    action.setValue(index, rowState.getPath('update'), false);
  },
  copyUp: ({ action, record }) => {
    action.addToStart({ ...record, ...rowState.getAddState() });
    action.save();
  },
};

export const EditAllTableButtons = (props) => {
  return (
    <ButtonList
      {...props}
      type="button"
      baseProps={{
        button: { size: 'small' },
      }}
      buttons={[
        {
          key: 'addStart',
          hidden: ({ editing, success }) => !editing || success,
          props: { icon: <PlusOutlined />, children: '新增' },
        },
        {
          key: 'edit',
          hidden: ({ editing }) => editing,
          props: { type: 'primary', icon: <EditOutlined />, children: '编辑' },
        },
        {
          key: 'cancel',
          group: 'summary',
          hidden: ({ editing, success }) => !editing || success,
          props: {
            icon: <UndoOutlined />,
            children: '取消',
          },
          confirm: { title: '确定要取消吗？' },
        },
        {
          key: 'submit',
          group: 'summary',
          hidden: ({ editing, success }) => !editing || success,
          confirm: { title: '确定要提交吗？' },
          props: ({}) => ({
            type: 'primary',
            icon: <UploadOutlined />,
            children: '提交',
            // children:
            //   activeRow.index > 0 && !activeRow.success ? '重试' : '提交',
          }),
        },
        {
          key: 'refresh',
          hidden: ({ success }) => !success,
          props: { children: '刷新' },
        },
      ]}
    />
  );
};

export const actionColumn = {
  width: 'lg',
  fixed: 'right',
  buttonConfig: {
    type: 'a',
    render: (renderDom, { activeRow, index }) => {
      const rowStatus = activeRow[index];
      if (!rowStatus) return renderDom;
      if (rowStatus.loading)
        return (
          <Button type="link" size="small" loading>
            处理中...
          </Button>
        );
      return (
        <Tooltip title={rowStatus.message}>
          {!rowStatus.success ? (
            <Button
              type="text"
              size="small"
              danger
              icon={<CloseCircleOutlined />}
            >
              失败
            </Button>
          ) : (
            <Button
              type="text"
              size="small"
              icon={<CheckCircleOutlined />}
              style={{ color: 'green' }}
            >
              成功
            </Button>
          )}
        </Tooltip>
      );
    },
    buttons: [
      {
        key: 'rowTag',
        type: 'tag',
        space: 'divider',
        hidden: ({ record }) =>
          !rowState.status(record, ['remove', 'create', 'update']),
        props: ({ record }) => {
          if (rowState.status(record, 'remove'))
            return { color: 'red', children: '删除' };
          if (rowState.status(record, 'create'))
            return { color: 'blue', children: '新增' };
          return { color: 'green', children: '编辑' };
        },
        tip: ({ record }) => {
          if (rowState.status(record, 'remove'))
            return { title: '已被标记为删除' };
          if (rowState.status(record, 'create'))
            return { title: '已被标记为新增' };
          return { title: '已被标记为编辑' };
        },
      },
      {
        key: 'rowCancel',
        hidden: ({ record }) =>
          !rowState.status(record, ['remove', 'create', 'update']),
        props: { children: '取消' },
        confirm: { title: '确定要取消吗？' },
      },
      {
        key: 'del',
        hidden: ({ editing, record }) =>
          !editing || rowState.status(record, ['remove', 'create', 'update']),
        props: { children: '删除' },
      },
      {
        key: 'copyUp',
        hidden: ({ editing, record }) =>
          !editing || rowState.status(record, ['remove', 'create', 'update']),
        props: { children: '复制' },
      },
    ],
  },
};
