import React from 'react';
import { Card, Divider, Button } from 'antd';
import { EditTable } from '@ihccc/components';
import columns from './columns';
import defaultData from './defaultData';

function Demo() {
  const [dataSource, setDataSource] = React.useState(defaultData);
  const [editing, setEditing] = React.useState(false);
  const etRef = React.useRef();

  React.useEffect(() => {
    console.log(etRef);
  }, []);

  React.useEffect(() => {
    console.log(dataSource);
  }, [dataSource]);

  const margeColumns = React.useMemo(
    () =>
      columns.concat({
        title: '操作',
        width: 'lg',
        fixed: 'right',
        key: 'action',
        render: (_, record, index) => {
          const isEdit = editing === record.id;
          return (
            <div>
              {!isEdit && (
                <a onClick={() => etRef.current?.edit(record.id)}>编辑</a>
              )}
              {isEdit && <a onClick={() => etRef.current?.save()}>保存</a>}
              {isEdit && <Divider type="vertical" />}
              {isEdit && <a onClick={() => etRef.current?.cancel()}>取消</a>}
              <Divider type="vertical" />
              <a onClick={() => etRef.current?.remove(index)}>删除</a>
              <Divider type="vertical" />
              <a onClick={() => etRef.current?.copyToEnd(record)}>复制</a>
            </div>
          );
        },
      }),
    [editing],
  );

  const insertButton = (
    <Button
      block
      size="small"
      type="dashed"
      onClick={() => etRef.current?.addToEnd()}
    >
      添加
    </Button>
  );

  return (
    <Card
      title="编辑表格"
      extra={<a onClick={() => etRef.current?.clear()}>清空</a>}
    >
      <EditTable
        ref={etRef}
        size="small"
        columns={margeColumns}
        footer={() => insertButton}
        dataSource={dataSource}
        onChange={setDataSource}
        editing={editing}
        onEditingChange={setEditing}
      />
    </Card>
  );
}

export default Demo;
