import React from 'react';
import { Space, Button } from 'antd';
import { Card, EditTableRow } from '@ihccc/components';
import columns, { eventMap, actionButtons } from './columns';
import defaultData from './defaultData';

const getInitialRow = () => ({ id: '_uid_' + Date.now().toString(36) });

function Demo() {
  const [dataSource, setDataSource] = React.useState(defaultData);
  const [editing, setEditing] = React.useState(false);
  const etRef = React.useRef();

  React.useEffect(() => {
    console.log(dataSource);
  }, [dataSource]);

  const addToStart = () => {
    const row = getInitialRow();
    etRef.current.action.unshiftAndEdit(row, row.id);
  };

  const addToEnd = () => {
    const row = getInitialRow();
    etRef.current.action.pushAndEdit(row, row.id);
  };

  return (
    <Card
      extra={
        <Space>
          <Button type="primary" onClick={addToStart}>
            顶部新增
          </Button>
          <Button type="primary" onClick={addToEnd}>
            底部新增
          </Button>
        </Space>
      }
    >
      <EditTableRow
        ref={etRef}
        columns={columns}
        eventMap={eventMap}
        actionColumn={{ width: 'xl' }}
        actionButtons={actionButtons}
        dataSource={dataSource}
        onChange={setDataSource}
        editing={editing}
        onEditingChange={setEditing}
        table={{
          size: 'small',
          pagination: { size: 'small', style: { marginBottom: 0 } },
        }}
        rowKey="id"
      />
    </Card>
  );
}

export default Demo;
