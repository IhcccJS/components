---
title: Select
nav:
  title: 组件
  order: 2
group: 
  title: input
  order: 3
toc: content
---

# Select 选择器

这个组件是对 antd Select 组件的二次封装，使用起来更方便

## 基础使用

最简单的用法

```jsx
import React from 'react';
import { setOptions, Select } from '@ihccc/components';

setOptions({
  sex: [
    { label: '👩 女', value: '0' },
    { label: '👨 男', value: '1' },
  ]
});

function Demo() {
  const [value, setValue] = React.useState(null);
  return (
    <Select
      options="sex"
      value={value}
      onChange={setValue}
      style={{ width: 200 }}
    />
  );
}

export default Demo;
```

## 使用请求数据渲染

会在聚焦时请求数据

```jsx
import React from 'react';
import { Space, Input } from 'antd';
import { Select } from '@ihccc/components';
import { FakeApi } from '@ihccc/utils';

const initData = [
  {
    name: '张三',
    phone: '1213',
  },
  {
    name: '李晓',
    phone: '213213',
  },
];

const userList = new FakeApi(initData, {
  queryType: {
    name: 'like',
    phone: 'like',
  },
  debug: true
});

const query = userList.query.bind(userList);

function Demo() {
  const [name, setName] = React.useState();
  const [value, setValue] = React.useState(null);

  const queryUser = {
    query: query,
    params: { name },
    // 初始值为 {} 就不会默认请求
    // params: !name ? {} : { name },
    format: res => (res?.data?.list || []).map(item => ({
      label: item.name,
      value: item.phone
    })),
  };

  return (
    <Space>
      <Input 
        placeholder="请输入姓名查询"
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <Select
        options={queryUser}
        value={value}
        onChange={setValue}
        style={{ width: 200 }}
      />
    </Space>
  );
}

export default Demo;
```

## SelectView <sup>测试</sup>

```jsx
import React from 'react';
import { setOptions, SelectView } from '@ihccc/components';

setOptions({
  typeView: [
    { label: 'type1', description: '描述文本，描述文本....', value: '0',disabled: true, cover: 'https://picsum.photos/400?t=1' },
    { label: 'type2', description: '描述文本，描述文本....', value: '1', cover: 'https://picsum.photos/400?t=2' },
    { label: 'type3', description: '描述文本，描述文本....', value: '2', cover: 'https://picsum.photos/400?t=3' },
    { label: 'type4', description: '描述文本，描述文本....', value: '3', cover: 'https://picsum.photos/400?t=4' },
  ]
});

function Demo() {
  const [value, setValue] = React.useState(['0']);
  return (
    <SelectView
      grid={{ column: 6 }}
      direction="vertical"
      multiple
      options="typeView"
      value={value}
      onChange={setValue}
    />
  );
}

export default Demo;
```

## 指定其他的字段

查询的功能会将根据 label 的结果来索引查询

```jsx
import React from 'react';
import { Space } from 'antd';
import { setOptions, Select } from '@ihccc/components';

setOptions({
  member: [
    { name: '张三', class: '三年2班', id: '001', value: '0' },
    { name: '李四', class: '三年8班', id: '002', value: '1' },
    { name: '王五', class: '一年3班', id: '003', value: '2' },
  ]
})

function Demo() {
  const [value, setValue] = React.useState(null);

  return (
    <Space>
      <Select
        showSearch
        options="member"
        fieldNames={{ label: 'name', value: 'id' }}
        value={value}
        onChange={setValue}
        style={{ width: 200 }}
      />
      <Select
        showSearch
        options="member"
        fieldNames={{ label: 'name', value: 'id' }}
        value={value}
        onChange={setValue}
        style={{ width: 200 }}
      />
    </Space>
  );
}

export default Demo;
```

## 使用 `setOptions` 方法

将本地配置或者缓存数据作为选项数据

```jsx
import React from 'react';
import { Space } from 'antd';
import { setOptions, Select, Radio, Checkbox, Segmented, Mentions, AutoComplete, Formater } from '@ihccc/components';

setOptions({
  emoji: [
    { label: '😀', value: '0' },
    { label: '🤣', value: '1' },
    { label: '🙄', value: '2' },
    { label: '😭', value: '3' },
    { label: '😳', value: '4' },
  ],
  type: [
    { label: '嘿嘿', value: '0' },
    { label: '笑得满地打滚', value: '1' },
    { label: '翻白眼', value: '2' },
    { label: '放声大哭', value: '3' },
    { label: '脸红', value: '4' },
  ],
});

function Demo() {
  const [code, setCache] = React.useState();
  const [value, setValue] = React.useState();

  return (
    <Space direction="vertical" size="large">
      <Space>
        <Select
          options="sex"
          value={code}
          onChange={setCache}
          style={{ width: 200 }}
        />
        <Select
          options="emoji"
          value={value}
          onChange={setValue}
          style={{ width: 200 }}
        />
        <Select
          options="type"
          value={value}
          onChange={setValue}
          style={{ width: 200 }}
        />
      </Space>
      <Space>
        <Radio options="sex" optionType="button" buttonStyle="solid" />
        <Radio options="emoji" optionType="button" />
        <Radio options="type" />
      </Space>
      <Space>
        <Checkbox options="sex" />
        <Checkbox options="emoji" />
        <Checkbox options="type" />
      </Space>
      <Space>
        <Segmented options="sex" />
        <Segmented options="emoji" />
        <Segmented options="type" />
      </Space>
      <Space>
        <Formater options="sex" value={code} />
        <Formater options="emoji" value={value} />
        <Formater options="type" value={value} />
        <Formater options="type" value="8" />
      </Space>
    </Space>
  );
}

export default Demo;
```

## Select Props

Select 默认开启筛选的功能，你可以配置 ant 属性 `showSearch={false}` 来关闭

| 名称    | 类型                                                 | 默认值 | 描述                                                              |
| :------ | :--------------------------------------------------- | :----- | :---------------------------------------------------------------- |
| options | `array<option> \| object<{groupName \| key:option}>` | `[]`   | 选项数组或对象，是对象时会将 key 的名称作为分组名渲染成分组的结构 |

### option

| 名称  | 类型                  | 描述     |
| :---- | :-------------------- | :------- |
| label | `string \| ReactNode` | 选项名称 |
| value | `string \| number`    | 值       |
| icon  | `string \| ReactNode` | 图标     |
| color | `string`              | 颜色     |

## setOptions Props

`setOptions` 是一个方法，它只需要一个对象参数，此时 `options` 可以为字符串类型，通过 `options={optionName}`，就可以得到配置过的选项内容
`setOptions(variable:object): void 0`

| 名称     | 类型                                    | 默认值 | 描述         |
| :------- | :-------------------------------------- | :----- | :----------- |
| variable | `object<{ optionName: array<option> }>` | `{}`   | 选项参数配置 |
