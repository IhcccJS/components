---
title: 特征 Feature
nav:
  title: 组件
  order: 2
group: 
  title: display
  order: 2
toc: content
---

# Feature 特征

用于展示特殊的数据字段，如：状态值、标签值

## 简单上手

```jsx
import React from 'react';
import { Space, Button, Radio, message } from 'antd';
import { Feature } from '@ihccc/components';

function Demo() {
  const [animation, setAnimation] = React.useState(false);
  const [disabled, setDisabled] = React.useState(false);
  const [round, setRound] = React.useState(false);
  const [size, setSize] = React.useState('small');
  const [click, setClick] = React.useState(false);

  const modeArray = ['text', 'badge', 'tag', 'block'];

  const statusArray = [
    'default',
    'warning',
    'error',
    'success',
    'info',
    'other',
  ];

  const event = (info) => (click ? () => message.success(info) : undefined);

  return (
    <Space direction="vertical" size="large">
      {modeArray.map((mode) => (
        <Space size="large" key={mode}>
          {statusArray.map((status) => (
            <Feature
              label={`${mode} - ${status}`}
              disabled={disabled}
              animation={animation}
              round={round}
              size={size}
              mode={mode}
              status={status}
              onClick={event(`${mode} - ${status}`)}
              key={status}
            />
          ))}
        </Space>
      ))}
      <Space size="large">
        <Button type="primary" onClick={() => setDisabled(!disabled)}>
          {disabled ? '启用' : '禁用'}
        </Button>
        <Button type="primary" onClick={() => setRound(!round)}>
          {round ? '直角' : '圆角'}
        </Button>
        <Button type="primary" onClick={() => setAnimation(!animation)}>
          {animation ? '关闭' : '动画'}
        </Button>
        <Radio.Group
          options={['small', 'middle', 'large']}
          optionType="button"
          buttonStyle="solid"
          value={size}
          onChange={(e) => setSize(e.target.value)}
        />
        <Button type="primary" onClick={() => setClick(!click)}>
          {click ? '取消事件' : '监听事件'}
        </Button>
      </Space>
    </Space>
  );
}

export default Demo;
```

## 使用自定义的颜色

```jsx
import React from 'react';
import {
  FileExclamationOutlined,
  PoweroffOutlined,
  DisconnectOutlined,
  FrownOutlined,
} from '@ant-design/icons';
import { Space } from 'antd';
import { Feature } from '@ihccc/components';

const customStuts = {
  warn1: '#FFC107',
  warn2: '#FF9800',
  warn3: '#F44336',
  default: '#607D8B',
  outline: '#9E9E9E',
  online: '#3F51B5',
};

function Demo() {
  return (
    <Space direction="vertical" size="large">
      <Space size="large">
        <Feature label="text - #3F51B5" mode="text" color="#3F51B5" />
        <Feature
          label="badge - #795548"
          mode="badge"
          color="#795548"
          animation
        />
        <Feature label="tag - #009688" mode="tag" color="#009688" />
        <Feature label="block - #FF9800" mode="block" color="#FF9800" />
      </Space>
      <div>带有图标</div>
      <Space size="large">
        <Feature
          label="text - #3F51B5"
          mode="text"
          icon={<FileExclamationOutlined />}
          color="#3F51B5"
        />
        <Feature
          label="badge - #795548"
          mode="badge"
          icon={<PoweroffOutlined />}
          color="#795548"
          animation
        />
        <Feature
          label="tag - #009688"
          mode="tag"
          icon={<DisconnectOutlined />}
          color="#009688"
        />
        <Feature
          label="block - #FF9800"
          mode="block"
          icon={<FrownOutlined />}
          color="#FF9800"
        />
      </Space>
      <div>自定义状态值</div>
      <Space size="large">
        <Feature label="tag - default" mode="tag" color={customStuts} />
        <Feature
          label="text - outline"
          mode="text"
          color={customStuts}
          status="outline"
        />
        <Feature
          label="text - online"
          mode="text"
          color={customStuts}
          status="online"
        />
        <Feature
          label="badge - warn1"
          mode="badge"
          color={customStuts}
          status="warn1"
          animation
        />
        <Feature
          label="tag - warn2"
          mode="tag"
          color={customStuts}
          status="warn2"
        />
        <Feature
          label="block - warn3"
          mode="block"
          color={customStuts}
          status="warn3"
        />
      </Space>
    </Space>
  );
}

export default Demo;
```

## 在指定状态时才执行动画

```jsx
import React from 'react';
import { Space, Button } from 'antd';
import { Feature } from '@ihccc/components';

function Demo() {
  const [s, setS] = React.useState(0);
  const statusArray = [
    'default',
    'warning',
    'error',
    'success',
    'info',
    'other',
  ];

  const changeStatus = () => {
    setS((s) => (s + 1 === statusArray.length ? 0 : s + 1));
  };

  return (
    <React.Fragment>
      <Space size="large">
        <Feature
          label={`text - ${statusArray[s]}`}
          mode="text"
          status={statusArray[s]}
          animation={['info']}
        />
        <Feature
          label={`badge - ${statusArray[s]}`}
          mode="badge"
          status={statusArray[s]}
          animation={['warning', 'error']}
        />
        <Feature
          label={`tag - ${statusArray[s]}`}
          mode="tag"
          status={statusArray[s]}
          animation={['other']}
        />
        <Feature
          label={`block - ${statusArray[s]}`}
          mode="block"
          status={statusArray[s]}
          animation={['info', 'error', 'other']}
        />
      </Space>
      <br />
      <br />
      <Button type="primary" onClick={changeStatus}>
        改变状态
      </Button>
    </React.Fragment>
  );
}

export default Demo;
```

