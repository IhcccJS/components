import React from 'react';
import template from 'lodash/template';
import Link from '../../transition-route/link';

const isUrl = (url) => /^(\w+\:)*?\/\//.test(url);

const link = (props) => {
  const { max, url, subRender, ...restProps } = props || {};
  const compiled = template(url || '');
  return function renderLink(value, record, index) {
    const path = compiled({ value, record, index });
    const content = this.get(subRender || ['text'])(value, record, index);

    if (!path) return content;

    if (isUrl(url)) {
      return (
        <a target="_blank" {...restProps} href={path}>
          {content}
        </a>
      );
    }
    // 返回 Link 链接
    return <Link to={path}>{content}</Link>;
  };
};

export default link;
