import React from 'react';
import { RichEditor } from '@ihccc/components';
import 'react-quill/dist/quill.snow.css';

function Demo() {
  const [value, setValue] = React.useState('<h1>🥳 欢迎使用 RichEditor ~</h1>');

  return <RichEditor value={value} onChange={(v) => setValue(v)} style={{ height: 480 }} />;
}

export default Demo;
