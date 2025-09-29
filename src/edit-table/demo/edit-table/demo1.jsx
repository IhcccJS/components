import React from 'react';
import { Space, Button } from 'antd';
import { Card, EditTableAll } from '@ihccc/components';
import columns from './columns';
import defaultData from './defaultData';

const getInitialRow = () => ({ id: '_uid_' + Date.now().toString(36) });

function Demo() {
  const [dataSource, setDataSource] = React.useState(defaultData);
  const [editing, setEditing] = React.useState(true);
  const etRef = React.useRef();

  React.useEffect(() => {
    console.log(etRef);
  }, []);

  React.useEffect(() => {
    console.log(dataSource);
  }, [dataSource]);

  return (
    <Card
      extra={
        editing ? (
          <Space>
            <Button type="primary" onClick={() => etRef.current.action.save()}>
              保存
            </Button>
            <Button onClick={() => etRef.current.action.cancel()}>取消</Button>
          </Space>
        ) : (
          <Space>
            <Button onClick={() => etRef.current.action.pushAndEdit(getInitialRow())}>新增</Button>
            <Button onClick={() => etRef.current.action.edit()}>编辑</Button>
          </Space>
        )
        // <Button onClick={() => etRef.current.action.pushAndEdit(getInitialRow())}>新增</Button>
      }
    >
      <EditTableAll
        ref={etRef}
        columns={columns}
        dataSource={dataSource}
        onChange={setDataSource}
        editing={editing}
        onEditingChange={setEditing}
        table={{
          bordered: true,
          size: 'small',
          pagination: { size: 'small', style: { marginBottom: 0 } },
        }}
        rowKey="id"
      />
    </Card>
  );
}

export default Demo;
