import React from 'react';
import clsx from 'clsx';

export function Item({ className, colSpan, rowSpan, transferStyle, style, onClick, children }) {
  if (!children) return null;
  const itemProps = {
    className: clsx(className, 'grid-item'),
    style: {
      ...(colSpan > 1 ? { gridColumn: `span ${colSpan} / span ${colSpan}` } : {}),
      ...(rowSpan > 1 ? { gridRow: `span ${rowSpan} / span ${rowSpan}` } : {}),
      ...style,
    },
    onClick,
  };

  if (transferStyle && React.isValidElement(children)) {
    return React.cloneElement(children, itemProps);
  }

  return <div {...itemProps}>{children}</div>;
}

// https://grid.layoutit.com/
const Grid = React.forwardRef(function Grid(
  { border, template = [], column, gap, cellPadding, option = {}, transferStyle, onItemClick, className, style, children },
  ref,
) {
  return (
    <div
      ref={ref}
      className={clsx(
        'grid',
        {
          'grid-border': border,
        },
        className,
      )}
      style={{
        // padding: option.gap,
        gap: gap || option.gap,
        gridTemplateColumns: `repeat(${column || 1}, 1fr)`,
        '--grid-cell-padding': border && !cellPadding ? '6px 12px' : cellPadding,
        ...style,
      }}
    >
      {children}
      {template.map((item, index) => {
        if (!item || !item.element) return;
        return (
          <Item
            colSpan={item.colSpan}
            rowSpan={item.rowSpan}
            style={item.style}
            transferStyle={transferStyle}
            onClick={() => onItemClick?.(index)}
            key={item.key}
          >
            {item.element}
          </Item>
        );
      })}
    </div>
  );
});

export default Grid;
