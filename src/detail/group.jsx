import React from 'react';
import Grid from '../grid';
import { DetailContext } from './context';

function Group(props) {
  const { index, className, style, children } = props;
  const { border, column, gap, cellPadding, grouped } = React.useContext(DetailContext);

  const items = grouped[index] || [];

  if (items.length === 0) return null;

  const content = (
    <Grid
      className={className}
      style={style}
      transferStyle
      border={border}
      column={column}
      gap={gap}
      cellPadding={cellPadding}
      template={items}
    />
  );

  return React.isValidElement(children) ? React.cloneElement(children, { children: content }) : content;
}

export default Group;
