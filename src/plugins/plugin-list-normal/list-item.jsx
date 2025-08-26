import React from 'react';
import { List } from 'antd';

function ListItem({ data, index, columnsRender, selection, children, ...restProps }) {
  const { title, cover, avatar, description, action, item, float } = React.useMemo(() => {
    const element = columnsRender(data, index);
    const items = {
      title: element.getItemFirst('title').content,
      cover: element.getItemFirst('cover').content,
      avatar: element.getItemFirst('avatar').content,
      description: element.getItemFirst('description').content,
      action: element.getItem('action'),
      item: element.getItem('item'),
      float: element.getItem('float'),
    };
    return items;
  }, [columnsRender, data, index]);

  return (
    <List.Item
      {...restProps}
      actions={action.map((item) => (
        <div key={item.key}>
          {item.title}：{item.content}
        </div>
      ))}
      extra={
        cover
        // element.extra.length > 0 && (
        //   <Popover
        //     content={element.extra.map((item, i) => (
        //       <div style={{ marginTop: i === 0 ? 0 : 12 }} key={item.key}>
        //         {item.title}：{item.content}
        //       </div>
        //     ))}
        //   >
        //     <span>更多</span>
        //   </Popover>
        // )
      }
    >
      <List.Item.Meta avatar={avatar} title={title} description={description} />
      {item.map((item) => (
        <div style={{ marginTop: 12 }} key={item.key}>
          {item.title}：{item.content}
        </div>
      ))}
      {float.map((item) => (
        <div style={{ position: 'absolute', zIndex: 1, ...item.style }} key={item.key}>
          {item.content}
        </div>
      ))}
      {children}
    </List.Item>
  );
}

export default ListItem;
