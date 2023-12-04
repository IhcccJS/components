import './global';
import React from 'react';
import { CommonForm as Form, BaseList, Detail } from '@ihccc/components';
// import CustomList from './CustomList';
import columns, { actionColumn } from './columns';
import { ee, getInitialValues } from './page.config';
import * as services from './_services';
import '@ihccc/components/lib/style/color.less';

// 搜索栏组件
function SearchForm({ columns, ...props }) {
  return (
    <BaseList.Searcher {...props} foldAble>
      <Form name="search_panel" columns={columns} />
    </BaseList.Searcher>
  );
}

// 更新窗口组件
const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 14 },
};

const group = [
  ['name', 'username', 'phone'],
  ['sex', 'enable'],
];

const relation = [
  { from: 'name', to: 'username', disabled: (val) => val === 'abc' },
  { from: 'name', to: 'username', value: (val) => val },
  { from: 'username', to: 'name', hide: (val) => !val },
];

function UpdateModal(props) {
  return (
    <BaseList.Updater
      {...props}
      title={{ create: '新增信息', update: '编辑信息' }}
      steps={['第一步', '第二步']}
    >
      <Form
        name="update"
        itemProps={layout}
        relation={relation}
        columns={columns}
        group={group}
      />
    </BaseList.Updater>
  );
}

// 详情
function ProfileModal(props) {
  return (
    <BaseList.Profiler {...props} width={720}>
      <Detail columns={columns} column={2} />
    </BaseList.Profiler>
  );
}

// 页面列表
function Demo() {
  const [selectedRowKeys, setSelectedRowKeys] = React.useState([]);
  const { state, action } = BaseList.useList({
    services: services,
    defaultParams: { username: 'a' },
  });

  console.log(selectedRowKeys);

  return (
    <BaseList
      size="small"
      // showIndex={false}
      state={state}
      action={action}
      columns={columns}
      actionColumn={actionColumn}
      searchRender={(props) => <SearchForm {...props} />}
      popups={[
        <UpdateModal initialValues={getInitialValues} key="update" />,
        <ProfileModal key="profile" />,
      ]}
      behaviors={{
        create: 'update',
        update: 'update',
        profile: 'profile',
      }}
      rowSelection={{
        // type: 'radio',
        selectedRowKeys: selectedRowKeys,
        onChange: setSelectedRowKeys,
      }}
      eventEmitter={ee}
      rowKey="id"
    >
      {/* <BaseList.RowSelectionAble>
        <CustomList />
      </BaseList.RowSelectionAble> */}
    </BaseList>
  );
}

export default Demo;
