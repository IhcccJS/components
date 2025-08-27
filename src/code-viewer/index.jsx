import React from 'react';
import clsx from 'clsx';
// import hljs from 'highlight.js/lib/core';
// import json from 'highlight.js/lib/languages/json';
// import css from 'highlight.js/lib/languages/css';
// import js from 'highlight.js/lib/languages/javascript';
// import xml from 'highlight.js/lib/languages/xml';
// import sql from 'highlight.js/lib/languages/sql';
// import 'highlight.js/styles/atom-one-dark.min.css';
// // import 'highlight.js/styles/github-dark-dimmed.min.css';

// hljs.registerLanguage('json', json);
// hljs.registerLanguage('css', css);
// hljs.registerLanguage('js', js);
// hljs.registerLanguage('xml', xml);
// hljs.registerLanguage('sql', sql);

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
