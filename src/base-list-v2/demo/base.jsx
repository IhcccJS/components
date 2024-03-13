import React from 'react';
import { BaseListV2 as BaseList } from '@ihccc/components';
import columns from './columns';
// import * as services from './_services';

const Table = BaseList.NormalTable;

// 移植 useList
// 组件内置，然后要提供一些方法，如请求方法，成功之后的 setData 方法等，便于在插件内调用
// 移植搜索栏组件

// 页面列表
function Demo() {
  // const { state, action } = BaseList.useList({
  //   services: services,
  //   defaultParams: { username: 'a' },
  // });

  return (
    <Table
      size="small"
      // showIndex={false}
      // state={state}
      // action={action}
      dataSource={[]}
      columns={columns}
      rowKey="id"
    />
  );
}

function GlobalDemo() {
  return (
    // <BaseList.StateCenter>
    <Demo />
    // </BaseList.StateCenter>
  );
}

export default GlobalDemo;
