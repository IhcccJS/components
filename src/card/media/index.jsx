import React from 'react';
import clsx from 'clsx';
import './index.less';

function Media(props) {
  const { className, title, avatar, description, children, ...rest } = props;

  return (
    <div className={clsx('card-media', className)} {...rest}>
      {avatar && <div className="card-media-avatar">{avatar}</div>}
      <div className="card-media-detail">
        {title && <div className="card-media-title">{title}</div>}
        {children}
        {description && <div className="card-media-description">{description}</div>}
      </div>
    </div>
  );
}

export default Media;
