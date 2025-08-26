import React from 'react';
import clsx from 'clsx';
import './toggle-tab.less';

function ToggleTabs({ tabs, contentStyle }) {
  const [index, setIndex] = React.useState(0);

  return (
    <div className={'bc-toggle-tabs'}>
      <div className={'bc-toggle-tabs-nav'}>
        {tabs.map((item, i) => (
          <div
            className={clsx('bc-toggle-tabs-nav-item', i === index && 'bc-toggle-tabs-nav-item-active')}
            onClick={() => setIndex(i)}
            key={item.key}
          >
            {item.label}
          </div>
        ))}
      </div>
      {tabs.map((item, i) => (
        <div
          className={clsx('bc-toggle-tabs-content', i !== index && 'bc-toggle-tabs-content-hidden')}
          style={contentStyle}
          key={item.key}
        >
          {item.children}
        </div>
      ))}
    </div>
  );
}

export default ToggleTabs;
