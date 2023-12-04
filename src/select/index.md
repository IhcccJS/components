---
title: 选择 Select
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
import { Select } from '@ihccc/components';

function Demo() {
  const [value, setValue] = React.useState(null);

  const options = [
    { label: '女', value: '0' },
    { label: '男', value: '1' },
  ];

  return (
    <Select
      options={options}
      value={value}
      onChange={setValue}
      style={{ width: 200 }}
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
import { Select } from '@ihccc/components';

function Demo() {
  const [value, setValue] = React.useState(null);

  const options = [
    { name: '张三', class: '三年2班', id: '001', value: '0' },
    { name: '李四', class: '三年8班', id: '002', value: '1' },
    { name: '王五', class: '一年3班', id: '003', value: '2' },
  ];

  return (
    <Space>
      <Select
        options={options}
        labelKey="id"
        valueKey="id"
        value={value}
        onChange={setValue}
        style={{ width: 200 }}
      />
      <Select
        options={options}
        labelKey={(man) => `${man.name}-${man.class}-${man.id}`}
        valueKey="id"
        value={value}
        onChange={setValue}
        style={{ width: 200 }}
      />
    </Space>
  );
}

export default Demo;
```

## 分组显示

分组有两种实现：

- 一种是 options 数组，数组的元素要包含 group 字段
- 一种是 options 对象，对象的 key 将作为分组的名称

```jsx
import React from 'react';
import { Space } from 'antd';
import { Select } from '@ihccc/components';

function Demo() {
  const [value, setValue] = React.useState(null);

  const students = [
    { name: '张三', group: '三年2班', id: '001', value: '0' },
    { name: '李四', group: '三年8班', id: '002', value: '1' },
    { name: '王五', group: '一年3班', id: '003', value: '2' },
  ];

  const grouped = {
    一年级: [students[2]],
    三年级: [students[0], students[1]],
  };

  return (
    <Space>
      <Select
        options={students}
        labelKey="name"
        value={value}
        onChange={setValue}
        style={{ width: 200 }}
      />
      <Select
        options={grouped}
        labelKey="name"
        value={value}
        onChange={setValue}
        style={{ width: 200 }}
      />
    </Space>
  );
}

export default Demo;
```

## 使用 `Select.register` 方法

将本地配置或者缓存数据作为选项数据

```jsx
import React from 'react';
import { Space } from 'antd';
import { Select } from '@ihccc/components';

const Local = Select.register({
  sex: [
    { label: '👩 女', value: '0' },
    { label: '👨 男', value: '1' },
  ],
});

const Cache = Select.register({
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
        <Local.Select
          options="sex"
          value={code}
          onChange={setCache}
          style={{ width: 200 }}
        />
        <Cache.Select
          options="emoji"
          value={value}
          onChange={setValue}
          style={{ width: 200 }}
        />
        <Cache.Select
          options="type"
          value={value}
          onChange={setValue}
          style={{ width: 200 }}
        />
      </Space>
      <Space>
        <Local.Radio options="sex" optionType="button" buttonStyle="solid" />
        <Cache.Radio options="emoji" optionType="button" />
        <Cache.Radio options="type" />
      </Space>
      <Space>
        <Local.CheckBox options="sex" />
        <Cache.CheckBox options="emoji" />
        <Cache.CheckBox options="type" />
      </Space>
      <Space>
        <Local.Segmented options="sex" />
        <Cache.Segmented options="emoji" />
        <Cache.Segmented options="type" />
      </Space>
      <Space>
        <Local.Formater options="sex" value={code} />
        <Cache.Formater options="emoji" value={value} />
        <Cache.Formater options="type" value={value} />
        <Cache.Formater options="type" value="8" />
      </Space>
    </Space>
  );
}

export default Demo;
```

## Select Props、Select.Radio Props、Select.CheckBox Props、Select.Segmented Props

Select 默认开启筛选的功能，你可以配置 ant 属性 `showSearch={false}` 来关闭

| 名称     | 类型                                                 | 默认值  | 描述                                                                           |
| :------- | :--------------------------------------------------- | :------ | :----------------------------------------------------------------------------- |
| options  | `array<option> \| object<{groupName \| key:option}>` | `[]`    | 选项数组或对象，是对象时会将 key 的名称作为分组名渲染成分组的结构              |
| labelKey | `string \| function`                                 | `label` | 选项显示的名称字段，可以是方法，这样你可以用自定义的方法返回你想显示的任意名称 |
| valueKey | `string \| function`                                 | `key`   | 选项的值字段                                                                   |

### option

| 名称  | 类型                  | 描述     |
| :---- | :-------------------- | :------- |
| label | `string \| ReactNode` | 选项名称 |
| value | `string \| number`    | 值       |
| icon  | `string \| ReactNode` | 图标     |
| color | `string`              | 颜色     |

## Select.Formater Props

| 名称     | 类型               | 默认值      | 描述                                                      |
| :------- | :----------------- | :---------- | :-------------------------------------------------------- |
| value    | `string \| number` | `''`        | 索引 `key`                                                |
| labelKey | `string`           | `label`     | 渲染 `label` 的字段名称                                   |
| render   | `function`         | `undefined` | 渲染参数转换方法 `(option) => option`，可以用来修改配置项 |
| color    | `string \| object` | `undefined` | 颜色值、或可以使用 `key` 索引的颜色对象                   |
| options  | `array \| object`  | `[]`        | 选项配置                                                  |
| style    | `object`           | `undefined` | 样式                                                      |
| children | `ReactNode`        | `undefined` | 自定义渲染组件                                            |

## Select.register Props

`Select.register` 是一个方法，它只需要一个对象参数，然后返回一个经过配置选项的 `Select`、`Radio`、`CheckBox`、`Segmented` 组件，一个可以用来转换的 `Formater` 组件，此时 `options` 可以为字符串类型，通过 `options={optionName}`，就可以得到配置过的选项内容
`Select.register(variable:object): ReactNode => ({ Select, Formater, Radio, CheckBox, Segmented })`

| 名称     | 类型                                    | 默认值 | 描述         |
| :------- | :-------------------------------------- | :----- | :----------- |
| variable | `object<{ optionName: array<option> }>` | `{}`   | 选项参数配置 |
