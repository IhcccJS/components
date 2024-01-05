import './global';
import React from 'react';
import { Button } from 'antd';
import { BaseList } from '@ihccc/components';
// import CustomList from './CustomList';
import columns, { actionColumn } from './columns';
import { getInitialValues } from './page.config';
import * as services from './_services';
import '@ihccc/components/lib/style/color.less';

const group = [
  ['name', 'username', 'phone'],
  ['sex', 'enable'],
];

const relation = [{ from: 'name', to: 'username', value: (val) => val }];

const updateProps = {
  title: { create: '新增信息', update: '编辑信息' },
  steps: ['第一步', '第二步'],
  initialValues: getInitialValues,
  formProps: {
    itemProps: {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
    },
    relation: relation,
    columns: columns,
    group: group,
  },
};

const pageEventMap = {
  profile: async function ({ ee, value, record }) {
    const data = await getInitialValues(record.id);
    ee.emit('popup', {
      type: 'profile',
      title: value + ' - 详细信息',
      initialValues: data,
    });
  },
  update: async ({ ee, record }) => {
    const data = await getInitialValues(record.id);
    ee.emit('popup', { type: 'update', initialValues: data });
  },
  remove: ({ ee, record }) => {
    ee.emit('action/remove', record);
  },
};

// 页面列表
function Demo() {
  // const [selectedRowKeys, setSelectedRowKeys] = React.useState([]);
  const { state, action } = BaseList.useList({
    namespace: 'user',
    services: services,
    // defaultParams: { username: 'a' },
  });

  return (
    <div style={{ padding: 20 }}>
      <BaseList
        size="small"
        // showIndex={false}
        state={state}
        action={action}
        columns={columns}
        actionColumn={actionColumn}
        columnsEditor={{}}
        // extraButtons={({ list, buttons }) => []}
        searchRender={(props) => <BaseList.SearchForm {...props} foldAble />}
        popups={[
          <BaseList.UpdateModal {...updateProps} key="update" />,
          <BaseList.ProfileModal
            column={2}
            columns={columns}
            layout="horizontal"
            key="profile"
          />,
        ]}
        behaviors={{ create: 'update' }}
        eventMap={pageEventMap}
        // rowSelection={{
        //   // type: 'radio',
        //   selectedRowKeys: selectedRowKeys,
        //   onChange: setSelectedRowKeys,
        // }}
        rowKey="id"
      >
        {/* <BaseList.RowSelectionAble>
        <CustomList />
      </BaseList.RowSelectionAble> */}
      </BaseList>
    </div>
  );
}

function Page() {
  const [show, setShow] = React.useState(true);

  return (
    <BaseList.StateCenter>
      <Button type="link" onClick={() => setShow(!show)}>
        {show ? '销毁' : '显示'}
      </Button>
      {show && <Demo />}
    </BaseList.StateCenter>
  );
}

export default Page;
