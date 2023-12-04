import React from 'react';
import { BaseList } from '@ihccc/components';
import { ee, getInitialValues } from './page.config';

const defaultRender = BaseList.render.get(['default', 10]);

// 表单 和 table 列配置
const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
    width: 'md',
    profileRender: ['default', 10],
    colProps: { span: 2 },
    onClick: async () => {
      const data = await getInitialValues(record.id);
      ee.emit('popup', {
        type: 'profile',
        title: val + ' - 详细信息',
        initialValues: data,
      });
    },
    render: (val) => <a>{defaultRender?.(val)}</a>,
  },
  {
    title: '用户名',
    dataIndex: 'username',
    width: 'md',
  },
  {
    title: '联系方式',
    dataIndex: 'phone',
    width: 'md',
  },
  {
    title: '性别',
    dataIndex: 'sex',
    width: 'sm',
    inputNode: 'sex',
    render: 'sex',
  },
  {
    title: '用户状态',
    dataIndex: 'enable',
    width: 'md',
    render: ['formater', '状态'],
    inputNode: 'select',
    inputNodeProps: { options: '状态' },
  },
  {
    title: '新增时间',
    dataIndex: 'createTime',
    width: 'lg',
    visible: 'profile',
  },
  {
    title: '更新时间',
    dataIndex: 'updateTime',
    width: 'lg',
  },
];

export const actionColumn = {
  fixed: 'right',
  visible: 'list',
  buttonConfig: {
    type: 'a',
    buttons: [
      {
        key: 'update',
        group: 'group',
        props: { children: '编辑' },
        onClick: async (record) => {
          const data = await getInitialValues(record.id);
          ee.emit('popup', { type: 'update', initialValues: data });
        },
      },
      {
        key: 'remove',
        group: 'group',
        props: { children: '删除' },
        confirm: { title: '确认删除吗？', cancelText: '取消' },
        onConfirm: (record) => {
          ee.emit('action/remove', record);
        },
      },
    ],
  },
};

export default columns;
