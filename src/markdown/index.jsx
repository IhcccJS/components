import React from 'react';
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

function MarkDown({ content }) {
  const domString = React.useMemo(() => md.render(content || ''), [content]);
  return (
    <article
      className="markdown-body"
      dangerouslySetInnerHTML={{ __html: domString }}
      style={{ width: 500, maxHeight: '72vh', overflow: 'auto' }}
    />
  );
}

export default MarkDown;
