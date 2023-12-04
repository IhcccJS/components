import React from 'react';
import { Space, Divider } from 'antd';
import { Access, ButtonList, Radio } from '@ihccc/components';
import { searchAction, listAction } from './buttons';
import { roleButtonList } from './handlers';

const accessData = [
  { role: 'admin', key: 'reset', status: 'visible' },
  { role: 'admin', key: 'search', status: 'visible' },
  { role: 'admin', key: 'update', status: 'visible' },
  { role: 'admin', key: 'remove', status: 'visible' },
  { role: 'admin', key: 'enable', status: 'visible' },
  { role: 'admin', key: 'examine', status: 'visible' },
  { role: 'admin', key: 'dissolve', status: 'visible' },
  { role: 'admin', key: 'confirm', status: 'visible' },
  { role: 'admin', key: 'nullify', status: 'visible' },
  { role: 'admin', key: 'timeline', status: 'visible' },

  // { role: 'common', key: 'reset', status: 'disabled' },
  { role: 'common', key: 'search', status: 'visible' },
  { role: 'common', key: 'update', status: 'visible' },
  { role: 'common', key: 'remove', status: 'disabled' },
  { role: 'common', key: 'enable', status: 'visible' },
  // { role: 'common', key: 'examine', status: 'disabled' },
  { role: 'common', key: 'dissolve', status: 'disabled' },
  // { role: 'common', key: 'confirm', status: 'disabled' },
  // { role: 'common', key: 'nullify', status: 'disabled' },
  { role: 'common', key: 'timeline', status: 'disabled' },

  { role: 'guest', key: 'reset', status: 'disabled' },
  { role: 'guest', key: 'search', status: 'disabled' },
  { role: 'guest', key: 'update', status: 'disabled' },
  { role: 'guest', key: 'remove', status: 'disabled' },
  { role: 'guest', key: 'enable', status: 'disabled' },
  { role: 'guest', key: 'examine', status: 'disabled' },
  { role: 'guest', key: 'dissolve', status: 'disabled' },
  { role: 'guest', key: 'confirm', status: 'disabled' },
  { role: 'guest', key: 'nullify', status: 'disabled' },
  { role: 'guest', key: 'timeline', status: 'disabled' },
];

const roleList = [
  { label: '管理员', value: 'admin' },
  { label: '普通用户', value: 'common' },
  { label: '游客', value: 'guest' },
];

function Demo() {
  const [role, setRole] = React.useState('admin');

  const data = React.useMemo(
    () => accessData.filter((item) => item.role === role),
    [role],
  );

  return (
    <Access.System data={data} handlers={{ buttonList: roleButtonList }}>
      {/* <Access.Lock name="search" keys={{ search: { status: 'visible' } }} />
      <Access.Lock name="list" keys={{ remove: { status: 'visible' } }} /> */}
      <Radio
        options={roleList}
        value={role}
        onChange={(e) => setRole(e.target.value)}
      />
      <Divider />
      <Space direction="vertical">
        <ButtonList access={'search'} buttons={searchAction} />
        <ButtonList access={'list'} buttons={listAction} />
      </Space>
    </Access.System>
  );
}

export default Demo;
