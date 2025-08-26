import React from 'react';
import clsx from 'clsx';
import './index.less';

function ListItem({ icon, name, desc, onClick }) {
  return (
    <div className={clsx('list-item')} onClick={onClick}>
      {icon && <div className="list-item-icon">{icon}</div>}
      <div className="list-item-info">
        <div className="list-item-info-name">{name}</div>
        <div className="list-item-info-desc">{desc}</div>
      </div>
    </div>
  );
}

export default ListItem;