## 配合`Text`一起使用

```jsx
import React from 'react';
import { Space } from 'antd';
import { Feature, Text } from '@ihccc/components';

function Demo() {
  return (
    <Space size="large">
      <Feature
        label="这是一段很长的描述，它会自动滚动~"
        mode="text"
        status="success"
        animation
      >
        <Text.Roll />
      </Feature>

      <Feature
        label="这是一段很长的描述，鼠标移过来就看见完整的我了"
        mode="badge"
        status="info"
        animation
      >
        <Text.Tip max={6} />
      </Feature>

      <Feature
        label="这是一段很长的描述，它会自动滚动~"
        mode="tag"
        status="warning"
        animation
      >
        <Text.Roll />
      </Feature>

      <Feature
        label="这是一段很长的描述，鼠标移过来就看见完整的我了"
        mode="block"
        status="error"
        animation
      >
        <Text.Tip max={8} />
      </Feature>
    </Space>
  );
}

export default Demo;
```

## 配合 `setOptions` 方法一起使用

```jsx
import React from 'react';
import { Space, Button } from 'antd';
import { setOptions, Formater, Feature, Select, Text } from '@ihccc/components';

 setOptions({
  'test-type': [
    { label: '默认配置', value: 0, mode: 'text', status: 'default' },
    { label: '默认状态点', value: 1, mode: 'badge', status: 'default' },
    {
      label: '进行中',
      value: 2,
      mode: 'badge',
      status: 'info',
      animation: true,
    },
    {
      label: '警告状态点',
      value: 3,
      mode: 'badge',
      status: 'warning',
      animation: true,
    },
    {
      label: '超长描述文本的标签',
      value: 4,
      mode: 'tag',
      status: 'info',
      animation: true,
    },
    {
      label: '问题标签',
      value: 5,
      mode: 'tag',
      status: 'error',
      animation: true,
    },
    {
      label: '成功色块',
      value: 6,
      mode: 'block',
      status: 'success',
      animation: true,
    },
    {
      label: '警告色块',
      value: 7,
      mode: 'block',
      status: 'warning',
      animation: true,
    },
    { label: '特殊色块', value: 8, mode: 'block', status: 'other' },
  ],
});

function Demo() {
  const [status, setStatus] = React.useState(0);

  const changeStatus = () => {
    setStatus((s) => (s + 1 === 9 ? 0 : s + 1));
  };

  return (
    <React.Fragment>
      <Space size="large">
        <Formater options="test-type" value={status} />

        <Formater options="test-type" value={status}>
          <Feature animation={['error', 'other']} />
        </Formater>

        <Formater options="test-type" value={status}>
          <Feature animation={['error', 'other']}>
            <Text.Tip max={4} />
          </Feature>
        </Formater>

        <Formater options="test-type" value={status}>
          <Feature animation={['error', 'other']}>
            <Text.Roll />
          </Feature>
        </Formater>

        <Formater options="test-type" value={status}>
          <Text.Tip max={6} />
        </Formater>
      </Space>
      <br />
      <br />
      <Button type="primary" onClick={changeStatus}>
        改变状态
      </Button>
    </React.Fragment>
  );
}

export default Demo;
```

## Feature Props

| 名称      | 类型               | 默认值      | 描述                                                                                 |
| :-------- | :----------------- | :---------- | :----------------------------------------------------------------------------------- |
| label     | `string`           | `undefined` | 显示内容                                                                             |
| mode      | `string`           | `text`      | 表现形式（`text` \| `badge` \| `tag` \| `block`）                                    |
| icon      | `ReactNode`        | `undefined` | 图标前缀                                                                             |
| color     | `string \| object` | `undefined` | 自定义颜色，优先级高于 `status`，或者定义一个状态颜色映射对象 `{ statusKey: color }` |
| round     | `boolean`          | `false`     | 圆角                                                                                 |
| size      | `string`           | `small`     | 尺寸（`small` \| `middle` \| `large`）                                               |
| status    | `string`           | `default`   | 状态（`default` \| `success` \| `warning` \| `error` \| `info` \| `other`）          |
| animation | `boolean \| array` | `false`     | 是否执行动画，如果是数组，则元素是指定要执行动画的状态值                             |
| disabled  | `boolean`          | `false`     | 是否禁用、禁用后不会执行 `onClick`事件                                               |
| hoverAble | `boolean`          | `true`      | 悬浮状态                                                                             |
| children  | `ReactNode`        | `undefined` | 可以嵌套使用组件来扩展功能                                                           |
