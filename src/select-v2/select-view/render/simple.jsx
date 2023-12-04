import React from 'react';
import { theme, List } from 'antd';
// import ListView from '../../../list-view';
import useStyles from './style';

const { useToken } = theme;

function ViewSimple({
  loading,
  grid,
  direction,
  fieldNames,
  options,
  isActive,
  onClick,
  style,
}) {
  const { token } = useToken();

  const { styles, cx } = useStyles(token);

  return (
    <List
      loading={loading}
      grid={{ gutter: 16, ...grid }}
      dataSource={options}
      style={style}
      renderItem={(item) => (
        <List.Item key={item[fieldNames.value]}>
          <div
            className={cx(
              styles,
              'bc-select-item-default',
              'bc-select-item-' + direction,
              item.disabled && 'bc-select-item-disabled',
              isActive(item) && 'bc-select-item-active',
            )}
            {...(item.disabled ? {} : { onClick: () => onClick(item) })}
          >
            {item[fieldNames.cover] && (
              <img
                className={cx(styles, 'bc-select-item-cover')}
                src={item[fieldNames.cover]}
                alt="cover"
              />
            )}
            {(item[fieldNames.label] || item[fieldNames.description]) && (
              <div className={cx(styles, 'bc-select-item-info')}>
                {item[fieldNames.label] && (
                  <div
                    className={cx(styles, 'bc-select-item-label')}
                    title={item[fieldNames.label]}
                  >
                    {item[fieldNames.label]}
                  </div>
                )}
                {item[fieldNames.description] && (
                  <div
                    className={cx(styles, 'bc-select-item-desc')}
                    title={item[fieldNames.description]}
                  >
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

ViewSimple.defaultProps = {
  direction: 'horizontal',
};

export default ViewSimple;
