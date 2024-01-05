import React from 'react';
import { UnorderedListOutlined } from '@ant-design/icons';
import { Card, List } from 'antd';

function formatColumns(columns) {
  const renderColumns = {};

  for (let index = 0; index < columns.length; index++) {
    const element = columns[index];
    if (element.listRender) {
      const role = element.listRender.as;
      renderColumns[role] = element;
    }
  }

  return (item, index) => {
    return renderColumns;
  };
}

function ListRender({ columns, grid, dataSource, ...restProps }) {
  const columnRender = React.useMemo(() => formatColumns(columns), [columns]);

  return (
    <List
      {...restProps}
      grid={{
        gutter: 16,
        xs: 1,
        sm: 2,
        md: 4,
        lg: 4,
        xl: 6,
        xxl: 3,
        ...grid,
      }}
      dataSource={dataSource}
      renderItem={(item, index) => {
        return (
          <List.Item>
            <Card title={columnRender.title}>
              {/* {columnRender.description}
              {columnRender.time}
              {columnRender.badge}
              {columnRender.ribbon}
              {columnRender.progress}
              {columnRender.items}
              {columnRender.avatar}
              {columnRender.cover} */}
            </Card>
          </List.Item>
        );
      }}
    />
  );
}

const OPTION = {
  key: 'listRender',
  icon: <UnorderedListOutlined />,
  label: '列表',
  tip: '列表',
  render: ListRender,
};

ListRender.OPTION = OPTION;

export default ListRender;
