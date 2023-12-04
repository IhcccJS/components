---
title: 弹窗 ModalWrapper
nav:
  title: 组件
  order: 2
group:
  title: container
  order: 1
toc: content
---

# ModalWrapper 弹窗

## 简单上手

使用弹窗，只需要将组件包裹在带有 onClick 的触发节点上，例如：Button

```jsx
import React from 'react';
import { Button } from 'antd';
import { ModalWrapper } from '@ihccc/components';

function Demo() {
  return (
    <ModalWrapper
      content={
        <div>
          <p>1、内容...</p>
          <p>2、内容...</p>
          <p>3、内容...</p>
        </div>
      }
    >
      <Button type="primary">打开弹窗</Button>
    </ModalWrapper>
  );
}

export default Demo;
```

## 显示和隐藏的回调

onBeforeVisible 和 onAfterVisible 是显示隐藏时，调用的回调方法，组件会向回调内传入当前显示隐藏的 open 控制变量。

```jsx
import React from 'react';
import { Button } from 'antd';
import { ModalWrapper } from '@ihccc/components';

function Demo() {
  const handleBeforeVisible = (open) => {
    console.log(open);
    // 当此回调 return false 时，将会阻止弹窗关闭和打开
    // return false;
  };

  const handleAfterVisible = (open) => {
    console.log(open);
  };

  return (
    <ModalWrapper
      title="有执行回调的弹窗"
      onBeforeVisible={handleBeforeVisible}
      onAfterVisible={handleAfterVisible}
      content={
        <div>
          <p>1、内容...</p>
          <p>2、内容...</p>
          <p>3、内容...</p>
        </div>
      }
    >
      <Button type="primary">打开弹窗</Button>
    </ModalWrapper>
  );
}

export default Demo;
```

## 更多按钮

leftButtons 和 rightButtons 可以在弹窗底部添加左侧按钮和右侧按钮。

```jsx
import React from 'react';
import { Button } from 'antd';
import { ModalWrapper } from '@ihccc/components';

function Demo() {
  return (
    <ModalWrapper
      leftButtons={[<Button key="reset">重置</Button>]}
      rightButtons={[
        <Button key="save">保存</Button>,
        <Button type="primary" key="submit">
          提交
        </Button>,
      ]}
      content={
        <div>
          <p>1、内容...</p>
          <p>2、内容...</p>
          <p>3、内容...</p>
        </div>
      }
    >
      <Button type="primary">打开弹窗</Button>
    </ModalWrapper>
  );
}

export default Demo;
```

## 获取弹窗控制方法

```jsx
import React from 'react';
import { Button } from 'antd';
import { ModalWrapper } from '@ihccc/components';

function Demo() {
  const [modal, setModal] = React.useState(null);

  return (
    <ModalWrapper
      getInstance={setModal}
      rightButtons={[
        <Button
          type="primary"
          onClick={() => modal.toggleVisible()}
          key="confirm"
        >
          确定
        </Button>,
      ]}
      content={
        <div>
          <p>1、内容...</p>
          <p>2、内容...</p>
          <p>3、内容...</p>
        </div>
      }
    >
      <Button type="primary">打开弹窗</Button>
    </ModalWrapper>
  );
}

export default Demo;
```

## Props

| name            | type        | default     | description                                                                                      |
| --------------- | ----------- | ----------- | ------------------------------------------------------------------------------------------------ |
| content         | `ReactNode` | `undefined` | 弹窗的内容                                                                                       |
| leftButtons     | `Array`     | `undefined` | 添加弹窗底部左侧额外按钮                                                                         |
| rightButtons    | `Array`     | `undefined` | 添加弹窗底部右侧额外按钮                                                                         |
| onBeforeVisible | `function`  | `undefined` | 在弹窗控制打开关闭前的回调，`function (newVisible) : any` 如果返回 `false`，弹窗就不会打开或关闭 |
| onAfterVisible  | `function`  | `undefined` | 在弹窗打开后的回调，`function (newVisible) : any`                                                |
| getInstance     | `function`  | `undefined` | 获取弹窗控制方法，`function ({ toggleVisible }) : any`                                           |
| children        | `ReactNode` | `undefined` | 弹窗事件触发节点                                                                                 |

> 更多配置 参考 [Antd Modal](https://ant.design/components/modal-cn/)
