import React from 'react';
import clsx from 'clsx';

function ListItem({ className, vertical, icon, name, desc, children, ...restProps }) {
  return (
    <div className={clsx('bc-list-item-normal', vertical && 'bc-list-item-normal-vertical', className)} {...restProps}>
      {icon && <div className="bc-list-item-normal-icon">{icon}</div>}
      <div className="bc-list-item-normal-info">
        <div className="bc-list-item-normal-info-name">{name}</div>
        <div className="bc-list-item-normal-info-desc">{desc}</div>
      </div>
      {children}
    </div>
  );
}

export default ListItem;
