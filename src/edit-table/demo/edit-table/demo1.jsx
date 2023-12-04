import React from 'react';
import { Card, Divider } from 'antd';
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
          return (
            <div>
              <a onClick={() => etRef.current?.remove(index)}>删除</a>
              <Divider type="vertical" />
              <a onClick={() => etRef.current?.copyToStart(record)}>复制 ▲</a>
              <Divider type="vertical" />
              <a onClick={() => etRef.current?.copyToEnd(record)}>复制 ▼</a>
            </div>
          );
        },
      }),
    [],
  );

  return (
    <Card
      title="编辑表格"
      extra={
        <React.Fragment>
          <a onClick={() => etRef.current?.addToStart()}>新增到顶部</a>
          <Divider type="vertical" />
          <a onClick={() => etRef.current?.addToEnd()}>新增到底部</a>
          <Divider type="vertical" />
          {editing ? (
            <React.Fragment>
              <a onClick={() => etRef.current?.save()}>保存</a>
              <Divider type="vertical" />
              <a onClick={() => etRef.current?.cancel()}>取消</a>
            </React.Fragment>
          ) : (
            <a onClick={() => etRef.current?.editAll()}>编辑</a>
          )}
          <Divider type="vertical" />
          <a onClick={() => etRef.current?.clear()}>清空</a>
        </React.Fragment>
      }
    >
      <EditTable
        ref={etRef}
        bordered
        size="small"
        columns={margeColumns}
        dataSource={dataSource}
        onChange={setDataSource}
        editing={editing}
        onEditingChange={setEditing}
      />
    </Card>
  );
}

export default Demo;
