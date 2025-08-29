import React from 'react';
import { Flex, Space } from 'antd';
import {
  setOptions,
  AutoComplete,
  Cascader,
  Checkbox,
  Mentions,
  RadioGroup,
  Segmented,
  Select,
  SelectView,
  TreeSelect,
} from '@ihccc/components';

const emoji = [
  { label: '😀', value: '0' },
  { label: '🤣', value: '1' },
  { label: '🙄', value: '2' },
  { label: '😭', value: '3' },
  { label: '😳', value: '4' },
];
const emojiText = [
  { label: '嘿嘿', value: '0' },
  { label: '笑得满地打滚', value: '1' },
  { label: '翻白眼', value: '2' },
  { label: '放声大哭', value: '3' },
  { label: '脸红', value: '4' },
];

setOptions({
  emoji,
  emojiText,
  emojiTree: [
    { label: '表情', value: 'a', children: emoji.map((item) => ({ ...item, value: 'a' + item.value })) },
    { label: '表情文本', value: 'b', children: emojiText.map((item) => ({ ...item, value: 'b' + item.value })) },
  ],
});

function Demo() {
  const [code, setCache] = React.useState();
  const [value, setValue] = React.useState();

  return (
    <Flex vertical gap={16}>
      <h4>AutoComplete</h4>
      <Space>
        <AutoComplete options="sex" style={{ width: 200 }} />
        <AutoComplete options="emoji" style={{ width: 200 }} />
        <AutoComplete options="emojiText" style={{ width: 200 }} />
      </Space>
      <h4>Cascader</h4>
      <Space>
        <Cascader options="emojiTree" />
      </Space>
      <h4>Checkbox</h4>
      <Space>
        <Checkbox options="sex" />
        <Checkbox options="emoji" />
        <Checkbox options="emojiText" />
      </Space>
      <h4>Mentions</h4>
      <Space>
        <Mentions options="sex" />
        <Mentions options="emoji" />
        <Mentions options="emojiText" />
      </Space>
      <h4>RadioGroup</h4>
      <Space>
        <RadioGroup options="sex" optionType="button" buttonStyle="solid" />
        <RadioGroup options="emoji" optionType="button" />
        <RadioGroup options="emojiText" />
      </Space>
      <h4>Segmented</h4>
      <Space>
        <Segmented options="sex" />
        <Segmented options="emoji" />
        <Segmented options="emojiText" />
      </Space>
      <h4>Select</h4>
      <Space>
        <Select options="sex" value={code} onChange={setCache} style={{ width: 200 }} />
        <Select options="emoji" value={value} onChange={setValue} style={{ width: 200 }} />
        <Select options="emojiText" value={value} onChange={setValue} style={{ width: 200 }} />
      </Space>
      <h4>SelectView</h4>
      <Space>
        <SelectView options="sex" />
        <SelectView options="emoji" />
        <SelectView options="emojiText" />
      </Space>
      <h4>TreeSelect</h4>
      <Space>
        <TreeSelect options="emojiTree" style={{ width: 200 }} />
      </Space>
    </Flex>
  );
}

export default Demo;
