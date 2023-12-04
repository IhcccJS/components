import React from 'react';
import useStyles from './style';

const ListContext = React.createContext({ column: 0 });

function ListViewItem({ className, noStyle, children, style, ...restProps }) {
  const { styles, cx } = useStyles();
  const { column } = React.useContext(ListContext);

  return (
    <div
      className={cx(styles, !noStyle && 'bc-list-view-item', className)}
      style={
        column > 0
          ? {
              width: `${100 / column}%`,
              maxWidth: `${100 / column}%`,
              ...style,
            }
          : style
      }
      {...restProps}
    >
      {children}
    </div>
  );
}

function ListView({ className, column, children, style }) {
  const { styles, cx } = useStyles();

  return (
    <ListContext.Provider value={{ column }}>
      <div className={cx(styles, 'bc-list-view', className)} style={style}>
        {children}
      </div>
    </ListContext.Provider>
  );
}

ListView.Item = ListViewItem;

export default ListView;
