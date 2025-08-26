import React from 'react';
import clsx from 'clsx';
import { isFunction } from '@wowon/utils';
import './layout.less';

const LayoutStyle = 'card';

const Layout = React.forwardRef(function Layout(
  { className, head, buttonBar, title, children, footer, renderContent = {}, layoutStyle = 'card', inlineHead = false },
  ref,
) {
  const headNode = head && !inlineHead && (
    <div className={clsx('list-layout-header', { ['list-layout-style-' + layoutStyle]: LayoutStyle === layoutStyle })}>
      {head}
    </div>
  );

  const toolNode = !inlineHead
    ? (title || buttonBar) && (
        <div className={!title ? 'list-layout-toolbar' : 'list-layout-toolbar-between'}>
          {title}
          {buttonBar}
        </div>
      )
    : (head || buttonBar) && (
        <div className={'list-layout-toolbar-between'}>
          {head}
          {buttonBar}
        </div>
      );

  const footNode = footer && <div className={'list-layout-footer'}>{footer}</div>;

  let renderListNode = null;
  let extendClassName = null;

  if (isFunction(renderContent)) {
    const content = <div className={clsx('list-layout-content')}> {children}</div>;

    const body = (
      <div className={clsx('list-layout-body', { ['list-layout-style-' + layoutStyle]: LayoutStyle === layoutStyle })}>
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
        <div
          className={clsx('list-layout-body', { ['list-layout-style-' + layoutStyle]: LayoutStyle === layoutStyle })}
        >
          {toolNode}
          <div
            className={clsx('list-layout-content', {
              ['flex-container']: renderPlace === 'inner',
              ['flex-container-' + renderDirection]: renderPlace === 'inner',
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
        {renderPlace === 'outer' ? <div className={'flex-container-main-body'}>{mainBody}</div> : mainBody}
      </React.Fragment>
    );

    extendClassName = {
      ['flex-container']: renderPlace === 'outer',
      ['flex-container-' + renderDirection]: renderPlace === 'outer',
    };
  }

  return (
    <div ref={ref} className={clsx('list-layout', className, extendClassName)}>
      {renderListNode}
    </div>
  );
});

export default Layout;
