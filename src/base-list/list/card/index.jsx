import React from 'react';
import { List, Card } from 'antd';

function CardList(props) {
  const { dataSource, grid, columns } = props;

  return (
    <List
      grid={{ gutter: 16, column: 4, ...grid }}
      dataSource={dataSource}
      renderItem={(item) => (
        <List.Item>
          <Card title={item.title}>Card content</Card>
        </List.Item>
      )}
    />
  );
}

export default CardList;
