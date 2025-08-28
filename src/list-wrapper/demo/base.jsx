import React from 'react';
import { Button } from 'antd';
import { DataChecker } from '@ihccc/components';
import useData from './useData';

function List({ listData }) {
  return JSON.stringify(listData);
}

function Demo() {
  const { data, loading, load } = useData();

  return (
    <React.Fragment>
      <Button loading={loading} onClick={load}>
        加载
      </Button>

      <DataChecker alias="listData" data={data} loading={loading}>
        <List />
      </DataChecker>
    </React.Fragment>
  );
}

export default Demo;
