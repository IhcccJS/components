import React from 'react';
import clsx from 'clsx';
import hljs from 'highlight.js/lib/core';

function CodeViewer({ className, lang = 'json', value, style }) {
  const string = React.useMemo(() => {
    return hljs.highlight(value, { language: lang }).value;
  }, [value, lang]);

  return (
    <pre className={clsx('bc-code-viewer', className)} style={style}>
      <code className={`language-${lang}`} dangerouslySetInnerHTML={{ __html: string }} />
    </pre>
  );
}

export default CodeViewer;
