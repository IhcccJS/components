import React from 'react';
import './global';
import { ListOfCustom, Card } from '@ihccc/components';
import columns from './columns/role';
import { query } from './services/role';
import './index.less';

const format = (res) => res.data || { list: [], total: 0 };

function RenderList({ request }) {
  const { list } = request.data;

  if (list.length === 0) return '暂无数据';

  return list.map((item) => <Card className="change-list-item-card-bg" title={item.name} extra={item.key} key={item.id} />);
}

function Demo() {
  return (
    <ListOfCustom namespace="roleList2" query={query} request={{ format }} columns={columns}>
      <RenderList request />
    </ListOfCustom>
  );
}

export default Demo;
