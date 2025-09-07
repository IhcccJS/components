import React from 'react';
import clsx from 'clsx';

export function UserMessage({ self, data, header, footer, className, style }) {
  return (
    <div className={clsx('bc-dialogue-message', className, self ? 'bc-dialogue-message-self' : 'bc-dialogue-message-other')} style={style}>
      {data.avatar && <div className="bc-dialogue-user-avatar">{data.avatar}</div>}
      <div className="bc-dialogue-message-container">
        <div className="bc-dialogue-message-info">
          <span>{data.name}</span>
          <span className="bc-dialogue-message-time">{data.time}</span>
        </div>
        {header && <div className="bc-dialogue-message-header">{header}</div>}
        <div className="bc-dialogue-message-content">{data.content}</div>
        {footer && <div className="bc-dialogue-message-footer">{footer}</div>}
      </div>
    </div>
  );
}

function Dialogue({ isSelf, data, rowKey = 'key', header, footer, className, style }, ref) {
  return (
    <div ref={ref} className={clsx('bc-dialogue-list', className)} style={style}>
      {data.map((item, i) => (
        <UserMessage self={isSelf?.(item, i)} data={item} header={header?.(item)} footer={footer?.(item)} key={item[rowKey]} />
      ))}
    </div>
  );
}

export default React.forwardRef(Dialogue);
