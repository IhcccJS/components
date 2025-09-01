import React from 'react';
import { Card, EditTable } from '@ihccc/components';
import columns from './columns';
import defaultData from './defaultData';

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
    <Card>
      <EditTable
        ref={etRef}
        bordered
        size="small"
        columns={columns}
        dataSource={dataSource}
        onChange={setDataSource}
        editing={editing}
        onEditingChange={setEditing}
        table={{ rowKey: 'id' }}
        rowKey="id"
      />
    </Card>
  );
}

export default Demo;
