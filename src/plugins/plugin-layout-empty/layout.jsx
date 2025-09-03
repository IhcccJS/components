import React from 'react';
import clsx from 'clsx';

const Layout = React.forwardRef(({ className, head, buttonBar, children, footer, renderContent = {} }, ref) => {
  const renderPlace = renderContent.place || 'inner';
  const renderDirection = renderContent.direction || 'column';

  const mainBody = (
    <React.Fragment>
      {head && <div className="bc-list-layout-empty-header"> {head}</div>}
      {buttonBar && <div className="bc-list-layout-empty-toolbar">{buttonBar}</div>}
      <div
        className={clsx('bc-list-layout-empty-body', {
          'bc-list-layout-empty-container': renderPlace === 'inner',
          ['bc-list-layout-empty-' + renderDirection]: renderPlace === 'inner',
        })}
      >
        {children}
        {renderPlace === 'inner' && renderContent.content}
      </div>
      {footer && <div className="bc-list-layout-empty-footer">{footer}</div>}
    </React.Fragment>
  );

  return (
    <div ref={ref}>
      <div
        className={clsx('bc-list-layout-empty', className, {
          'bc-list-layout-empty-container': renderPlace === 'outer',
          ['bc-list-layout-empty-' + renderDirection]: renderPlace === 'outer',
        })}
      >
        {renderPlace === 'outer' ? <div className="bc-list-layout-empty-main-body">{mainBody}</div> : mainBody}
        {renderPlace === 'outer' && renderContent.content}
      </div>
    </div>
  );
});

export default Layout;
