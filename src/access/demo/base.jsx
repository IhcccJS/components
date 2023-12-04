import { Space, Button } from 'antd';
import { Access, ButtonList } from '@ihccc/components';
import { searchAction, listAction } from './buttons';

const accessData = [
  { name: 'search-action', key: 'search', status: 'visible' },
  { name: 'list-action', key: 'update', status: 'disabled' },
  { name: 'list-action', key: 'enable', status: 'visible' },
  { name: 'list-action', key: 'examine', status: 'disabled' },
  { name: 'list-action', key: 'confirm', status: 'disabled' },
  { key: 'hiddenButton', status: 'hidden' },
  { key: 'disabledButton', status: 'disabled' },
];

function Demo() {
  return (
    <Access.System
      data={accessData}
      // handlers={{ buttonList: buttonListHandler }}
    >
      <Space direction="vertical">
        <ButtonList access="search-action" buttons={searchAction} />
        <ButtonList access="list-action" buttons={listAction} />
        <Access akey="hiddenButton">
          <Button>隐藏的按钮</Button>
        </Access>
        <Access akey="disabledButton">
          <Button>禁用的按钮</Button>
        </Access>
      </Space>
    </Access.System>
  );
}

export default Demo;
