import React from 'react';
import { Card } from 'antd';
import { EditTable } from '@ihccc/components';
import columns from './columns';
import defaultData from './defaultData';

function Demo() {
  const [dataSource, setDataSource] = React.useState(defaultData);
  const [editing, setEditing] = React.useState(false);
  const etRef = React.useRef();

  React.useEffect(() => {
    console.log(dataSource);
  }, [dataSource]);

  return (
    <Card>
      <EditTable.EditRow
        ref={etRef}
        size="small"
        columns={columns}
        dataSource={dataSource}
        onChange={setDataSource}
        editing={editing}
        onEditingChange={setEditing}
      />
    </Card>
  );
}

export default Demo;
