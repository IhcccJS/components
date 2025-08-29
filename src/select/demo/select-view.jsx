import React from 'react';
import { Flex, Checkbox } from 'antd';
import { setOptions, RadioGroup, SelectView } from '@ihccc/components';

setOptions({
  viewDirection: [
    { label: '水平', value: 'horizontal' },
    { label: '垂直', value: 'vertical' },
  ],
  viewData: [
    { label: 'type1', description: '描述文本，描述文本....', value: '0', disabled: true, cover: 'https://picsum.photos/400?t=1' },
    { label: 'type2', description: '描述文本，描述文本....', value: '1', cover: 'https://picsum.photos/400?t=2' },
    { label: 'type3', description: '描述文本，描述文本....', value: '2', cover: 'https://picsum.photos/400?t=3' },
    { label: 'type4', description: '描述文本，描述文本....', value: '3', cover: 'https://picsum.photos/400?t=4' },
  ],
});

function Demo() {
  const [viewDirection, setViewDirection] = React.useState('horizontal');
  const [multiple, setMultiple] = React.useState(true);
  const [value, setValue] = React.useState(['0']);

  return (
    <Flex vertical gap={16}>
      <RadioGroup options="viewDirection" value={viewDirection} onChange={(e) => setViewDirection(e.target.value)} />
      <Checkbox checked={multiple} onChange={(e) => setMultiple(e.target.checked)}>
        多选
      </Checkbox>
      <SelectView multiple={multiple} grid={{ column: 4 }} direction={viewDirection} options="viewData" value={value} onChange={setValue} />
    </Flex>
  );
}

export default Demo;
