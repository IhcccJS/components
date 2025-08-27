import React from 'react';
import clsx from 'clsx';

function ListItem({ className, cover, name, extra, desc, children, onCoverMouseDown, ...restProps }) {
  return (
    <div className={clsx('list-item-card', className)} {...restProps}>
      {!!cover && (
        <div className="list-item-card-cover" onMouseDown={onCoverMouseDown}>
          {cover}
        </div>
      )}
      {(!!name || !!extra) && (
        <div className="list-item-card-info">
          <div className="list-item-card-info-name">{name}</div>
          <div className="list-item-card-info-extra">{extra}</div>
        </div>
      )}
      {!!desc && <div className="list-item-card-info-desc">{desc}</div>}
      {children}
    </div>
  );
}

export default ListItem;
