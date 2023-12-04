---
title: 缓动动画 CssMotion
nav:
  title: 组件
  order: 2
group: 
  title: display
  order: 2
---

# CssMotion 缓动动画

用于动态展示内容，只适用于一些简单场景，需要复杂动效，可以参考 [Ant Motion](https://motion.ant.design/) 动画库

## 组件挂载执行

```jsx
import React from 'react';
import { Space, Button } from 'antd';
import { CssMotion } from '@ihccc/components';

const Block = () => (
  <div
    style={{
      width: 120,
      height: 100,
      background: 'linear-gradient(135deg, #9c27b0, #2196f3)',
      borderRadius: 6,
    }}
  />
);

function Demo() {
  const [enable, setEnable] = React.useState(true);

  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <Button type="primary" onClick={() => setEnable((e) => !e)}>
          Switch
        </Button>
      </div>
      {enable && (
        <Space size="large">
          <CssMotion style={{ display: 'inline-block' }}>
            <Block />
          </CssMotion>
          <CssMotion delay={200} style={{ display: 'inline-block' }}>
            <Block />
          </CssMotion>
          <CssMotion delay={400} style={{ display: 'inline-block' }}>
            <Block />
          </CssMotion>
        </Space>
      )}
    </div>
  );
}

export default Demo;
```

## 切换

```jsx
import React from 'react';
import { Space, Button } from 'antd';
import { CssMotion } from '@ihccc/components';

const Block = () => (
  <div
    style={{
      width: 120,
      height: 100,
      background: 'linear-gradient(135deg, #e91e63, #ffc107)',
      borderRadius: 6,
    }}
  />
);

function Demo() {
  const [enable, setEnable] = React.useState(true);

  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <Button type="primary" onClick={() => setEnable((e) => !e)}>
          Switch
        </Button>
      </div>
      <Space size="large">
        <CssMotion enable={enable} style={{ display: 'inline-block' }}>
          <Block />
        </CssMotion>
        <CssMotion
          enable={enable}
          delay={200}
          style={{ display: 'inline-block' }}
        >
          <Block />
        </CssMotion>
        <CssMotion
          enable={enable}
          delay={400}
          style={{ display: 'inline-block' }}
        >
          <Block />
        </CssMotion>
      </Space>
    </div>
  );
}

export default Demo;
```

## 不同的动画

```jsx
import React from 'react';
import { Space, Button, Checkbox, Radio } from 'antd';
import { CssMotion } from '@ihccc/components';

const Block = () => (
  <div
    style={{
      width: 120,
      height: 100,
      background: 'linear-gradient(135deg, #009688, #00bcd4)',
      borderRadius: 6,
    }}
  />
);

const motions = [
  'fade',
  'zoom',
  'flipX',
  'flipY',
  'left',
  'right',
  'top',
  'bottom',
];

const easings = [
  'ease',
  'ease-in',
  'ease-out',
  'ease-in-out',
  'linear',
  'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  'cubic-bezier(0.6, -0.28, 0.735, 0.045)',
  'steps(3, end)',
];

function Demo() {
  const [enable, setEnable] = React.useState(true);
  const [motion, setMotion] = React.useState('fade');
  const [easing, setEasing] = React.useState('ease');

  const motionProps = { enable, motion, easing };

  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <Button type="primary" onClick={() => setEnable((e) => !e)}>
          Switch
        </Button>
      </div>
      <div style={{ marginBottom: 20 }}>
        <Checkbox.Group
          options={motions}
          onChange={(checkedValue) => setMotion(checkedValue.join(' '))}
        />
      </div>
      <div style={{ marginBottom: 20 }}>
        <Radio.Group
          options={easings}
          onChange={(e) => setEasing(e.target.value)}
        />
      </div>
      <Space size="large">
        <CssMotion {...motionProps} style={{ display: 'inline-block' }}>
          <Block />
        </CssMotion>
        <CssMotion {...motionProps} style={{ display: 'inline-block' }}>
          <Block />
        </CssMotion>
        <CssMotion {...motionProps} style={{ display: 'inline-block' }}>
          <Block />
        </CssMotion>
      </Space>
    </div>
  );
}

export default Demo;
```

## CssMotion props

| 名称      | 类型        | 默认值      | 描述                                                                          |
| :-------- | :---------- | :---------- | :---------------------------------------------------------------------------- |
| className | `string`    | `undefined` | 样式类名                                                                      |
| enable    | `boolean`   | `undefined` | 是否启用                                                                      |
| motion    | `string`    | `fade`      | 缓动动画，配置多个，使用空格间隔，`zoom`，`flip`，`left`等 同时使用不会有效果 |
| duration  | `number`    | `1000`      | 缓动执行时间，同 Css 属性 `transition-duration`，单位 `ms`                    |
| delay     | `number`    | `0`         | 缓动延迟时间，同 Css 属性 `transition-delay`，单位 `ms`                       |
| easing    | `string`    | `undefined` | 缓动函数，同 Css 属性 `transition-timing-function`                            |
| style     | `object`    | `undefined` | 样式                                                                          |
| children  | `ReactNode` | `undefined` | 内容子元素                                                                    |

motion 支持的配置有

```js
const motions = [
  'fade',
  'zoom',
  'flipX',
  'flipY',
  'left',
  'right',
  'top',
  'bottom',
];
```
