import React from 'react';
import clsx from 'clsx';
import { isFunction } from '@ihccc/utils';

const LayoutStyle = 'card';

const Layout = React.forwardRef(function Layout(
  { className, sticky, head, buttonBar, title, children, footer, renderContent = {}, layoutStyle = 'card', inlineHead = false },
  ref,
) {
  const headNode = head && !inlineHead && (
    <div className={clsx('bc-list-layout-header', { ['bc-list-layout-style-' + layoutStyle]: LayoutStyle === layoutStyle })}>{head}</div>
  );

  const toolNode = !inlineHead
    ? (title || buttonBar) && (
        <div className={!title ? 'bc-list-layout-toolbar' : 'bc-list-layout-toolbar-between'}>
          {title}
          {buttonBar}
        </div>
      )
    : (head || buttonBar) && (
        <div className={'bc-list-layout-toolbar-between'}>
          {head}
          {buttonBar}
        </div>
      );

  const footNode = footer && <div className={'bc-list-layout-footer'}>{footer}</div>;

  let renderListNode = null;
  let extendClassName = null;

  if (isFunction(renderContent)) {
    const content = <div className={clsx('bc-list-layout-content')}> {children}</div>;

    const body = (
      <div className={clsx('bc-list-layout-body', { ['bc-list-layout-style-' + layoutStyle]: LayoutStyle === layoutStyle })}>
        {toolNode}
        {content}
        {footNode}
      </div>
    );

    // 不是组件，是方法
    renderListNode = renderContent({ header: headNode, toolbar: toolNode, footer: footNode, content, body });
  } else {
    const renderPlace = renderContent.place || 'inner';
    const renderDirection = renderContent.direction || 'column';

    const mainBody = (
      <React.Fragment>
        {headNode}
        <div className={clsx('bc-list-layout-body', { ['bc-list-layout-style-' + layoutStyle]: LayoutStyle === layoutStyle })}>
          {toolNode}
          <div
            className={clsx('bc-list-layout-content', {
              ['bc-list-layout-container']: renderPlace === 'inner',
              ['bc-list-layout-container-' + renderDirection]: renderPlace === 'inner',
            })}
          >
            {renderPlace === 'inner' && renderContent.content}
            {children}
          </div>
          {footNode}
        </div>
      </React.Fragment>
    );

    renderListNode = (
      <React.Fragment>
        {renderPlace === 'outer' && renderContent.content}
        {renderPlace === 'outer' ? <div className={'bc-list-layout-container-main-body'}>{mainBody}</div> : mainBody}
      </React.Fragment>
    );

    extendClassName = {
      ['bc-list-layout-container']: renderPlace === 'outer',
      ['bc-list-layout-container-' + renderDirection]: renderPlace === 'outer',
    };
  }

  return (
    <div ref={ref} className={clsx('bc-list-layout', { 'bc-list-layout-sticky': !!sticky }, extendClassName, className)}>
      {renderListNode}
    </div>
  );
});

export default Layout;
