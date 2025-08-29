import React from 'react';
import clsx from 'clsx';

function ListItem({ icon, name, desc, onClick }) {
  return (
    <div className={clsx('bc-list-item-command')} onClick={onClick}>
      {icon && <div className="bc-list-item-command-icon">{icon}</div>}
      <div className="bc-list-item-command-info">
        <div className="bc-list-item-command-info-name">{name}</div>
        <div className="bc-list-item-command-info-desc">{desc}</div>
      </div>
    </div>
  );
}

export default ListItem;
