import React from 'react';
import clsx from 'clsx';
import styles from './index.less';

const Layout = React.forwardRef(({ className, head, buttonBar, children, footer, renderContent = {} }, ref) => {
  const renderPlace = renderContent.place || 'inner';
  const renderDirection = renderContent.direction || 'column';

  const mainBody = (
    <React.Fragment>
      {head && <div className={styles.header}> {head}</div>}
      {buttonBar && <div className={styles.toolbar}>{buttonBar}</div>}
      <div
        className={clsx(styles.body, {
          [styles.flexContainer]: renderPlace === 'inner',
          [styles[renderDirection]]: renderPlace === 'inner',
        })}
      >
        {children}
        {renderPlace === 'inner' && renderContent.content}
      </div>
      {footer && <div className={styles.footer}>{footer}</div>}
    </React.Fragment>
  );

  return (
    <div ref={ref}>
      <div
        className={clsx(styles.listLayout, className, {
          [styles.flexContainer]: renderPlace === 'outer',
          [styles[renderDirection]]: renderPlace === 'outer',
        })}
      >
        {renderPlace === 'outer' ? <div className={styles.mainBody}>{mainBody}</div> : mainBody}
        {renderPlace === 'outer' && renderContent.content}
      </div>
    </div>
  );
});

export default Layout;
