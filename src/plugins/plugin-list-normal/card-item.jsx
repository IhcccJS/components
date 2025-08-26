import React from 'react';
import { List, Popover } from 'antd';
import Card from '@/components/@dev/card';

function CardItem({ data, index, columnsRender, selection, children, ...restProps }) {
  const { title, cover, avatar, name, description, extra, action, item, float } = React.useMemo(() => {
    const element = columnsRender(data, index);

    const items = {
      title: element.getItemFirst('title').content,
      cover: element.getItemFirst('cover').content,
      avatar: element.getItemFirst('avatar').content,
      name: element.getItemFirst('name').content,
      description: element.getItemFirst('description').content,
      extra: element.getItem('extra'),
      action: element.getItem('action'),
      item: element.getItem('item'),
      float: element.getItem('float'),
    };
    return items;
  }, [columnsRender, data, index]);

  return (
    <List.Item>
      <Card
        {...restProps}
        title={title}
        cover={cover}
        extra={
          extra.length > 0 && (
            <Popover
              content={extra.map((item, i) => (
                <div className={item.className} style={{ marginTop: i === 0 ? 0 : 12 }} key={item.key}>
                  {item.title && <span>{item.title}：</span>}
                  {item.content}
                </div>
              ))}
            >
              <span>更多</span>
            </Popover>
          )
        }
        actions={action.map((item) => (
          <React.Fragment key={item.key}>{item.content}</React.Fragment>
        ))}
      >
        <Card.Meta avatar={avatar} title={name} description={description} />
        {item.map((item) => (
          <div className={item.className} style={{ marginTop: 'var(--size-cell-gap-sm, 12px)' }} key={item.key}>
            {item.title && <span>{item.title}：</span>}
            {item.content}
          </div>
        ))}
        {float.map((item) => (
          <div style={{ position: 'absolute', zIndex: 1, ...item.style }} key={item.key}>
            {item.content}
          </div>
        ))}
        {children}
      </Card>
    </List.Item>
  );
}

export default CardItem;
