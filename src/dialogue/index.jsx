import React from 'react';
import clsx from 'clsx';
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Spin, Empty } from 'antd';

export function UserMessage({ self, data, header, footer, className, style }) {
  return (
    <div className={clsx('dialogue-message', className, self ? 'dialogue-message-self' : 'dialogue-message-other')} style={style}>
      {data.avatar && (
        <div className="dialogue-user-avatar">
          <Avatar size={56} shape="square" src={data.avatar} icon={<UserOutlined />} />
        </div>
      )}
      <div className="dialogue-message-container">
        <div className="dialogue-message-info">
          <span>{data.userName}</span>
          <span className="dialogue-message-time">{data.time}</span>
        </div>
        <div className="dialogue-message-header">{header}</div>
        <div className="dialogue-message-content" dangerouslySetInnerHTML={{ __html: data.content }} />
        <div className="dialogue-message-footer">{footer}</div>
      </div>
    </div>
  );
}

function Dialogue({ loading = false, isSelf, data, rowKey = 'key', header, footer, className, style }, ref) {
  return (
    <Spin spinning={loading}>
      <div ref={ref} className={clsx('dialogue-list', className)} style={style}>
        {data.length === 0 && <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />}
        {data.map((item, i) => (
          <UserMessage self={isSelf?.(item, i)} data={item} header={header?.(item)} footer={footer?.(item)} key={item[rowKey]} />
        ))}
      </div>
    </Spin>
  );
}

export default React.forwardRef(Dialogue);
