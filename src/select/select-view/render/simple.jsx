import React from 'react';
import clsx from 'clsx';
import { List } from 'antd';
// import ListView from '../../../list-view';

function ViewSimple({ disabled, loading, grid, direction = 'horizontal', fieldNames, options, isActive, onClick, style }) {
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
              'bc-select-item-default',
              ['bc-select-item-' + direction],
              (disabled || item.disabled) && 'bc-select-item-disabled',
              isActive(item) && 'bc-select-item-active',
            )}
            {...(disabled || item.disabled ? {} : { onClick: () => onClick(item) })}
          >
            {item[fieldNames.cover] && <img className="'bc-select-item-cover'" src={item[fieldNames.cover]} alt="cover" />}
            {(item[fieldNames.label] || item[fieldNames.description]) && (
              <div className="bc-select-item-info">
                {item[fieldNames.label] && (
                  <div className="bc-select-item-label" title={item[fieldNames.label]}>
                    {item[fieldNames.label]}
                  </div>
                )}
                {item[fieldNames.description] && (
                  <div className="bc-select-item-desc" title={item[fieldNames.description]}>
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
