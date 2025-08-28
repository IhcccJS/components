import React from 'react';
import clsx from 'clsx';
import markdownit from 'markdown-it';
import hljs from 'highlight.js';

const md = markdownit({
  html: true,
  linkify: true,
  typographer: true,
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(str, { language: lang }).value;
      } catch (_) {}
    }
    return '';
  },
});

const defaultRender =
  md.renderer.rules.link_open ||
  function (tokens, idx, options, _env, self) {
    return self.renderToken(tokens, idx, options);
  };

md.renderer.rules.link_open = function (tokens, idx, options, env, self) {
  tokens[idx].attrSet('target', '_blank');
  return defaultRender(tokens, idx, options, env, self);
};

function MarkDown({ className, style, content }) {
  const domString = React.useMemo(() => md.render(content || ''), [content]);
  return <article className={clsx('bc-markdown markdown-body', className)} dangerouslySetInnerHTML={{ __html: domString }} style={style} />;
}

export default MarkDown;
