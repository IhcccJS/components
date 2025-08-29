import React from 'react';
import { setOptions, Select } from '@ihccc/components';

setOptions({
  sex: [
    { label: '👩 女', value: '0' },
    { label: '👨 男', value: '1' },
  ],
});

function Demo() {
  const [value, setValue] = React.useState(null);

  return <Select options="sex" value={value} onChange={setValue} style={{ width: 200 }} />;
}

export default Demo;
