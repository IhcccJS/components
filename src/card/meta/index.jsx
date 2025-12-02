import React from 'react';
import clsx from 'clsx';

function Meta(props) {
  const { className, title, avatar, description, children, ...rest } = props;

  return (
    <div className={clsx('card-meta', className)} {...rest}>
      {avatar && <div className="card-meta-avatar">{avatar}</div>}
      <div className="card-meta-detail">
        {title && <div className="card-meta-title">{title}</div>}
        {children}
        {description && <div className="card-meta-description">{description}</div>}
      </div>
    </div>
  );
}

export default Meta;
