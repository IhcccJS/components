import React from 'react';
import Grid from '../grid';
import { DetailContext } from './context';

function Group(props) {
  const { index, className, style, children } = props;
  const { border, column, gap, cellPadding, grouped } = React.useContext(DetailContext);

  // if (
  //   (Array.isArray(groupIndex) && groupIndex.indexOf(index) < 0) ||
  //   ((typeof groupIndex === 'number' || typeof groupIndex === 'string') && groupIndex !== index) ||
  //   index < 0
  // ) {
  //   return null;
  // }

  const items = grouped[index] || [];

  // console.log(items);

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
