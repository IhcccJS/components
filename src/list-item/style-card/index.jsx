import React from 'react';
import clsx from 'clsx';

function ListItem({ className, cover, name, extra, desc, children, onCoverMouseDown, ...restProps }) {
  return (
    <div className={clsx('bc-list-item-card', className)} {...restProps}>
      {!!cover && (
        <div className="bc-list-item-card-cover" onMouseDown={onCoverMouseDown}>
          {cover}
        </div>
      )}
      {(!!name || !!extra) && (
        <div className="bc-list-item-card-info">
          <div className="bc-list-item-card-info-name">{name}</div>
          <div className="bc-list-item-card-info-extra">{extra}</div>
        </div>
      )}
      {!!desc && <div className="bc-list-item-card-info-desc">{desc}</div>}
      {children}
    </div>
  );
}

export default ListItem;
