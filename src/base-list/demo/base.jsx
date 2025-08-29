import React from 'react';
import './gloabl';
import { ListOfTable } from '@ihccc/components';
import columns, { actionButtons } from './columns/role';
import { query, remove } from './services/role';
import './index.less';

const format = (res) => res.data || { list: [], total: 0 };

const buttons = [
  {
    key: 'tableRender',
    group: 'switchRender',
    props: ({ renderType }) => ({
      type: renderType === 'table' ? 'primary' : 'dashed',
      children: '表格',
    }),
  },
  {
    key: 'cardRender',
    group: 'switchRender',
    props: ({ renderType }) => ({
      type: renderType === 'card' ? 'primary' : 'dashed',
      children: '卡片',
    }),
  },
];

const eventMap = {
  tableRender: ({ setRenderType }) => setRenderType('table'),
  cardRender: ({ setRenderType }) => setRenderType('card'),
};

const command = {
  profile: 'global/role-profile',
  create: 'global/role-update',
  update: 'global/role-update',
  remove,
};

function RenderList({ renderType, content }) {
  if (renderType === 'card') return content[1];
  return content[0];
}

function Demo() {
  const [renderType, setRenderType] = React.useState('table');

  return (
    <ListOfTable
      namespace="role"
      query={query}
      request={{ format }}
      columns={columns}
      eventData={{ renderType, setRenderType }}
      eventMap={eventMap}
      command={command}
      extraButtons={{ buttons }}
      actionColumn={{ listRender: { as: 'item' } }}
      actionButtons={{ buttons: actionButtons }}
      table={{ size: 'small', scroll: { x: 'max-content' } }}
      list={{ grid: { gutter: 16, xs: 1, sm: 2, md: 3, lg: 3, xl: 4, xxl: 5 } }}
      renderList={{
        type: renderType,
        itemProps: () => ({ className: 'change-list-item-card-bg' }),
      }}
      childrenRenderMode="none"
      rowKey="id"
    >
      <RenderList renderType={renderType} content />
    </ListOfTable>
  );
}

export default Demo;
