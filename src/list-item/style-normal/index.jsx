import React from 'react';
import clsx from 'clsx';

function ListItem({ className, vertical, icon, name, desc, children, ...restProps }) {
  return (
    <div className={clsx('list-item-normal', vertical && 'list-item-normal-vertical', className)} {...restProps}>
      {icon && <div className="list-item-normal-icon">{icon}</div>}
      <div className="list-item-normal-info">
        <div className="list-item-normal-info-name">{name}</div>
        <div className="list-item-normal-info-desc">{desc}</div>
      </div>
      {children}
    </div>
  );
}

export default ListItem;
