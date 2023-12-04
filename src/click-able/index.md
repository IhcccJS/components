---
title: 可点击指示 ClickAble
nav:
  title: 组件
  order: 2
group:
  title: container
  order: 1
toc: content
---

# ClickAble 可点击指示

## 简单上手

用于指示一个页面元素是可以点击的，它需要具有`onClick`属性

```jsx
import React from 'react';
import { Space, Tag, message } from 'antd';
import { ClickAble } from '@ihccc/components';

function Demo() {
  const tip = () => message.success('点击了一个元素！');

  return (
    <Space>
      <ClickAble
        onClick={tip}
        style={{
          color: '#f00',
          border: '1px solid currentColor',
          padding: '4px 8px',
        }}
      >
        可点击文字（span元素）
      </ClickAble>
      <ClickAble.Div
        onClick={tip}
        style={{ color: '#fff', background: '#00f', padding: '4px 8px' }}
      >
        可点击文字（div元素）
      </ClickAble.Div>
      <ClickAble element={Tag} title="可点击按钮" color="green" onClick={tip}>
        可点击按钮
      </ClickAble>
    </Space>
  );
}

export default Demo;
```
