import React from 'react';
import { createPortal } from 'react-dom';
import cx from 'clsx';
import { CloseOutlined } from '@ant-design/icons';
import useTask from './useTask';

function TaskBar({ placement, inClose, inNamespace, style }) {
  const { list, toggle, bringToTop, close } = useTask({ inClose, inNamespace });

  const onCloseItem = React.useCallback((item, e) => {
    e.stopPropagation();
    close(item.key);
  }, []);

  const onClickItem = React.useCallback((item) => {
    if (!item.focus && item.open) {
      bringToTop(item.key);
    } else {
      toggle(item.key);
    }
  }, []);

  if (list.length === 0) return null;

  return createPortal(
    <div>
      <div
        className={cx('bc-task-bar', {
          'bc-task-bar-placement-right': true,
          'bc-task-bar-placement-top': placement === 'rightTop',
          'bc-task-bar-placement-bottom': placement !== 'rightTop',
        })}
        style={style}
      >
        {list.map((item) => {
          if (item.taskData?.visible === false) return null;
          const title = item.taskData?.title || item.props?.title || item.name;
          return (
            <div
              className={cx('bc-task-item', {
                'bc-task-item-active': item.focus,
                'bc-task-item-open': item.open,
                'bc-task-item-focus': item.open && item.focus,
              })}
              title={title}
              onClick={() => onClickItem(item)}
              key={item.key}
            >
              {item.taskData?.icon && <span className="bc-task-item-prefix">{item.taskData?.icon}</span>}
              <span className="bc-task-item-title">{title}</span>
              <CloseOutlined className="bc-task-item-close" title="关闭" onClick={(e) => onCloseItem(item, e)} />
            </div>
          );
        })}
      </div>
    </div>,
    document.body,
  );
}

export default TaskBar;
