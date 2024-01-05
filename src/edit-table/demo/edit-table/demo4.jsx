import React from 'react';
import { Card } from 'antd';
import { EditTable } from '@ihccc/components';
import { useApi } from '@ihccc/hooks';
import columns from './users/columns';
import * as services from './users/_services';

const onCreate = async (item) => {
  try {
    const result = await services.create(item);
    if (result.code === '0') return { success: true, message: '新增成功' };
    throw new Error('error');
  } catch (error) {
    return { success: false, message: '新增失败！' };
  }
};

const onUpdate = async (item) => {
  try {
    const result = await services.update(item);
    if (result.code === '0') return { success: true, message: '更新成功' };
    throw new Error('error');
  } catch (error) {
    return { success: false, message: '更新失败！' };
  }
};

const onRemove = async (item) => {
  try {
    const result = await services.remove(item);
    if (result.code === '0') return { success: true, message: '删除成功' };
    throw new Error('error');
  } catch (error) {
    return { success: false, message: '删除失败！' };
  }
};

function Demo() {
  const list = useApi(services.list, {
    auto: true,
    initialData: [],
    format: (res) =>
      (res.list || []).map((item) => ({
        ...item,
        tags: !item.tags ? [] : item.tags.split(','),
      })),
  });

  const onAction = async (action, item) => {
    if (!!item.tags) item.tags = item.tags.join(',');
    let result;
    if (action === 'create') result = await onCreate(item);
    if (action === 'update') result = await onUpdate(item);
    if (action === 'remove') result = await onRemove(item);
    return result;
  };

  return (
    <Card>
      <EditTable.EditSummary
        loading={list.loading}
        size="small"
        columns={columns}
        dataSource={list.data}
        onAction={onAction}
        onSuccess={list.refresh}
      />
    </Card>
  );
}

export default Demo;
