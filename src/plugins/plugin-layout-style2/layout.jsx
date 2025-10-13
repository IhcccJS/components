import React from 'react';
import clsx from 'clsx';

const Layout = React.forwardRef(({ className, sticky, head, buttonBar, children, footer, renderContent = {} }, ref) => {
  const renderPlace = renderContent.place || 'inner';
  const renderDirection = renderContent.direction || 'column';

  const mainBody = (
    <React.Fragment>
      {head && <div className="bc-list-layout-style2-header"> {head}</div>}
      {buttonBar && <div className="bc-list-layout-style2-toolbar">{buttonBar}</div>}
      <div
        className={clsx('bc-list-layout-style2-body', {
          'bc-list-layout-style2-container': renderPlace === 'inner',
          ['bc-list-layout-style2-container-' + renderDirection]: renderPlace === 'inner',
        })}
      >
        {children}
        {renderPlace === 'inner' && renderContent.content}
      </div>
      {footer && <div className="bc-list-layout-style2-footer">{footer}</div>}
    </React.Fragment>
  );

  return (
    <div ref={ref}>
      <div
        className={clsx(
          'bc-list-layout-style2',
          {
            'bc-list-layout-style2-sticky': !!sticky,
            'bc-list-layout-style2-container': renderPlace === 'outer',
            ['bc-list-layout-style2-container-' + renderDirection]: renderPlace === 'outer',
          },
          className,
        )}
      >
        {renderPlace === 'outer' ? <div className="bc-list-layout-style2-container-main-body">{mainBody}</div> : mainBody}
        {renderPlace === 'outer' && renderContent.content}
      </div>
    </div>
  );
});

export default Layout;
