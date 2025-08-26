import React from 'react';
import clsx from 'clsx';

// https://grid.layoutit.com/
function Grid({ template, column, option = {}, onItemClick }) {
  return (
    <div
      className="grid-floating"
      style={{ '--column': column, '--size': `${option.size}px`, '--gap': `${option.gap}px` }}
    >
      {template.map((item, index) => (
        <div
          className={clsx('grid-item', {
            ['float-left']: item.float === 'left',
            ['float-right']: item.float === 'right',
          })}
          style={{ '--colSpan': item.colSpan, '--rowSpan': item.rowSpan }}
          onClick={() => onItemClick(index)}
          key={item.key}
        >
          <span className="no">{item.key}</span>
          <span className="info">colSpan : {item.colSpan || 1}</span>
          <span className="info">rowSpan : {item.rowSpan || 1}</span>
          {item.float === 'left' && <span className="float">👈</span>}
          {item.float === 'right' && <span className="float">👉</span>}
        </div>
      ))}
    </div>
  );
}

export default Grid;
