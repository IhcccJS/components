import React from 'react';
import { Space, Button } from 'antd';
import { Card, EditTableRow } from '@ihccc/components';
import columns from './columns';
import defaultData from './defaultData';

const getInitialRow = () => ({ id: '_uid_' + Date.now().toString(36) });

function Demo() {
  const [dataSource, setDataSource] = React.useState(defaultData);
  const [editing, setEditing] = React.useState(false);
  const etRef = React.useRef();

  React.useEffect(() => {
    console.log(dataSource);
  }, [dataSource]);

  return (
    <Card
      extra={
        <Space>
          <Button
            type="primary"
            onClick={() => {
              const row = getInitialRow();
              etRef.current.action.unshiftAndEdit(row, row.id);
            }}
          >
            顶部新增
          </Button>
          <Button
            type="primary"
            onClick={() => {
              const row = getInitialRow();
              etRef.current.action.pushAndEdit(row, row.id);
            }}
          >
            底部新增
          </Button>
        </Space>
      }
    >
      <EditTableRow
        ref={etRef}
        table={{
          size: 'small',
          pagination: { size: 'small', style: { marginBottom: 0 } },
        }}
        columns={columns}
        dataSource={dataSource}
        onChange={setDataSource}
        editing={editing}
        onEditingChange={setEditing}
        rowKey="id"
      />
    </Card>
  );
}

export default Demo;
