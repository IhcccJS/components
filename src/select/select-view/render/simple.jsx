import React from 'react';
import clsx from 'clsx';
import { List } from 'antd';
// import ListView from '../../../list-view';
// import useStyles from './style';

import styles from './style.less';

// const { useToken } = theme;

function ViewSimple({
  disabled,
  loading,
  grid,
  direction = 'horizontal',
  fieldNames,
  options,
  isActive,
  onClick,
  style,
}) {
  // const { token } = useToken();

  // const { styles, cx } = useStyles(token);

  return (
    <List
      loading={loading}
      grid={{ gutter: 16, ...grid }}
      dataSource={options}
      style={style}
      renderItem={(item) => (
        <List.Item key={item[fieldNames.value]}>
          <div
            className={clsx(
              styles['bc-select-item-default'],
              styles['bc-select-item-' + direction],
              (disabled || item.disabled) && styles['bc-select-item-disabled'],
              isActive(item) && styles['bc-select-item-active'],
            )}
            {...(disabled || item.disabled ? {} : { onClick: () => onClick(item) })}
          >
            {item[fieldNames.cover] && (
              <img className={styles['bc-select-item-cover']} src={item[fieldNames.cover]} alt="cover" />
            )}
            {(item[fieldNames.label] || item[fieldNames.description]) && (
              <div className={styles['bc-select-item-info']}>
                {item[fieldNames.label] && (
                  <div className={styles['bc-select-item-label']} title={item[fieldNames.label]}>
                    {item[fieldNames.label]}
                  </div>
                )}
                {item[fieldNames.description] && (
                  <div className={styles['bc-select-item-desc']} title={item[fieldNames.description]}>
                    {item[fieldNames.description]}
                  </div>
                )}
              </div>
            )}
          </div>
        </List.Item>
      )}
    />
  );
}

export default ViewSimple;
