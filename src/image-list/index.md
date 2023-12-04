---
title: 图片列表 ImageList
nav:
  title: 组件
  order: 2
group: 
  title: display
  order: 2
toc: content
---

# ImageList 图片列表

## 简单上手

```jsx
import React from 'react';
import { ImageList } from '@ihccc/components';
import '@ihccc/components/lib/style/color.less';

function Demo() {
  return <ImageList data={['https://picsum.photos/400?t=1', 'https://picsum.photos/400?t=2']} />;
}

export default Demo;
```

## 使用 `extra` 添加额外的内容

可以在加载失败时显示图像占位符

```jsx
import React from 'react';
import { ImageList } from '@ihccc/components';
import '@ihccc/components/lib/style/color.less';

function Demo() {
  return (
    <div>
      <ImageList
        size="small"
        data={['https://picsum.photos/400?t=1', 'https://picsum.photos/400?t=2']}
        extra={<ImageList.Item> 查看更多 </ImageList.Item>}
      />
      <ImageList
        size="small"
        data={['https://picsum.photos/400?t=1', 'https://picsum.photos/400?t=2']}
        getSource={(item) => window.location.origin + item}
        fallback="https://picsum.photos/400"
        extra={<ImageList.Item> + </ImageList.Item>}
      />
    </div>
  );
}

export default Demo;
```

## 使用 `itemExtra` 在每个元素上添加额外的内容

```jsx
import React from 'react';
import { ImageList } from '@ihccc/components';
import '@ihccc/components/lib/style/color.less';

const extraStyle = {
  position: 'absolute',
  left: 0,
  right: 0,
  bottom: 0,
  height: 20,
  lineHeight: '20px',
  textAlign: 'center',
  background: 'rgba(0, 0, 0, 0.7)',
  color: '#fff',
};

function Demo() {
  return (
    <ImageList
      size="small"
      data={['胖虎', '小夫']}
      getSource={(item) => `${window.location.origin}/${item}.jpg`}
      itemExtra={(item, index) => (
        <div style={extraStyle}>{`${index + 1} - ${item}`}</div>
      )}
    />
  );
}

export default Demo;
```

## 使用 `children` 实现自定义的渲染

```jsx
import React from 'react';
import { FilePdfOutlined } from '@ant-design/icons';
import { ImageList } from '@ihccc/components';
import '@ihccc/components/lib/style/color.less';

const centerStyle = {
  flex: 1,
  textAlign: 'center',
  lineHeight: '72px',
};

const previewStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  background: '#f5f5f5',
  padding: 4,
  marginRight: 16,
  width: 92,
  height: 64,
  overflow: 'hidden',
};

const itemStyle = {
  display: 'flex',
  alignItems: 'center',
  border: '1px solid #d9d9d9',
  padding: 4,
  marginRight: 12,
  marginBottom: 12,
  width: 400,
};

const CustomItem = ({ index, item, children, ...restProps }) => {
  const container = React.useMemo(() => {
    if (!item) return <div style={centerStyle}>{children}</div>;
    return (
      <React.Fragment>
        <div style={previewStyle}>
          {/image/g.test(item.type) ? (
            children
          ) : (
            <FilePdfOutlined style={{ fontSize: 32 }} />
          )}
        </div>
        <div>{`${index + 1} - ${item.path}`}</div>
        <div style={{ marginLeft: 12, fontWeight: 'bold' }}>{item.size}</div>
      </React.Fragment>
    );
  }, [item]);

  return (
    <div title={item && item.type} style={itemStyle} {...restProps}>
      {container}
    </div>
  );
};

function Demo() {
  const data = [
    {
      name: '哆啦A梦',
      path: 'https://picsum.photos/400?t=1',
      type: 'image/png',
      size: '100 KB',
    },
    { name: '小夫', path: 'https://picsum.photos/400?t=2', type: 'image/jpg', size: '110 KB' },
    { name: '大雄', path: '/xx.pdf', type: 'document/pdf', size: '1.2 MB' },
  ];

  return (
    <ImageList
      size="small"
      data={data}
      getSource={(file) => file.path}
      extra={<CustomItem> 查看更多 </CustomItem>}
      // style={{ flexDirection: 'column' }}
    >
      <CustomItem />
    </ImageList>
  );
}

export default Demo;
```

## ImageList Props

| 名称      | 类型        | 默认值               | 描述                                                   |
| :-------- | :---------- | :------------------- | :----------------------------------------------------- |
| size      | `string`    | `middle`             | 组件尺寸 （`small \| middle \| large`）                |
| data      | `array`     | `[]`                 | 文件列表                                               |
| getSource | `function`  | `(item) => item`     | 传入默认值时，需要返回图片所在的字段                   |
| fallback  | `string`    | 默认图片             | 图片加载失败时的占位图，可以配置静态图片和 base64 图片 |
| extra     | `ReactNode` | `undefined`          | 列表内额外的内容                                       |
| itemExtra | `function`  | `undefined`          | 每个渲染元素上额外的内容                               |
| children  | `ReactNode` | `<ImageList.Item />` | 渲染元素                                               |

## ImageList.Item Props

| 名称     | 类型        | 默认值      | 描述                                    |
| :------- | :---------- | :---------- | :-------------------------------------- |
| item     | `any`       | `undefined` | ImageList 组件属性 `data` 的元素        |
| index    | `number`    | `undefined` | ImageList 组件属性 `data` 的索引        |
| size     | `string`    | `middle`    | 组件尺寸 （`small \| middle \| large`） |
| extra    | `ReactNode` | `undefined` | 额外的内容                              |
| children | `ReactNode` | `undefined` | 渲染内容                                |
