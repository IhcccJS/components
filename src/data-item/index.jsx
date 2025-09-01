import React from 'react';
import clsx from 'clsx';
import StyleSeed from './style-seed';

function DataItem({
  className,
  classNames = {},
  styleSeed = StyleSeed.DEFAULT,
  icon,
  label,
  value,
  symbol = ':',
  children,
  style,
  styles = {},
  ...restProps
}) {
  return (
    <div className={clsx(styleSeed.root, classNames.root, className)} style={{ ...style, ...styles.root }} {...restProps}>
      {(!!icon || !!label) && (
        <div className={clsx(styleSeed.head, classNames.head)} style={styles.head}>
          {icon && (
            <span className={clsx(styleSeed.icon, classNames.icon)} style={styles.icon}>
              {icon}
            </span>
          )}
          {label && (
            <span className={clsx(styleSeed.label, classNames.label)} style={styles.label}>
              {label}
            </span>
          )}
          {label && symbol && (
            <span className={clsx(styleSeed.symbol, classNames.symbol)} style={styles.symbol}>
              {symbol}
            </span>
          )}
        </div>
      )}
      <div className={clsx(styleSeed.body, classNames.body)} style={styles.body}>
        {children || value}
      </div>
    </div>
  );
}

DataItem.StyleSeed = StyleSeed;

export default DataItem;
