---
title: 方法弹窗 funcModal
nav:
  title: 组件
  order: 2
group: 
  title: container
  order: 1
toc: content
---

# 方法弹窗 funcModal

使用方法调用弹窗，此方法只是对 `Antd Modal.info` 组件进行了样式修改

## 简单示例

```jsx
import React from 'react';
import { Button } from 'antd';
import { funcModal } from '@ihccc/components';

function Demo() {
  function open() {
    return funcModal({
      title: '操作',
      extra: '提示',
      width: 960,
      content: (
        <div>
          <p>弹窗内容</p>
          <p>弹窗内容</p>
          <p>弹窗内容</p>
        </div>
      ),
    });
  }

  return <Button onClick={open}>打开弹窗</Button>;
}

export default Demo;
```
