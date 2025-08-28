---
title: 文本 Text
nav:
  title: 组件
  order: 2
group: 
  title: display
  order: 2
toc: content
---

# Text 文本

用于展示文本数据

## 简单上手

用于渲染非空文本数据，如果数据是空，就会渲染 `render` 配置的内容

```jsx
import React from 'react';
import { Space } from 'antd';
import { Text } from '@ihccc/components';

function Demo() {
  return (
    <Space direction="vertical" size="large">
      <Text label="" />

      <Text label="这是一串文本！" />

      <Text render="没有数据" />

      <Text label="这是一串文本！" render="没有数据" />
    </Space>
  );
}

export default Demo;
```

## 渲染数字

```jsx
import React from 'react';
import { Space } from 'antd';
import { Text } from '@ihccc/components';

function Demo() {
  return (
    <Space direction="vertical" size="large">
      <Text.Number label="1000000" />

      <Text.Number label="123456789.284832982" delimiter="," />

      <Text.Number label="123456789.284832982" delimiter="," precision={4} />

      <Text.Number label="18878789898" delimiter=" " part={4}  />
    </Space>
  );
}

export default Demo;
```

## 搭配使用

`Text.Tip`，`Text.Roll` 用于显示长文本；`Text.Copy` 用于复制文本到剪切板；也可以搭配`Formater` 和 `Feature`渲染内容

```jsx
import React from 'react';
import { Space, Input } from 'antd';
import { setOptions, Text, Select, Formater, Feature } from '@ihccc/components';

setOptions({
  desc: [
    { label: '短文本', value: '0', mode: 'text', status: 'warning' },
    {
      label: '你会看到一串很长的文字，他是通过 <Formater /> 组件渲染出来的！',
      value: '1',
      mode: 'tag',
      status: 'info',
    },
  ],
});

function Demo() { 

  return (
    <Space direction="vertical" size="large">
      <Text label="这是一串很长的文本，如果在表格内，希望不会换行显示！因为会影响页面展示效果，影响用户体验！" />

      <Text label="这是一串很长的文本，如果在表格内，希望不会换行显示！因为会影响页面展示效果，影响用户体验！">
        <Text.Tip max={16} />
      </Text>

      <Text label="这是一串很长的文本，如果在表格内，希望不会换行显示！因为会影响页面展示效果，影响用户体验！">
        <Text.Roll />
      </Text>

      <Formater options="desc" value="1">
        <Text.Tip />
      </Formater>

      <Formater
        options="desc"
        value="1"
        render={(item) => ({
          ...item,
          label:
            '这是一串很长的文本，如果在表格内，希望不会换行显示！因为会影响页面展示效果，影响用户体验！',
        })}
      >
        <Feature>
          <Text.Tip />
        </Feature>
      </Formater>

      <Text label="这是一串很长的文本，如果在表格内，希望不会换行显示！因为会影响页面展示效果，影响用户体验！">
        <Text.Copy>
          <Text.Tip />
        </Text.Copy>
      </Text>

      <Text label="快来尝试一下，点击后面的图标复制这一段文字！">
        <Text.Copy value="实际上复制的是这串文字">
          <Text.Roll width={300} duration={160} />
        </Text.Copy>
      </Text>

      <Input.TextArea rows={3} placeholder="粘贴到这里，查看拷贝的内容" />
    </Space>
  );
}

export default Demo;
```

## Text Props

| 名称     | 类型               | 默认值      | 描述                                                                        |
| :------- | :----------------- | :---------- | :-------------------------------------------------------------------------- |
| label    | `string`           | `undefined` | 显示文本                                                                    |
| render   | `string\|function` | `undefined` | 如果`label`的值为假值（除 `0` 外）或（`'null'\|'undefined'`）时，显示的内容 |
| children | `ReactNode`        | `undefined` | 可以嵌套使用组件来扩展功能，会向子节点传递`label`                           |

## Text.Tip Props

更多配置参考 [`Tooptip`](https://ant.design/components/tooltip-cn/) 组件
| 名称   | 类型                 | 默认值      | 描述                                                                  |
| :----- | :------------------- | :---------- | :-------------------------------------------------------------------- |
| label  | `string`             | `undefined` | 显示文本                                                              |
| max    | `number`             | `10`        | 如果`label`字符长度超过`max`时，会截断，额外的内容由`Tooptip`组件展示 |
| rule   | `start\|center\|end` | `end`       | 隐藏符号位于字符中的位置                                              |
| symbol | `string`             | `...`       | 隐藏符号                                                              |


## Text.Number Props

| 名称      | 类型               | 默认值      | 描述         |
| :-------- | :----------------- | :---------- | :----------- |
| label     | `string`           | `undefined` | 显示数字     |
| delimiter | `string  \| false` | `false`     | 分割符       |
| part      | `number`           | `3`         | 分割位数     |
| precision | `number`           | `-1`        | 显示小数位数 |
| scale     | `number`           | `1`         | 缩放         |
| prefix    | `any`              | `undefined` | 前缀内容     |
| unit      | `any`              | `undefined` | 单位内容     |
| className | `string`           | `undefined` | 根元素类名   |
| style     | `string`           | `undefined` | 内联样式     |

## Text.Roll Props

| 名称      | 类型               | 默认值      | 描述                     |
| :-------- | :----------------- | :---------- | :----------------------- |
| label     | `string`           | `undefined` | 显示文本                 |
| width     | `string \| number` | `120`       | 滚动区域宽度             |
| enable    | `boolean`          | `true`      | 是否滚动                 |
| duration  | `number`           | `500`       | 单字滚动时间，单位：`ms` |
| className | `string`           | `undefined` | 根元素类名               |
| style     | `string`           | `undefined` | 内联样式                 |

## Text.Copy Props

| 名称     | 类型        | 默认值      | 描述                                              |
| :------- | :---------- | :---------- | :------------------------------------------------ |
| label    | `string`    | `undefined` | 显示文本和复制的文本                              |
| value    | `string`    | `undefined` | 复制的文本（如果没有，就复制 `label` 属性的文本） |
| children | `ReactNode` | `undefined` | 可以嵌套使用组件来扩展功能，会向子节点传递`label` |
