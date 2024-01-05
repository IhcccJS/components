import React from 'react';
import { Card, Avatar, List } from 'antd';
import { LazyRender } from '@ihccc/components';

const list = Array(100)
  .fill('')
  .map((_, i) => i);

function Demo() {
  const { data, lazyFooter } = LazyRender.useLazyList(list, {
    start: 8,
    step: 4,
    threshold: 100,
  });

  return (
    <Card
      styles={{
        body: { background: '#f1f1f1', height: 400, overflowY: 'scroll' },
      }}
    >
      <List
        grid={{ column: 2, gutter: 16 }}
        itemLayout="horizontal"
        dataSource={data}
        renderItem={(key) => (
          <List.Item key={key}>
            <Card>
              <Card.Meta
                avatar={
                  <Avatar
                    src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${key}`}
                  />
                }
                title={`Title ${key}`}
                description="This is the description"
              />
            </Card>
          </List.Item>
        )}
      />
      {lazyFooter}
    </Card>
  );
}

export default Demo;
