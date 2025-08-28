import React from 'react';
import { Markdown } from '@ihccc/components';
import 'github-markdown-css/github-markdown.css';

const content = [
  '# 一级标题',
  '## 二级标题',
  '### 三级标题',
  '> 注意事项注意事项注意事项',
  '- ~~aaa~~',
  '- __bbbb__',
  '- _ccccc_',
  '- `dddddd`',
].join('\n\n');

function Demo() {
  return <Markdown content={content} />;
}

export default Demo;
